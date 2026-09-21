type Run = { type: "bullet" | "text"; lines: string[] };

function toBlocks(content: string): string[][] {
  return content
    .trim()
    .split(/\n\s*\n/)
    .map((block) =>
      block
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line.length > 0)
    )
    .filter((block) => block.length > 0);
}

function toRuns(lines: string[]): Run[] {
  const runs: Run[] = [];
  for (const line of lines) {
    const isBullet = line.startsWith("•");
    const type: Run["type"] = isBullet ? "bullet" : "text";
    const last = runs[runs.length - 1];
    if (last && last.type === type) {
      last.lines.push(line);
    } else {
      runs.push({ type, lines: [line] });
    }
  }
  return runs;
}

export function SlideContent({ content }: { content: string }) {
  const blocks = toBlocks(content);

  return (
    <div className="space-y-5">
      {blocks.map((lines, blockIndex) => (
        <div key={blockIndex} className="space-y-2.5">
          {toRuns(lines).map((run, runIndex) => {
            if (run.type === "bullet") {
              return (
                <ul key={runIndex} className="space-y-1.5">
                  {run.lines.map((line, i) => (
                    <li key={i} className="flex gap-2.5 text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
                      <span
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
                        style={{ backgroundColor: "var(--note-accent, #71717a)" }}
                      />
                      <span>{line.replace(/^•\s*/, "")}</span>
                    </li>
                  ))}
                </ul>
              );
            }

            return (
              <div key={runIndex} className="space-y-2">
                {run.lines.map((line, i) => {
                  const isQuote = /^".*"$/.test(line);
                  const isLabel = /:$/.test(line) && line.length < 40;

                  if (isQuote) {
                    return (
                      <p
                        key={i}
                        className="border-l-2 border-zinc-300 pl-3 text-[15px] leading-relaxed text-zinc-500 italic dark:border-zinc-700 dark:text-zinc-400"
                      >
                        {line.slice(1, -1)}
                      </p>
                    );
                  }

                  return (
                    <p
                      key={i}
                      className={
                        isLabel
                          ? "text-[15px] font-semibold text-zinc-900 dark:text-zinc-100"
                          : "text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300"
                      }
                    >
                      {line}
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
