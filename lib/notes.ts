import { javascriptNotes } from "@/notes/java-script";
import { nodejsNotes } from "@/notes/node-js";
import { reactNotes } from "@/notes/react-js";
import type { Note, NoteData } from "@/lib/types";

const registry: Record<string, NoteData> = {
  javascript: javascriptNotes,
  nodejs: nodejsNotes,
  react: reactNotes,
};

export function getAllNotes(): Note[] {
  return Object.entries(registry).map(([slug, data]) => ({ slug, ...data }));
}

export function getNoteBySlug(slug: string): Note | undefined {
  const data = registry[slug];
  if (!data) return undefined;
  return { slug, ...data };
}

export function getNoteSlugs(): string[] {
  return Object.keys(registry);
}
