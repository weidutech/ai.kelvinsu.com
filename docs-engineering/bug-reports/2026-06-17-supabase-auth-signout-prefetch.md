# Bug Report: Supabase Auth 登录后立即失效

日期：2026-06-17  
状态：已修复  
影响范围：生产站 `https://aikelvinsucom.vercel.app` 的登录态保持  
相关提交：

- `9d9068a` `fix(auth): set Supabase cookies from login route`
- `98fc24f` `fix(auth): prevent signout prefetch logout`

## 摘要

用户在生产环境登录成功后，访问 `/members`、`/premium` 或受保护文档时仍会被重定向回登录页。排查初期表现为 Cookie Editor 中看不到 Supabase auth cookie，因此误判方向集中在 Vercel、Supabase SSR cookie 写入、fetch redirect 和浏览器端 session 持久化。

最终根因不是登录没有成功，而是登录成功后页面上的退出登录链接被 Next.js `<Link>` 预取触发，访问了有副作用的 `GET /auth/signout`，导致刚写入的 Supabase session cookie 被立即清除。

## 用户可见现象

- 用户点击登录后短暂跳转到会员区或尝试访问会员内容。
- 随后再次访问免费知识库、VIP 会员区或会员区时，被要求重新登录。
- Cookie Editor 中看不到持久存在的 Supabase cookie。
- 本地测试一度不稳定复现，生产 Vercel 更明显。

## 根因

旧代码把退出登录实现成普通 GET 链接：

```tsx
<Link href="/auth/signout">退出</Link>
```

同时 `GET /auth/signout` 会执行真实登出：

```ts
export async function GET(request: NextRequest) {
  const { supabase, applyAuthCookies } =
    createRouteHandlerSupabaseClient(request);
  await supabase.auth.signOut();
  return applyAuthCookies(NextResponse.redirect(...));
}
```

这违反了 HTTP 语义：GET 应该是安全、幂等、无副作用的读取操作。Next.js 的 `<Link>` 会为了提升导航速度预取链接目标。当页面渲染出 `/auth/signout` 链接时，框架可能在用户未点击的情况下请求该 URL。由于该 GET 请求会清 session，用户刚登录成功就被自动登出。

简化链路：

```text
用户提交登录表单
  -> Supabase /token 返回 200，登录成功
  -> 站点渲染已登录导航，包含 <Link href="/auth/signout">
  -> Next.js 预取 /auth/signout
  -> GET /auth/signout 执行 supabase.auth.signOut()
  -> Set-Cookie 清空 auth token
  -> 用户访问受保护页面
  -> 服务端读不到 session
  -> 重定向回 /login
```

## 证据

### Supabase Auth 日志

Supabase Auth 日志显示真实账号登录成功后，很快出现 logout：

```text
POST /token  status=200  action=login
POST /logout status=204  action=logout
```

这说明 Supabase 登录本身是成功的，问题发生在登录之后的站点行为。

### 本地登录 route 验证

在本地用 mock Supabase Auth 服务验证新的同源 `/auth/login` route，成功响应包含 `Set-Cookie`：

```text
HTTP/1.1 200 OK
Set-Cookie: sb-127-auth-token=...
{"redirect":"/members"}
```

这证明服务端 route 写 cookie 的路径可用。

### 生产 signout 验证

修复后生产环境验证：

```bash
curl -i https://aikelvinsucom.vercel.app/auth/signout
```

结果：

```text
HTTP/2 307
location: https://aikelvinsucom.vercel.app/members
```

GET `/auth/signout` 已不再清 cookie，只做安全重定向。

## 修复

### 1. 登录改为同源服务端 route 设置 cookie

前端 `AuthForm` 不再直接调用浏览器端 Supabase client 登录，而是提交到同源 route：

- `src/components/auth/AuthForm.tsx`
- `src/app/auth/login/route.ts`
- `src/app/auth/signup/route.ts`
- `src/lib/supabase/route.ts`

登录成功时，`POST /auth/login` 由服务端调用 Supabase，再通过同源响应返回 JSON 和 `Set-Cookie`。

### 2. 退出登录只允许 POST 产生副作用

修复文件：

- `src/app/auth/signout/route.ts`
- `src/components/layout/Navbar.tsx`
- `src/app/members/page.tsx`

新的行为：

- `GET /auth/signout`：不登出，只重定向到 `/members`。
- `POST /auth/signout`：执行 `supabase.auth.signOut()`，然后 `303` 跳转到登录页。
- UI 中所有退出入口都改成 `<form method="post">` + `<button type="submit">`。

示例：

```tsx
<form action="/auth/signout" method="post">
  <button type="submit">退出登录</button>
</form>
```

## 防复发规则

以后凡是会改变服务端状态、cookie、数据库或权限的操作，都不能放在 GET route 后面，也不能用 `<Link>` 或 `<a>` 直接触发。

禁止：

```tsx
<Link href="/auth/signout">退出</Link>
<a href="/api/delete-account">删除账号</a>
```

禁止：

```ts
export async function GET() {
  await mutateState();
}
```

应该使用：

- `POST`：登录、退出、提交表单、创建资源。
- `PATCH` / `PUT`：更新资源。
- `DELETE`：删除资源。
- Server Action 或 `<form method="post">`：用户明确提交后才触发。

## 排查经验

如果之后再出现“登录成功后马上失效”，按这个顺序查：

1. Supabase Auth 日志里是否有 `POST /token status=200`。
2. 成功登录后是否紧接着出现 `/logout`。
3. 站点里是否还有 `href="/auth/signout"` 或其他有副作用的 GET 链接。
4. 登录响应是否包含 `Set-Cookie`。
5. 受保护页面请求是否带上 `sb-...-auth-token` cookie。
6. 服务端保护逻辑是否使用可信校验，例如 `getClaims()` 或 `getUser()`。

## 结论

这个问题不是 Supabase 登录失败，也不是 Vercel 丢 cookie。核心问题是把登出设计成了 GET 链接，而 Next.js `<Link>` 的预取机制会访问这个链接，导致用户被自动登出。

修复后，GET 不再产生登出副作用，真实退出必须由 POST 表单触发。
