export default function LoadingSlides() {
  return (
    <div className="flex h-dvh flex-col overflow-hidden">
      <div className="shrink-0 border-b border-black/5 bg-white/90 backdrop-blur-md dark:border-white/10 dark:bg-zinc-950/90">
        <div className="mx-auto flex h-[52px] max-w-6xl items-center px-4 sm:px-6 lg:px-8">
          <div className="h-4 w-16 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
        </div>
        <div className="h-1 w-full bg-zinc-100 dark:bg-zinc-800" />
      </div>
      <div className="mx-auto flex w-full min-h-0 max-w-6xl flex-1 gap-8 overflow-hidden px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex min-h-0 min-w-0 flex-1 flex-col">
          <div className="flex flex-1 animate-pulse flex-col gap-4 overflow-hidden rounded-2xl border border-black/5 bg-white p-6 sm:p-10 dark:border-white/10 dark:bg-zinc-900">
            <div className="h-5 w-24 rounded-full bg-zinc-200 dark:bg-zinc-800" />
            <div className="h-8 w-2/3 rounded bg-zinc-200 dark:bg-zinc-800" />
            <div className="mt-4 space-y-3">
              <div className="h-3 w-full rounded bg-zinc-100 dark:bg-zinc-800/70" />
              <div className="h-3 w-5/6 rounded bg-zinc-100 dark:bg-zinc-800/70" />
              <div className="h-3 w-4/6 rounded bg-zinc-100 dark:bg-zinc-800/70" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
