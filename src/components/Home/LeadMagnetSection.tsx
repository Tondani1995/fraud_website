"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Mail, User, Loader2, Shield } from "lucide-react";

/**
 * Lead Magnet Section (Mandatory – Functional)
 * - Fields: name + email
 * - CTA: Send me the checklist
 * - Calls POST /api/lead-magnet (you will implement the email sending there)
 */
export default function LeadMagnetSection() {
    const brand = useMemo(
        () => ({
            primary: "#1d3658", // logo navy
            deep: "#001030",
        }),
        []
    );

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<
        "idle" | "loading" | "success" | "error"
    >("idle");
    const [message, setMessage] = useState<string>("");

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        setStatus("loading");
        setMessage("");

        try {
            const res = await fetch("/api/lead-magnet", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email }),
            });

            const data = await res.json().catch(() => ({}));

            if (!res.ok) {
                setStatus("error");
                setMessage(
                    data?.message ||
                    "Something went wrong. Please try again in a moment."
                );
                return;
            }

            setStatus("success");
            setMessage(
                data?.message ||
                "Done! Check your inbox — we’ve sent the Fraud Readiness Checklist."
            );
            setName("");
            setEmail("");
        } catch {
            setStatus("error");
            setMessage("Network error. Please try again.");
        }
    }

    return (
        <section
            id="fraud-readiness-checklist"
            className="relative overflow-hidden bg-gradient-to-br from-white via-slate-50 to-white"
            aria-labelledby="lead-magnet-title"
        >
            {/* soft brand background */}
            <div className="pointer-events-none absolute inset-0 -z-10">
                <div className="absolute left-0 top-0 h-[520px] w-[520px] rounded-full bg-[#1d3658]/10 blur-3xl" />
                <div className="absolute right-0 bottom-0 h-[560px] w-[560px] rounded-full bg-[#001030]/8 blur-3xl" />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#0b122005_1px,transparent_1px),linear-gradient(to_bottom,#0b122005_1px,transparent_1px)] bg-[size:44px_44px]" />
            </div>

            <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
                <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center">
                    {/* LEFT COPY */}
                    <div className="lg:col-span-6">
                        <div className="inline-flex items-center gap-2 rounded-full border border-[#1d3658]/20 bg-[#1d3658]/5 px-5 py-2.5 shadow-sm backdrop-blur">
                            <Shield className="h-4 w-4 text-[#1d3658]" />
                            <span className="text-sm font-bold uppercase tracking-wide text-[#1d3658]">
                                Free resource
                            </span>
                        </div>

                        <h2
                            id="lead-magnet-title"
                            className="mt-6 text-3xl font-bold tracking-tight leading-tight text-[#001030] sm:text-4xl lg:text-5xl"
                        >
                            Fraud Readiness Checklist
                            <span className="ml-2 text-[#1d3658]/70">(Free)</span>
                        </h2>

                        <p className="mt-4 max-w-xl text-lg leading-relaxed text-slate-600">
                            A practical checklist to help organisations identify common fraud gaps
                            across people, process, and controls.
                        </p>

                        <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2">
                            {["People gaps", "Process weaknesses", "Control blind spots", "Quick wins"].map(
                                (t) => (
                                    <div
                                        key={t}
                                        className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white/70 p-4 shadow-sm"
                                    >
                                        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#1d3658]/10">
                                            <CheckCircle2 className="h-5 w-5 text-[#1d3658]" />
                                        </div>
                                        <p className="text-sm font-semibold text-slate-700">{t}</p>
                                    </div>
                                )
                            )}
                        </div>

                        <p className="mt-6 text-sm text-slate-500">
                            We’ll email you the checklist. No spam.
                        </p>
                    </div>

                    {/* RIGHT FORM */}
                    <div className="lg:col-span-6">
                        <div className="overflow-hidden rounded-3xl border-2 border-slate-200 bg-white shadow-2xl">
                            <div className="border-b border-slate-200 bg-slate-50/60 px-7 py-6">
                                <h3 className="text-xl font-bold tracking-tight text-[#001030]">
                                    Send me the checklist
                                </h3>
                                <p className="mt-1 text-sm text-slate-600">
                                    Enter your details and we’ll deliver it via email.
                                </p>
                            </div>

                            <form onSubmit={onSubmit} className="space-y-5 px-7 py-7">
                                {/* name */}
                                <div className="space-y-2">
                                    <label
                                        htmlFor="lead-name"
                                        className="text-sm font-semibold text-[#001030]"
                                    >
                                        Name
                                    </label>
                                    <div className="relative">
                                        <User className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                                        <input
                                            id="lead-name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            placeholder="Your name"
                                            required
                                            className="h-12 w-full rounded-lg mt-1 border-2 border-slate-200 bg-white pl-12 pr-4 text-sm text-slate-900 outline-none transition focus:border-[#1d3658]/35 focus:ring-4 focus:ring-[#1d3658]/10"
                                        />
                                    </div>
                                </div>

                                {/* email */}
                                <div className="space-y-2">
                                    <label
                                        htmlFor="lead-email"
                                        className="text-sm font-semibold text-[#001030]"
                                    >
                                        Email
                                    </label>
                                    <div className="relative">
                                        <Mail className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                                        <input
                                            id="lead-email"
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="name@company.com"
                                            required
                                            autoComplete="email"
                                            className="h-12 w-full rounded-lg mt-1 border-2 border-slate-200 bg-white pl-12 pr-4 text-sm text-slate-900 outline-none transition focus:border-[#1d3658]/35 focus:ring-4 focus:ring-[#1d3658]/10"
                                        />
                                    </div>
                                </div>

                                {/* status */}
                                {(status === "success" || status === "error") && (
                                    <div
                                        className={`rounded-2xl border p-4 text-sm ${status === "success"
                                                ? "border-emerald-200 bg-emerald-50 text-emerald-900"
                                                : "border-rose-200 bg-rose-50 text-rose-900"
                                            }`}
                                        role="status"
                                        aria-live="polite"
                                    >
                                        {message}
                                    </div>
                                )}

                                <Button
                                    type="submit"
                                    disabled={status === "loading"}
                                    className="h-12 w-full rounded-lg bg-[#001030] text-base font-bold text-white shadow-lg transition-all duration-300 hover:scale-[1.01] hover:bg-[#001030]/95 disabled:opacity-70"
                                >
                                    {status === "loading" ? (
                                        <span className="flex items-center justify-center gap-2">
                                            <Loader2 className="h-5 w-5 animate-spin" />
                                            Sending…
                                        </span>
                                    ) : (
                                        "Send me the checklist"
                                    )}
                                </Button>

                                <p className="text-xs leading-relaxed text-slate-500">
                                    By submitting, you agree to receive the checklist by email. You can
                                    opt out anytime.
                                </p>
                            </form>

                            {/* subtle brand footer */}
                            <div className="border-t border-slate-200 bg-white px-7 py-5">
                                <div className="flex items-center justify-between gap-3">
                                    <p className="text-xs text-slate-500">
                                        Powered by MK Fraud Insights
                                    </p>
                                    <div className="h-2 w-24 rounded-full bg-[#1d3658]/15" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="absolute bottom-0 left-0 h-px w-full bg-[#1d3658]/15" />
        </section>
    );
}
