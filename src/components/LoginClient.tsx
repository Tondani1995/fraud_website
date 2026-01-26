// src/app/(pages)/login/LoginClient.tsx

"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Lock, Mail, Shield } from "lucide-react";

export default function LoginClient() {
    const router = useRouter();
    const search = useSearchParams();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            // ✅ Axios API call
            const res = await axios.post(
                "/api/auth/admin-login",
                { email, password },
                { headers: { "Content-Type": "application/json" } }
            );

            if (!res?.data?.success) {
                setError(res?.data?.message || "Login failed");
                return;
            }

            const next = search.get("next") || "/admin/insights";
            router.replace(next);
            router.refresh();
        } catch (err: any) {
            // Axios error shape
            const msg =
                err?.response?.data?.message ||
                err?.message ||
                "Something went wrong";
            setError(msg);
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="min-h-[calc(100vh-0px)] bg-gradient-to-br from-slate-50 via-white to-slate-50">
            {/* background */}
            <div className="pointer-events-none fixed inset-0 -z-10">
                <div className="absolute left-0 top-0 h-[520px] w-[520px] rounded-full bg-[#1d3658]/10 blur-3xl" />
                <div className="absolute right-0 bottom-0 h-[560px] w-[560px] rounded-full bg-[#001030]/8 blur-3xl" />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#0b122005_1px,transparent_1px),linear-gradient(to_bottom,#0b122005_1px,transparent_1px)] bg-[size:44px_44px]" />
            </div>

            <div className="mx-auto flex max-w-7xl items-center justify-center px-6 py-16 lg:px-8">
                <div className="w-full max-w-md">
                    {/* badge */}
                    <div className="mb-6 flex justify-center">
                        <div className="inline-flex items-center gap-2 rounded-full border border-[#1d3658]/20 bg-[#1d3658]/5 px-5 py-2.5 shadow-sm backdrop-blur">
                            <Shield className="h-4 w-4 text-[#1d3658]" />
                            <span className="text-sm font-bold uppercase tracking-wide text-[#1d3658]">
                                Admin Login
                            </span>
                        </div>
                    </div>

                    <div className="overflow-hidden rounded-3xl border-2 border-slate-200 bg-white shadow-2xl">
                        {/* header */}
                        <div className="border-b border-slate-200 bg-slate-50/60 px-7 py-6">
                            <h1 className="text-2xl font-bold tracking-tight text-[#001030]">
                                Sign in
                            </h1>
                            <p className="mt-1 text-sm text-slate-600">
                                Access is restricted to administrators.
                            </p>
                        </div>

                        {/* form */}
                        <form onSubmit={handleSubmit} className="space-y-5 px-7 py-7">
                            {/* error */}
                            {error ? (
                                <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                                    {error}
                                </div>
                            ) : null}

                            {/* email */}
                            <div className="space-y-2">
                                <label
                                    htmlFor="email"
                                    className="text-sm font-semibold text-[#001030]"
                                >
                                    Email
                                </label>
                                <div className="relative">
                                    <Mail className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                                    <input
                                        id="email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="admin@yourdomain.com"
                                        required
                                        autoComplete="email"
                                        className="h-12 w-full rounded-lg mt-1.5 border-2 border-slate-200 bg-white pl-12 pr-4 text-sm text-slate-900 outline-none transition focus:border-[#1d3658]/35 focus:ring-4 focus:ring-[#1d3658]/10"
                                    />
                                </div>
                            </div>

                            {/* password */}
                            <div className="space-y-2">
                                <label
                                    htmlFor="password"
                                    className="text-sm font-semibold text-[#001030]"
                                >
                                    Password
                                </label>
                                <div className="relative">
                                    <Lock className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                                    <input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Enter your password"
                                        required
                                        autoComplete="current-password"
                                        className="h-12 w-full rounded-lg mt-1.5 border-2 border-slate-200 bg-white pl-12 pr-12 text-sm text-slate-900 outline-none transition focus:border-[#1d3658]/35 focus:ring-4 focus:ring-[#1d3658]/10"
                                    />

                                    <button
                                        type="button"
                                        onClick={() => setShowPassword((s) => !s)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-xl p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
                                        aria-label={showPassword ? "Hide password" : "Show password"}
                                    >
                                        {showPassword ? (
                                            <EyeOff className="h-5 w-5" />
                                        ) : (
                                            <Eye className="h-5 w-5" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* submit */}
                            <Button
                                type="submit"
                                disabled={loading}
                                className="h-12 w-full rounded-lg bg-[#001030] text-base font-bold text-white shadow-lg transition-all duration-300 hover:scale-[1.01] hover:bg-[#001030]/95 disabled:opacity-60"
                            >
                                {loading ? "Signing in..." : "Sign in"}
                            </Button>

                            <div className="flex items-center justify-between pt-1 text-xs text-slate-500">
                                <span>© {new Date().getFullYear()} MK Fraud Insights</span>
                                <Link
                                    href="/"
                                    className="font-semibold text-[#1d3658] hover:underline"
                                >
                                    Back to site
                                </Link>
                            </div>
                        </form>
                    </div>

                    {/* helper note */}
                    <div className="mt-4 rounded-2xl border border-[#1d3658]/15 bg-white/70 p-4 text-xs text-slate-600 shadow-sm">
                        <div className="flex items-start gap-3">
                            <div className="mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-[#1d3658]/10">
                                <Shield className="h-5 w-5 text-[#1d3658]" />
                            </div>
                            <p className="leading-relaxed">
                                Uses Axios to call{" "}
                                <span className="rounded bg-slate-100 px-2 py-0.5 font-mono">
                                    /api/auth/admin-login
                                </span>{" "}
                                and redirects to admin pages on success.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
