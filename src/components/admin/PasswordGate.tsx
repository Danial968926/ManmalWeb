"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";

const SESSION_KEY = "manmal_admin_unlocked";
// Stub only — this is a UI placeholder until the backend issues a real session.
const STUB_PASSWORD = "manmal-admin";

export default function PasswordGate({ children }: { children: React.ReactNode }) {
  const [unlocked, setUnlocked] = useState<boolean | null>(null);
  const [value, setValue] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- sessionStorage is only available client-side; starting from `null` avoids an SSR/client hydration mismatch (same pattern as CartProvider's localStorage hydration).
    setUnlocked(sessionStorage.getItem(SESSION_KEY) === "1");
  }, []);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (value === STUB_PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, "1");
      setUnlocked(true);
      setError(false);
    } else {
      setError(true);
    }
  }

  if (unlocked === null) return null;

  if (!unlocked) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-sm rounded-xl border border-border bg-card p-8 shadow-sm"
        >
          <div className="mb-6 flex flex-col items-center gap-3 text-center">
            <Image
              src="/manmal-logo-transparent.png"
              alt="The Manmal Club"
              width={64}
              height={64}
              className="size-16 rounded-full bg-secondary object-contain p-1.5"
            />
            <div>
              <h1 className="text-lg font-semibold text-foreground">Admin access</h1>
              <p className="mt-0.5 text-sm text-muted-foreground">
                Enter the password to continue.
              </p>
            </div>
          </div>
          <div className="relative">
            <input
              type={show ? "text" : "password"}
              autoFocus
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
                setError(false);
              }}
              placeholder="Password"
              aria-label="Admin password"
              aria-invalid={error || undefined}
              className="w-full rounded-lg border border-input bg-background py-2 pr-10 pl-3 text-sm text-foreground outline-none transition-colors duration-150 focus:border-ring aria-invalid:border-destructive"
            />
            <button
              type="button"
              onClick={() => setShow((s) => !s)}
              aria-label={show ? "Hide password" : "Show password"}
              className="absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer rounded-md p-1 text-muted-foreground transition-colors duration-150 hover:text-foreground"
            >
              {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
          </div>
          {error && (
            <p role="alert" className="mt-2 text-sm text-destructive">
              Incorrect password. Try again.
            </p>
          )}
          <Button type="submit" className="mt-4 w-full" size="lg">
            Enter dashboard
          </Button>
        </form>
      </div>
    );
  }

  return <>{children}</>;
}
