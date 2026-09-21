import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";

export function SiteHeader() {
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
          <span className="hidden text-sm font-medium text-zinc-500 sm:inline dark:text-zinc-400">
            Interactive study notes
          </span>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
