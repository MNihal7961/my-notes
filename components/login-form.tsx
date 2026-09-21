"use client";

import { useEffect, useActionState } from "react";
import { useRouter } from "next/navigation";
import { login, type LoginState } from "@/lib/actions/auth";

const initialState: LoginState = { error: null, success: false };

export function LoginForm({ next }: { next: string }) {
  const [state, formAction, pending] = useActionState(login, initialState);
  const router = useRouter();

  useEffect(() => {
    if (!state.success) return;
    router.push(next.startsWith("/") ? next : "/");
    router.refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.success]);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="username" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Username
        </label>
        <input
          id="username"
          name="username"
          type="text"
          required
          autoComplete="username"
          className="rounded-lg border border-black/10 bg-white px-3.5 py-2.5 text-sm text-zinc-900 outline-none focus:border-zinc-400 dark:border-white/10 dark:bg-zinc-900 dark:text-zinc-50 dark:focus:border-zinc-600"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="password" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="rounded-lg border border-black/10 bg-white px-3.5 py-2.5 text-sm text-zinc-900 outline-none focus:border-zinc-400 dark:border-white/10 dark:bg-zinc-900 dark:text-zinc-50 dark:focus:border-zinc-600"
        />
      </div>

      {state.error && (
        <p className="text-sm font-medium text-red-600 dark:text-red-400">{state.error}</p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="mt-2 rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
      >
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
