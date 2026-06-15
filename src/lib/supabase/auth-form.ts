import { getSiteUrl } from "@/lib/supabase/env";

export function withAuthMessage(
  pathname: string,
  key: "error" | "message",
  value: string
) {
  const params = new URLSearchParams({ [key]: value });
  return `${pathname}?${params.toString()}`;
}

export function safeNextPath(next: FormDataEntryValue | null) {
  if (
    typeof next !== "string" ||
    !next.startsWith("/") ||
    next.startsWith("//")
  ) {
    return "/members";
  }

  return next;
}

export function getRequestOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (origin) {
    try {
      return new URL(origin).origin;
    } catch {
      // Fall through to proxy headers when Origin is malformed.
    }
  }

  const forwardedHost = request.headers
    .get("x-forwarded-host")
    ?.split(",")[0]
    .trim();
  const host = forwardedHost || request.headers.get("host");

  if (host && host !== "localhost:9000") {
    const forwardedProto = request.headers
      .get("x-forwarded-proto")
      ?.split(",")[0]
      .trim();
    const protocol =
      forwardedProto ||
      (host.startsWith("localhost") || host.startsWith("127.0.0.1")
        ? "http"
        : "https");

    return `${protocol}://${host}`;
  }

  return getSiteUrl();
}

export function translateAuthError(message: string) {
  const waitMatch = message.match(/after\s+(\d+)\s+seconds?/i);
  if (waitMatch) {
    return `请求太频繁了，请在 ${waitMatch[1]} 秒后再试。`;
  }

  if (/rate\s*limit/i.test(message) || /email rate limit/i.test(message)) {
    return "邮件发送过于频繁，请稍等几分钟后再试，或换一个邮箱。";
  }

  if (message === "Invalid login credentials") {
    return "邮箱或密码不正确，请重新检查。";
  }

  if (message === "Email not confirmed") {
    return "这个邮箱还没有完成确认，请先去邮箱点击确认链接。";
  }

  if (message === "User already registered") {
    return "这个邮箱已经注册过了，你可以直接去登录。";
  }

  if (message === "Signup requires a valid password") {
    return "请设置一个有效的密码后再试。";
  }

  if (message.toLowerCase().includes("password")) {
    return "密码暂时不符合要求，请换一个至少 6 位的密码。";
  }

  return message;
}
