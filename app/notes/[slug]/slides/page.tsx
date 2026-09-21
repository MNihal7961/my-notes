import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllNotes, getNoteBySlug } from "@/lib/notes";
import { SlideDeck } from "@/components/slide-deck";

export function generateStaticParams() {
  return getAllNotes().map((note) => ({ slug: note.slug }));
}

export async function generateMetadata(
  props: PageProps<"/notes/[slug]/slides">
): Promise<Metadata> {
  const { slug } = await props.params;
  const note = getNoteBySlug(slug);

  if (!note) {
    return { title: "Note not found" };
  }

  return {
    title: `${note.title} — Slides`,
    description: note.description,
  };
}

export default async function SlidesPage(props: PageProps<"/notes/[slug]/slides">) {
  const { slug } = await props.params;
  const searchParams = await props.searchParams;
  const note = getNoteBySlug(slug);

  if (!note) {
    notFound();
  }

  const requested = Number(searchParams.slide);
  const initialIndex =
    Number.isInteger(requested) && requested >= 0 && requested < note.slides.length
      ? requested
      : 0;

  return <SlideDeck note={note} initialIndex={initialIndex} />;
}
