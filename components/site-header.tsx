import Link from "next/link";
import { cookies } from "next/headers";
import { ThemeToggle } from "@/components/theme-toggle";
import { LogoutButton } from "@/components/logout-button";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";

export async function SiteHeader() {
  const cookieStore = await cookies();
  const isSignedIn = Boolean(verifySessionToken(cookieStore.get(SESSION_COOKIE)?.value));

  return (
    <header className="sticky top-0 z-40 border-b border-black/5 bg-white/80 backdrop-blur-md dark:border-white/10 dark:bg-zinc-950/80">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-2.5 font-semibold text-zinc-900 dark:text-zinc-50"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-900 text-sm font-bold text-white dark:bg-white dark:text-zinc-900">
            M
          </span>
          <span className="tracking-tight">My Notes</span>
        </Link>
        <div className="flex items-center gap-4">
          <Link
            href="/results"
            className="hidden text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-900 sm:inline dark:text-zinc-400 dark:hover:text-zinc-50"
          >
            Results
          </Link>
          {isSignedIn ? (
            <form action={logout}>
              <button
                type="submit"
                className="text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
              >
                Sign out
              </button>
            </form>
          ) : (
            <Link
              href="/login"
              className="text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
            >
              Sign in
            </Link>
          )}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
