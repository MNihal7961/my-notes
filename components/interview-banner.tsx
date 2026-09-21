import Link from "next/link";
import Image from "next/image";

export function InterviewBanner({ topicCount }: { topicCount: number }) {
  return (
    <Link
      href="/interview"
      className="group relative mb-10 flex flex-col items-start gap-6 overflow-hidden rounded-2xl border border-black/5 p-6 shadow-sm transition-transform hover:-translate-y-0.5 hover:shadow-xl sm:flex-row sm:items-center sm:p-8 dark:border-white/10"
      style={{
        backgroundImage:
          "radial-gradient(circle at 15% 20%, rgba(129,140,248,0.35), transparent 45%), radial-gradient(circle at 85% 80%, rgba(56,189,248,0.25), transparent 45%), linear-gradient(135deg, #0b1120 0%, #161f36 60%, #0b1120 100%)",
      }}
    >
      <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/10 shadow-lg ring-1 ring-white/15 backdrop-blur-sm">
        <Image
          src="/images/fullstack-icon.svg"
          alt=""
          width={36}
          height={36}
          className="h-9 w-9"
        />
      </div>

      <div className="flex-1">
        <span className="inline-flex items-center rounded-full bg-white/10 px-2.5 py-1 text-xs font-semibold tracking-wide text-indigo-200 uppercase">
          Mock interview · Gemini graded
        </span>
        <h2 className="mt-3 text-xl font-bold tracking-tight text-white sm:text-2xl">
          Start a Full Stack Interview
        </h2>
        <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-zinc-300">
          One combined interview drawing from all {topicCount} topics — JavaScript, Node.js,
          React, MongoDB and Next.js. Answer by typing, code, or speak your answer aloud.
        </p>
      </div>

      <span className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-zinc-900 shadow-md transition-transform group-hover:scale-[1.03]">
        Start interview
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
          <path
            fillRule="evenodd"
            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </span>
    </Link>
  );
}
