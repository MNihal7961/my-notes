import { getAllNotes } from "@/lib/notes";
import { NoteCard } from "@/components/note-card";

export default function Home() {
  const notes = getAllNotes();

  return (
    <div className="flex flex-1 flex-col">
      <section className="relative overflow-hidden border-b border-black/5 dark:border-white/10">
        <div
          className="absolute inset-0 -z-10 opacity-[0.4]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 15% 20%, rgba(99,102,241,0.15), transparent 40%), radial-gradient(circle at 85% 15%, rgba(56,189,248,0.15), transparent 40%)",
          }}
        />
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <span className="inline-flex items-center rounded-full bg-zinc-900/5 px-3 py-1 text-xs font-semibold tracking-wide text-zinc-600 uppercase dark:bg-white/10 dark:text-zinc-300">
            Study notes, reimagined
          </span>
          <h1 className="mt-5 max-w-2xl text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl dark:text-zinc-50">
            Revise faster with slide-based notes
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
            Pick a topic, flip through bite-sized slides, and walk through
            code examples at your own pace — built for quick revision and
            interview prep.
          </p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl flex-1 px-4 py-14 sm:px-6 lg:px-8">
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
