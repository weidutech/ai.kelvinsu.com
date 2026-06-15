import { createServerSupabaseClient } from "@/lib/supabase/server";
import { Navbar } from "@/components/layout/Navbar";

export async function NavbarServer() {
  const supabase = await createServerSupabaseClient();
  // 用 getSession() 代替 getUser()，避免每次渲染都发起网络请求。
  // getSession() 从 cookie 读取 session，中间件已负责 token 刷新。
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const user = session?.user ?? null;

  return (
    <Navbar
      user={
        user
          ? {
              email: user.email || null,
            }
          : null
      }
    />
  );
}
