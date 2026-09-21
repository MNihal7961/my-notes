export default function LoadingInterview() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-zinc-300 border-t-zinc-900 dark:border-zinc-700 dark:border-t-zinc-50" />
      <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
        Putting together your full stack interview with Gemini…
      </p>
    </div>
  );
}
