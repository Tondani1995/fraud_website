"use client";

import {
    Shield,
    Target,
    Users,
    TrendingUp,
    CheckCircle2,
    Lightbulb,
    Award,
    ArrowRight,
    Briefcase,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Wrapper from "@/app/Wrapper";
import HowWeWorkSection from "@/components/About/HowWeWorkSection";
import Link from "next/link";

export default function About() {
    const [hoveredValue, setHoveredValue] = useState<number | null>(null);

    const approaches = [
        {
            icon: Target,
            title: "Strategic clarity",
            description: "What matters most",
            detail:
                "We help you focus on the fraud risks that actually threaten your business, not theoretical scenarios.",
        },
        {
            icon: Shield,
            title: "Controls that work",
            description: "In operations",
            detail:
                "Practical controls embedded in daily processes, not separate compliance exercises.",
        },
        {
            icon: Users,
            title: "Enablement",
            description: "People + process + data",
            detail:
                "Building fraud capability across your organization through awareness, training, and tools.",
        },
    ];

    const expertise = [
        {
            icon: Briefcase,
            title: "Practitioner Experience",
            description:
                "Built by professionals with hands-on experience across fraud strategy, prevention, controls, and enablement.",
        },
        {
            icon: TrendingUp,
            title: "Cross-Sector Background",
            description:
                "Experience spanning financial services and non-financial environments, with deep exposure to real-world fraud patterns.",
        },
        {
            icon: Lightbulb,
            title: "Operational Reality",
            description:
                "Approach grounded in how businesses actually work — informed by strategy, analytics, and frontline risk management.",
        },
    ];

    const values = [
        { title: "Practical outcomes over theory", icon: Target },
        { title: "Real-world experience", icon: Award },
        { title: "Client-focused solutions", icon: Users },
        { title: "Continuous improvement", icon: TrendingUp },
    ];

    return (
        <Wrapper>
            <div className="bg-white">
                <section className="relative overflow-hidden bg-[#001030]">
                    <div className="absolute inset-0">
                        <div className="absolute -left-24 -top-24 h-[520px] w-[520px] rounded-full bg-white/5 blur-3xl" />
                        <div className="absolute -right-28 -bottom-28 h-[640px] w-[640px] rounded-full bg-[#1d3658]/25 blur-3xl" />
                        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:56px_56px]" />
                    </div>

                    <div className="relative mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">
                        <div className="mx-auto mb-12 max-w-3xl text-center">
                            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 shadow-sm backdrop-blur">
                                <Shield className="h-4 w-4 text-white" />
                                <span className="text-sm font-bold uppercase tracking-wide text-white">
                                    About us
                                </span>
                            </div>

                            <h1 className="mt-6 text-5xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl">
                                MK Fraud{" "}
                                <span className="relative inline-block">
                                    <span className="relative z-10 text-[#c8d6ff]">Insights</span>
                                    <span className="absolute -bottom-2 left-0 h-3 w-full bg-white/10 blur-sm" />
                                </span>
                            </h1>

                            <p className="mt-6 text-lg leading-relaxed text-slate-200 sm:text-xl">
                                We are a fraud risk consulting venture focused on non-financial sectors in South
                                Africa — helping organisations build practical fraud capability, reduce leakage,
                                and protect customers.
                            </p>

                            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                                <Link href="/contact" className="w-full sm:w-auto">
                                    <Button className="w-full rounded-xl bg-white px-8 py-6 text-base font-semibold text-[#001030] shadow-lg transition-all duration-300 hover:scale-[1.02] hover:bg-slate-100">
                                        Book a call
                                        <ArrowRight className="ml-2 h-5 w-5" />
                                    </Button>
                                </Link>
                                <Link href="/services" className="w-full sm:w-auto">
                                    <Button
                                        variant="outline"
                                        className="w-full rounded-xl border-2 border-white/25 bg-transparent px-8 py-6 text-base font-semibold text-white transition-all duration-300 hover:border-white/40 hover:bg-white/5"
                                    >
                                        View services
                                        <ArrowRight className="ml-2 h-5 w-5" />
                                    </Button>
                                </Link>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8">
                            {approaches.map((approach, index) => {
                                const Icon = approach.icon;
                                const isHovered = hoveredValue === index;

                                return (
                                    <div
                                        key={approach.title}
                                        className="group relative"
                                        onMouseEnter={() => setHoveredValue(index)}
                                        onMouseLeave={() => setHoveredValue(null)}
                                    >
                                        <div
                                            className={`absolute -inset-1 rounded-3xl bg-white/10 opacity-0 blur-xl transition-all duration-500 ${isHovered ? "opacity-100" : ""
                                                }`}
                                        />

                                        <div
                                            className={`relative h-full overflow-hidden rounded-3xl border p-8 backdrop-blur transition-all duration-500 ${isHovered
                                                    ? "scale-[1.03] border-white/20 bg-white/10 shadow-2xl"
                                                    : "border-white/10 bg-white/5 shadow-xl"
                                                }`}
                                        >
                                            <div className="relative">
                                                <div
                                                    className={`mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/15 transition-all duration-500 ${isHovered ? "rotate-6 scale-110" : ""
                                                        }`}
                                                >
                                                    <Icon className="h-8 w-8 text-white" strokeWidth={2.5} />
                                                </div>

                                                <h3 className="mb-2 text-2xl font-bold text-white">{approach.title}</h3>
                                                <p className="mb-4 text-sm font-semibold text-slate-200">
                                                    {approach.description}
                                                </p>
                                                <p className="text-sm leading-relaxed text-slate-200/90">
                                                    {approach.detail}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                <section className="relative overflow-hidden bg-white">
                    <div className="absolute inset-0 -z-10">
                        <div className="absolute -left-24 top-24 h-[480px] w-[480px] rounded-full bg-[#1d3658]/8 blur-3xl" />
                        <div className="absolute -right-24 bottom-0 h-[520px] w-[520px] rounded-full bg-slate-900/5 blur-3xl" />
                        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0b12240a_1px,transparent_1px),linear-gradient(to_bottom,#0b12240a_1px,transparent_1px)] bg-[size:56px_56px]" />
                    </div>

                    <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">
                        <div className="mx-auto mb-14 max-w-3xl text-center">
                            <div className="inline-flex items-center gap-2 rounded-full border border-[#1d3658]/15 bg-white px-5 py-2.5 shadow-sm">
                                <Award className="h-4 w-4 text-[#1d3658]" />
                                <span className="text-sm font-bold uppercase tracking-wide text-[#001030]">
                                    Experience & leadership
                                </span>
                            </div>

                            <h2 className="mt-6 text-4xl font-bold tracking-tight text-[#001030] sm:text-5xl">
                                Built by practitioners
                            </h2>
                            <p className="mt-4 text-lg leading-relaxed text-slate-600 sm:text-xl">
                                Grounded in operational reality — informed by strategy, analytics, and frontline
                                risk management experience.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                            {expertise.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <div
                                        key={item.title}
                                        className="group overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-[#1d3658]/25 hover:shadow-2xl"
                                    >
                                        <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#001030] shadow-lg transition-transform duration-300 group-hover:rotate-6">
                                            <Icon className="h-7 w-7 text-white" strokeWidth={2.5} />
                                        </div>
                                        <h3 className="mb-4 text-xl font-bold text-[#001030]">{item.title}</h3>
                                        <p className="leading-relaxed text-slate-600">{item.description}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                <HowWeWorkSection />

                <section className="relative overflow-hidden bg-[#001030]">
                    <div className="absolute inset-0">
                        <div className="absolute -left-28 -bottom-28 h-[640px] w-[640px] rounded-full bg-white/5 blur-3xl" />
                        <div className="absolute -right-24 -top-24 h-[520px] w-[520px] rounded-full bg-[#1d3658]/20 blur-3xl" />
                        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:56px_56px]" />
                    </div>

                    <div className="relative mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">
                        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">
                            <div className="lg:col-span-6">
                                <h2 className="text-4xl font-bold leading-tight text-white sm:text-5xl">
                                    Our values drive everything we do
                                </h2>
                                <p className="mt-5 text-lg leading-relaxed text-slate-200">
                                    We believe in delivering tangible outcomes that make a real difference to your
                                    organization&apos;s fraud resilience.
                                </p>

                                <div className="mt-8 space-y-4">
                                    {values.map((value) => {
                                        const Icon = value.icon;
                                        return (
                                            <div
                                                key={value.title}
                                                className="group flex items-center gap-4 rounded-3xl border border-white/12 bg-white/5 p-5 backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/8"
                                            >
                                                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/15 transition-transform duration-300 group-hover:rotate-6">
                                                    <Icon className="h-6 w-6 text-white" strokeWidth={2.5} />
                                                </div>
                                                <span className="text-lg font-bold text-white">{value.title}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            <div className="lg:col-span-6">
                                <div className="overflow-hidden rounded-3xl border border-white/12 bg-white/5 p-8 backdrop-blur lg:p-10">
                                    <h3 className="text-2xl font-bold text-white">Why work with us?</h3>

                                    <div className="mt-6 space-y-5">
                                        {[
                                            {
                                                title: "Non-Financial Sector Focus",
                                                description: "Deep understanding of fraud risks outside traditional banking.",
                                            },
                                            {
                                                title: "Practical Implementation",
                                                description: "Solutions designed for real-world operational environments.",
                                            },
                                            {
                                                title: "End-to-End Capability",
                                                description: "From assessment to enablement and controls.",
                                            },
                                            {
                                                title: "South African Context",
                                                description: "Local expertise with understanding of regional fraud patterns.",
                                            },
                                        ].map((reason) => (
                                            <div
                                                key={reason.title}
                                                className="flex items-start gap-4 rounded-3xl border border-white/10 bg-white/5 p-5 transition-all duration-300 hover:border-white/18 hover:bg-white/8"
                                            >
                                                <div className="mt-1 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/15">
                                                    <CheckCircle2 className="h-5 w-5 text-white" strokeWidth={3} />
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-white">{reason.title}</h4>
                                                    <p className="mt-1 text-sm leading-relaxed text-slate-200">
                                                        {reason.description}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
                                        {["Strategy", "Awareness", "Controls", "Programme Design"].map((tag) => (
                                            <div
                                                key={tag}
                                                className="rounded-2xl border border-white/12 bg-white/5 px-4 py-3 text-center text-sm font-semibold text-slate-200"
                                            >
                                                {tag}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="relative overflow-hidden bg-white">
                    <div className="absolute inset-0 -z-10">
                        <div className="absolute -left-24 top-24 h-[520px] w-[520px] rounded-full bg-[#1d3658]/8 blur-3xl" />
                        <div className="absolute -right-24 bottom-0 h-[560px] w-[560px] rounded-full bg-slate-900/5 blur-3xl" />
                    </div>

                    <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">
                        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-2xl lg:p-12">
                            <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
                                <div className="lg:col-span-7">
                                    <div className="inline-flex items-center gap-2 rounded-full border border-[#1d3658]/15 bg-white px-4 py-2 shadow-sm">
                                        <span className="flex h-2 w-2 rounded-full bg-[#1d3658]" />
                                        <span className="text-sm font-semibold text-[#001030]">Let&apos;s work together</span>
                                    </div>

                                    <h3 className="mt-5 text-3xl font-bold text-[#001030] lg:text-4xl">
                                        Ready to strengthen your fraud defences?
                                    </h3>
                                    <p className="mt-3 text-lg text-slate-600">
                                        Book a call to discuss how we can help your organisation build practical fraud
                                        capability and reduce risk.
                                    </p>
                                </div>

                                <div className="lg:col-span-5">
                                    <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
                                        <Link href="/contact" className="w-full sm:w-auto">
                                            <Button className="w-full rounded-xl bg-[#001030] px-8 py-6 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:bg-[#0b1b44]">
                                                Book a call
                                                <ArrowRight className="ml-2 h-5 w-5" />
                                            </Button>
                                        </Link>
                                        <Link href="/services" className="w-full sm:w-auto">
                                            <Button
                                                variant="outline"
                                                className="w-full rounded-xl border-2 border-[#1d3658]/25 bg-white px-8 py-6 text-base font-semibold text-[#001030] transition-all duration-300 hover:border-[#1d3658]/45 hover:bg-[#1d3658]/5"
                                            >
                                                View services
                                                <ArrowRight className="ml-2 h-5 w-5" />
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </Wrapper>
    );
}
