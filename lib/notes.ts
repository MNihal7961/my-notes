import { javascriptNotes } from "@/notes/java-script";
import { nodejsNotes } from "@/notes/node-js";
import { reactNotes } from "@/notes/react-js";
import { mongodbNotes } from "@/notes/mong-db";
import { nextjsNotes } from "@/notes/next-js";
import { dsaNotes } from "@/notes/dsa";
import type { Note, NoteData, Slide } from "@/lib/types";

const registry: Record<string, NoteData> = {
  javascript: javascriptNotes,
  nodejs: nodejsNotes,
  react: reactNotes,
  mongodb: mongodbNotes,
  nextjs: nextjsNotes,
  dsa: dsaNotes,
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

export type InterviewTrack = {
  slug: string;
  title: string;
  description: string;
  accent: string;
  icon: string;
  noteSlugs: string[];
};

export const INTERVIEW_TRACKS: InterviewTrack[] = [
  {
    slug: "full-stack",
    title: "Full Stack Interview",
    description:
      "A comprehensive mock interview spanning JavaScript, Node.js, React, MongoDB, Next.js and DSA basics — the full stack, in one sitting.",
    accent: "#818cf8",
    icon: "/images/fullstack-icon.svg",
    noteSlugs: ["javascript", "nodejs", "react", "mongodb", "nextjs", "dsa"],
  },
  {
    slug: "frontend",
    title: "Frontend Interview",
    description:
      "A frontend-focused mock interview covering React, JavaScript, Next.js and DSA basics — rendering, hooks, state and the browser side of the stack.",
    accent: "#38bdf8",
    icon: "/images/frontend-icon.svg",
    noteSlugs: ["react", "javascript", "nextjs", "dsa"],
  },
  {
    slug: "backend",
    title: "Backend Interview",
    description:
      "A backend-focused mock interview covering JavaScript, Node.js, MongoDB and DSA basics — APIs, async work, data and algorithms.",
    accent: "#34d399",
    icon: "/images/backend-icon.svg",
    noteSlugs: ["javascript", "nodejs", "mongodb", "dsa"],
  },
  {
    // Not "dsa": track slugs are checked before note slugs in getExamNote,
    // so reusing the note's slug would hijack /notes/dsa/exam.
    slug: "dsa-interview",
    title: "DSA Interview",
    description:
      "A data structures and algorithms mock interview — Big O, arrays, hash maps, sorting, heaps, trees and graphs, with coding questions.",
    accent: "#fb923c",
    icon: "/images/dsa-icon.svg",
    noteSlugs: ["dsa"],
  },
];

export function getInterviewTrack(slug: string): InterviewTrack | undefined {
  return INTERVIEW_TRACKS.find((track) => track.slug === slug);
}

export function isInterviewTrackSlug(slug: string): boolean {
  return INTERVIEW_TRACKS.some((track) => track.slug === slug);
}

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
 * from the notes that make up an interview track (not just descriptions)
 * so Gemini has enough substance to write genuine interview questions
 * instead of meta-questions about which deck covers what. Reuses the
 * entire exam pipeline unchanged, since it's shaped exactly like a real
 * Note.
 */
export function getInterviewNote(trackSlug: string): Note | undefined {
  const track = getInterviewTrack(trackSlug);
  if (!track) return undefined;

  const notes = track.noteSlugs
    .map((slug) => getNoteBySlug(slug))
    .filter((note): note is Note => Boolean(note));
  const topics = Array.from(new Set(notes.flatMap((note) => note.topics)));
  const slidesPerNote = notes.length > 0 ? Math.max(3, Math.floor(12 / notes.length)) : 0;

  return {
    slug: track.slug,
    title: track.title,
    description: track.description,
    coverImage: track.icon,
    accent: track.accent,
    topics,
    slides: notes.flatMap((note) =>
      sampleSlides(note.slides, slidesPerNote).map((slide) => ({
        title: `[${note.title}] ${slide.title}`,
        content: slide.content,
        code: slide.code,
      }))
    ),
  };
}

export function getExamNote(slug: string): Note | undefined {
  if (isInterviewTrackSlug(slug)) return getInterviewNote(slug);
  return getNoteBySlug(slug);
}
