import Link from "next/link";
import { LoginPanel } from "@/components/login-panel";

export const metadata = {
  title: "Sign in",
};

export default async function LoginPage(props: PageProps<"/login">) {
  const searchParams = await props.searchParams;
  const nextParam = searchParams.next;
  const next = typeof nextParam === "string" ? nextParam : "/";

  return (
    <div className="flex flex-1 items-center justify-center px-4 py-16">
      <div className="w-full max-w-sm rounded-2xl border border-black/5 bg-white p-8 shadow-sm dark:border-white/10 dark:bg-zinc-900">
        <LoginPanel next={next} />
        <Link
          href="/"
          className="mt-6 inline-block text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
        >
          ← Back home
        </Link>
      </div>
    </div>
  );
}
