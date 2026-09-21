export function SiteFooter() {
  return (
    <footer className="border-t border-black/5 py-8 dark:border-white/10">
      <div className="mx-auto max-w-6xl px-4 text-center text-sm text-zinc-500 sm:px-6 lg:px-8 dark:text-zinc-400">
        <p>&copy; {new Date().getFullYear()} My Notes. Built for focused revision.</p>
      </div>
    </footer>
  );
}
