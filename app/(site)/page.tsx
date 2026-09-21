import { getAllNotes } from "@/lib/notes";
import { NoteCard } from "@/components/note-card";
import { InterviewBanner } from "@/components/interview-banner";

export default function Home() {
  const notes = getAllNotes();

  return (
    <div className="flex flex-1 flex-col">
      <section className="mx-auto w-full max-w-6xl flex-1 px-4 py-14 sm:px-6 lg:px-8">
        <InterviewBanner topicCount={notes.length} />

        <div className="mb-8 flex items-end justify-between">
          <h2 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            All notes
          </h2>
          <span className="text-sm text-zinc-500 dark:text-zinc-400">
            {notes.length} {notes.length === 1 ? "topic" : "topics"}
          </span>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {notes.map((note) => (
            <NoteCard key={note.slug} note={note} />
          ))}
        </div>
      </section>
    </div>
  );
}
