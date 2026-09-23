export type LineKind = "bullet" | "quote" | "label" | "text";

// `id` is the line's position in the speech queue; 0 is reserved for the slide title.
export type ContentLine = { id: number; kind: LineKind; text: string };

export type ContentRun = { type: "bullet" | "text"; lines: ContentLine[] };

export type Token = { text: string; start: number; end: number; isWord: boolean };

function lineKind(line: string): LineKind {
  if (line.startsWith("•")) return "bullet";
  if (/^".*"$/.test(line)) return "quote";
  if (/:$/.test(line) && line.length < 40) return "label";
  return "text";
}

function displayText(line: string, kind: LineKind): string {
  if (kind === "bullet") return line.replace(/^•\s*/, "");
  if (kind === "quote") return line.slice(1, -1);
  return line;
}

export function parseSlideContent(content: string): ContentRun[][] {
  let nextId = 1;

  return content
    .trim()
    .split(/\n\s*\n/)
    .map((block) =>
      block
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line.length > 0)
    )
    .filter((block) => block.length > 0)
    .map((lines) => {
      const runs: ContentRun[] = [];
      for (const line of lines) {
        const kind = lineKind(line);
        const type: ContentRun["type"] = kind === "bullet" ? "bullet" : "text";
        const contentLine = { id: nextId++, kind, text: displayText(line, kind) };
        const last = runs[runs.length - 1];
        if (last && last.type === type) {
          last.lines.push(contentLine);
        } else {
          runs.push({ type, lines: [contentLine] });
        }
      }
      return runs;
    });
}

// Everything that gets read aloud for a slide, indexed by line id. Code is never included.
export function getSpeechLines(title: string, content: string): string[] {
  const lines = [title];
  for (const block of parseSlideContent(content)) {
    for (const run of block) {
      for (const line of run.lines) lines[line.id] = line.text;
    }
  }
  return lines;
}

export function tokenize(text: string): Token[] {
  const tokens: Token[] = [];
  const pattern = /\S+|\s+/g;
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(text))) {
    tokens.push({
      text: match[0],
      start: match.index,
      end: match.index + match[0].length,
      isWord: !/^\s/.test(match[0]),
    });
  }
  return tokens;
}
