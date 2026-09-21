"use server";

import { cookies } from "next/headers";
import { checkCredentials, createSessionToken, SESSION_COOKIE } from "@/lib/auth";

export type LoginState = { error: string | null; success: boolean };

export async function login(
  _prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const username = String(formData.get("username") ?? "");
  const password = String(formData.get("password") ?? "");

  if (!checkCredentials(username, password)) {
    return { error: "Incorrect username or password.", success: false };
  }

  const token = createSessionToken(username);
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  // Navigation happens client-side (see LoginForm) rather than via redirect()
  // here: redirect() thrown inside a Server Action does not reliably reset
  // the @modal parallel slot back to default.tsx, which left the login
  // modal open after a successful sign-in.
  return { error: null, success: true };
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}
