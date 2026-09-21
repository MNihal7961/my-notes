import { LoginForm } from "@/components/login-form";

export function LoginPanel({ next }: { next: string }) {
  return (
    <div>
      <h1 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
        Sign in
      </h1>
      <p className="mt-1.5 text-sm text-zinc-500 dark:text-zinc-400">
        Sign in to start an exam or view your results.
      </p>
      <div className="mt-6">
        <LoginForm next={next} />
      </div>
    </div>
  );
}
