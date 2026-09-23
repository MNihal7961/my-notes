import { parseSlideContent, tokenize } from "@/lib/slide-text";

export type SpeechHighlight = { line: number; char: number } | null;

export function SpokenText({
  text,
  lineId,
  highlight,
}: {
  text: string;
  lineId: number;
  highlight?: SpeechHighlight;
}) {
  if (!highlight || highlight.line !== lineId) return <>{text}</>;

  return (
    <>
      {tokenize(text).map((token) => {
        const active =
          token.isWord && highlight.char >= token.start && highlight.char < token.end;
        if (!active) return token.text;
        return (
          <mark
            key={token.start}
            data-active-word=""
            className="rounded-sm text-inherit"
            style={{
              backgroundColor: "color-mix(in srgb, var(--note-accent, #a1a1aa) 40%, transparent)",
              boxShadow: "0 0 0 2px color-mix(in srgb, var(--note-accent, #a1a1aa) 40%, transparent)",
            }}
          >
            {token.text}
          </mark>
        );
      })}
    </>
  );
}

export function SlideContent({
  content,
  highlight,
}: {
  content: string;
  highlight?: SpeechHighlight;
}) {
  const blocks = parseSlideContent(content);

  return (
    <div className="space-y-5">
      {blocks.map((runs, blockIndex) => (
        <div key={blockIndex} className="space-y-2.5">
          {runs.map((run, runIndex) => {
            if (run.type === "bullet") {
              return (
                <ul key={runIndex} className="space-y-1.5">
                  {run.lines.map((line) => (
                    <li key={line.id} className="flex gap-2.5 text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
                      <span
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
                        style={{ backgroundColor: "var(--note-accent, #71717a)" }}
                      />
                      <span>
                        <SpokenText text={line.text} lineId={line.id} highlight={highlight} />
                      </span>
                    </li>
                  ))}
                </ul>
              );
            }

            return (
              <div key={runIndex} className="space-y-2">
                {run.lines.map((line) => {
                  if (line.kind === "quote") {
                    return (
                      <p
                        key={line.id}
                        className="border-l-2 border-zinc-300 pl-3 text-[15px] leading-relaxed text-zinc-500 italic dark:border-zinc-700 dark:text-zinc-400"
                      >
                        <SpokenText text={line.text} lineId={line.id} highlight={highlight} />
                      </p>
                    );
                  }

                  return (
                    <p
                      key={line.id}
                      className={
                        line.kind === "label"
                          ? "text-[15px] font-semibold text-zinc-900 dark:text-zinc-100"
                          : "text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300"
                      }
                    >
                      <SpokenText text={line.text} lineId={line.id} highlight={highlight} />
                    </p>
                  );
                })}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
