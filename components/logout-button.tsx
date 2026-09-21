"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { logout } from "@/lib/actions/auth";

export function LogoutButton({ className = "" }: { className?: string }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  function handleLogout() {
    startTransition(async () => {
      try {
        await logout();
        toast.success("Signed out.");
        router.push("/");
        router.refresh();
      } catch {
        toast.error("Couldn't sign out. Please try again.");
      }
    });
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={isPending}
      className={`text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-900 disabled:cursor-not-allowed disabled:opacity-60 dark:text-zinc-400 dark:hover:text-zinc-50 ${className}`}
    >
      {isPending ? "Signing out…" : "Sign out"}
    </button>
  );
}
