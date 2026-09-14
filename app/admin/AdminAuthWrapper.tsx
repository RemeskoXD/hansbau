"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, KeyRound, Eye, EyeOff, ShieldCheck, ArrowRight, Loader2, AlertCircle } from "lucide-react";
import { PageContent } from "@/lib/content-schema";
import { AdminDashboard } from "./AdminDashboard";

interface AdminAuthWrapperProps {
  initialIsAdmin: boolean;
  initialContent: PageContent | null;
  initialUpdatedAt: string | null;
}

export function AdminAuthWrapper({
  initialIsAdmin,
  initialContent,
  initialUpdatedAt,
}: AdminAuthWrapperProps) {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState<boolean>(initialIsAdmin);
  const [content, setContent] = useState<PageContent | null>(initialContent);
  const [updatedAt, setUpdatedAt] = useState<string | null>(initialUpdatedAt);
  
  // Login form states
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) {
      setError("Zadejte prosím heslo administrátora.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Přihlášení selhalo.");
      }

      // Fetch fresh content if not available
      const contentRes = await fetch("/api/admin/content");
      if (contentRes.ok) {
        const contentData = await contentRes.json();
        setContent(contentData.content);
        setUpdatedAt(contentData.updatedAt);
      }

      setIsAdmin(true);
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Chyba při komunikaci se serverem.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
    } catch (e) {
      console.error("Logout error:", e);
    } finally {
      setIsAdmin(false);
      setContent(null);
      setPassword("");
      router.refresh();
    }
  };

  // If authenticated and content is ready, render the rich dashboard
  if (isAdmin && content && updatedAt) {
    return (
      <AdminDashboard
        initialContent={content}
        initialUpdatedAt={updatedAt}
        onLogout={handleLogout}
      />
    );
  }

  // Otherwise render the secure login card
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-md">
        {/* Brand Header */}
        <div className="text-center mb-8 space-y-3">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-red-600 shadow-xl shadow-red-600/30 font-black text-white text-2xl tracking-wider">
            H
          </div>
          <div>
            <h1 className="text-2xl font-black uppercase tracking-tight text-white">
              HANSBAU Admin
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Vstup do redakčního systému webu (NoSQL + CSV)
            </p>
          </div>
        </div>

        {/* Login Box */}
        <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
          <div className="flex items-center gap-2.5 pb-4 border-b border-slate-800 text-slate-300">
            <Lock className="w-4 h-4 text-red-500" />
            <span className="text-xs font-bold uppercase tracking-wider">Zabezpečený přístup</span>
          </div>

          {error && (
            <div className="p-3.5 rounded-2xl bg-red-950/60 border border-red-800/80 text-red-300 text-xs flex items-start gap-2.5 animate-in fade-in">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <div className="font-medium leading-relaxed">{error}</div>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label htmlFor="admin-password" className="text-xs font-bold text-slate-300 block">
                Heslo administrátora:
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <KeyRound className="w-4 h-4" />
                </div>
                <input
                  id="admin-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Zadejte heslo..."
                  autoFocus
                  required
                  className="w-full pl-10 pr-11 py-3 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder:text-slate-600 text-sm font-medium focus:outline-none focus:border-red-500 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-500 hover:text-slate-300 cursor-pointer"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 px-5 rounded-xl bg-red-600 hover:bg-red-500 active:bg-red-700 disabled:bg-slate-800 disabled:text-slate-600 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-red-600/25 transition-all cursor-pointer"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Ověřuji přístup...</span>
                </>
              ) : (
                <>
                  <span>Vstoupit do administrace</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Security Notice */}
          <div className="pt-4 border-t border-slate-800/80 flex items-start gap-2.5 text-[11px] text-slate-500">
            <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
            <p className="leading-normal">
              Chráněno rate-limitingem proti hrubé síle, časově rezistentním porovnáním a šifrovanou <code className="text-slate-400">HttpOnly</code> cookie relací.
            </p>
          </div>
        </div>

        {/* Back Link */}
        <div className="text-center mt-6">
          <a
            href="/"
            className="text-xs text-slate-400 hover:text-white transition-colors"
          >
            ← Zpět na hlavní web HANSBAU
          </a>
        </div>
      </div>
    </div>
  );
}
