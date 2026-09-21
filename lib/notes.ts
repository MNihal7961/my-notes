import { javascriptNotes } from "@/notes/java-script";
import { nodejsNotes } from "@/notes/node-js";
import { reactNotes } from "@/notes/react-js";
import { mongodbNotes } from "@/notes/mong-db";
import { nextjsNotes } from "@/notes/next-js";
import type { Note, NoteData, Slide } from "@/lib/types";

const registry: Record<string, NoteData> = {
  javascript: javascriptNotes,
  nodejs: nodejsNotes,
  react: reactNotes,
  mongodb: mongodbNotes,
  nextjs: nextjsNotes,
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

export const FULL_STACK_SLUG = "full-stack";

/**
 * Picks a spread of real, explanatory slides from a note rather than every
 * slide (there are 150+ across all notes combined — too much for one
 * prompt). Deliberately drops the trailing "Interview Checklist" slide
 * every note ends with — it's just a categorized list of topic names, not
 * an explanation, and using it as grounding tends to make the model ask
 * meta questions about the checklist itself (e.g. "which topic is starred")
 * instead of real technical questions.
 */
function sampleSlides(slides: Slide[], count: number): Slide[] {
  const content = slides.length > 1 ? slides.slice(0, -1) : slides;
  if (content.length <= count) return content;

  const picks: Slide[] = [];
  const step = content.length / count;
  for (let i = 0; i < count; i++) {
    picks.push(content[Math.floor(i * step)]);
  }
  return picks;
}

/**
 * A synthetic "note" that aggregates a sample of real, technical slides
 * from every note (not just descriptions) so Gemini has enough substance
 * to write genuine interview questions instead of meta-questions about
 * which deck covers what. Reuses the entire exam pipeline unchanged, since
 * it's shaped exactly like a real Note.
 */
export function getFullStackNote(): Note {
  const notes = getAllNotes();
  const topics = Array.from(new Set(notes.flatMap((note) => note.topics)));

  return {
    slug: FULL_STACK_SLUG,
    title: "Full Stack Interview",
    description:
      "A comprehensive mock interview spanning JavaScript, Node.js, React, MongoDB and Next.js — the full stack, in one sitting.",
    coverImage: "/images/fullstack-icon.svg",
    accent: "#818cf8",
    topics,
    slides: notes.flatMap((note) =>
      sampleSlides(note.slides, 4).map((slide) => ({
        title: `[${note.title}] ${slide.title}`,
        content: slide.content,
        code: slide.code,
      }))
    ),
  };
}

export function getExamNote(slug: string): Note | undefined {
  if (slug === FULL_STACK_SLUG) return getFullStackNote();
  return getNoteBySlug(slug);
}
