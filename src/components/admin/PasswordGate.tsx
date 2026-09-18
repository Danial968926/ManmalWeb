"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Eye, EyeOff, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const SESSION_KEY = "manmal_admin_token";

export default function PasswordGate({ children }: { children: React.ReactNode }) {
  const [unlocked, setUnlocked] = useState<boolean | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Custom inline notification state (Toast-like banner)
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  useEffect(() => {
    const token = sessionStorage.getItem(SESSION_KEY);
    setUnlocked(!!token);
  }, []);

  // Auto-hide toast after 4 seconds
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    setToast(null);

    try {
      const response = await fetch("https://localhost:7227/api/Auth/admin-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok && data?.data?.token) {
        sessionStorage.setItem(SESSION_KEY, data.data.token);
        setUnlocked(true);
        setToast({ message: "Admin logged in successfully!", type: "success" });
      } else {
        setToast({ message: data?.message || "Invalid email or password!", type: "error" });
      }
    } catch (error) {
      setToast({ message: "Unable to connect to the backend server.", type: "error" });
    } finally {
      setIsLoading(false);
    }
  }

  if (unlocked === null) return null;

  if (!unlocked) {
    return (
      <div className="relative flex min-h-screen items-center justify-center bg-background px-4">
        
        {/* Custom Floating Toast Notification */}
        {toast && (
          <div className={`absolute top-6 right-6 flex items-center gap-2 rounded-lg px-4 py-3 text-sm font-medium shadow-md transition-all duration-300 z-50 ${
            toast.type === "success" 
              ? "bg-emerald-500 text-white" 
              : "bg-destructive text-destructive-foreground"
          }`}>
            {toast.type === "success" ? <CheckCircle2 className="size-4" /> : <AlertCircle className="size-4" />}
            <span>{toast.message}</span>
          </div>
        )}

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
              <h1 className="text-lg font-semibold text-foreground">Admin Access</h1>
              <p className="mt-0.5 text-sm text-muted-foreground">
                Enter your admin credentials to continue.
              </p>
            </div>
          </div>

          <div className="mb-4">
            <input
              type="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Admin Email"
              required
              className="w-full rounded-lg border border-input bg-background py-2 px-3 text-sm text-foreground outline-none transition-colors duration-150 focus:border-ring"
            />
          </div>

          <div className="relative mb-4">
            <input
              type={show ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="w-full rounded-lg border border-input bg-background py-2 pr-10 pl-3 text-sm text-foreground outline-none transition-colors duration-150 focus:border-ring"
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

          <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
            {isLoading ? "Authenticating..." : "Enter Dashboard"}
          </Button>
        </form>
      </div>
    );
  }

  return <>{children}</>;
}