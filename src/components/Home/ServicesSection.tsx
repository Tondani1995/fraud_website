"use client";

import { Button } from "@/components/ui/button";
import { Radar, ShieldCheck, Users, Layers, ArrowRight, Sparkles } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export default function ServicesSection() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const services = [
    {
      icon: Users,
      title: "Awareness & Resilience",
      description:
        "Enable employees, customers, and suppliers to recognise fraud early and act with confidence.",
      href: "/services#awareness",
    },
    {
      icon: Radar,
      title: "Fraud Health Check",
      description:
        "Pinpoint where fraud enters, why controls fail, and what to fix first with a clear action plan.",
      href: "/services#health-check",
    },
    {
      icon: ShieldCheck,
      title: "Internal Fraud Controls",
      description:
        "Strengthen internal and third-party controls without adding friction or bureaucracy.",
      href: "/services#controls",
    },
    {
      icon: Layers,
      title: "Fraud Programme Design",
      description:
        "Build a clear, practical fraud framework with ownership, accountability, and direction.",
      href: "/services#programme-design",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-white">
      <div className="absolute inset-0 -z-10">
        <div className="absolute -left-24 -top-24 h-[540px] w-[540px] rounded-full bg-[#1d3658]/10 blur-3xl" />
        <div className="absolute -right-24 -bottom-24 h-[520px] w-[520px] rounded-full bg-slate-900/5 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0b12240a_1px,transparent_1px),linear-gradient(to_bottom,#0b12240a_1px,transparent_1px)] bg-[size:56px_56px]" />
      </div>

      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#1d3658]/15 bg-white px-5 py-2.5 shadow-sm">
              <Sparkles className="h-4 w-4 text-[#1d3658]" />
              <span className="text-sm font-bold uppercase tracking-wide text-[#001030]">
                Core Services
              </span>
            </div>

            <h2 className="text-4xl font-bold leading-[1.1] tracking-tight text-[#001030] sm:text-5xl lg:text-6xl">
              Practical fraud support{" "}
              <span className="relative inline-block">
                <span className="relative z-10 text-[#1d3658]">where risk actually lives</span>
                <span className="absolute -bottom-2 left-0 h-3 w-full bg-[#1d3658]/15 blur-sm" />
              </span>
            </h2>

            <p className="max-w-xl text-lg leading-relaxed text-slate-600 sm:text-xl">
              We don&apos;t sell tools or theory. We help organisations understand how fraud really
              happens and design controls that work inside everyday operations.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Link href="/contact" className="w-full sm:w-auto">
                <Button className="group w-full rounded-xl bg-[#001030] px-8 py-6 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.03] hover:bg-[#0b1b44]">
                  <span className="flex items-center gap-2">
                    Request a Fraud Health Check
                    <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </Button>
              </Link>

              <Link href="/services" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  className="group w-full rounded-xl border-2 border-[#1d3658]/25 px-8 py-6 text-base font-semibold text-[#001030] transition-all duration-300 hover:border-[#1d3658]/45 hover:bg-[#1d3658]/5"
                >
                  View All Services
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-8 -z-10 rounded-3xl bg-[#1d3658]/12 blur-3xl" />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {services.map((service, index) => {
                const Icon = service.icon;
                const isHovered = hoveredCard === index;

                return (
                  <Link
                    key={service.title}
                    href={service.href}
                    className="group relative block"
                    onMouseEnter={() => setHoveredCard(index)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    <div
                      className={`absolute -inset-0.5 rounded-3xl bg-[#1d3658]/20 blur-2xl transition-opacity duration-500 ${isHovered ? "opacity-70" : "opacity-0"
                        }`}
                    />

                    <div
                      className={`relative h-full overflow-hidden rounded-3xl border bg-white p-8 shadow-lg transition-all duration-500 ${isHovered
                          ? "-translate-y-1 border-[#1d3658]/20 shadow-2xl"
                          : "border-slate-200"
                        }`}
                    >
                      <div
                        className={`absolute inset-0 opacity-0 transition-opacity duration-500 ${isHovered ? "opacity-100" : ""
                          }`}
                        style={{
                          background:
                            "linear-gradient(135deg, rgba(29,54,88,0.06) 0%, rgba(0,16,48,0.04) 55%, rgba(64,80,80,0.04) 100%)",
                        }}
                      />

                      <div className="relative">
                        <div
                          className={`mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-[#1d3658]/15 bg-white shadow-sm transition-transform duration-500 ${isHovered ? "rotate-6 scale-110" : ""
                            }`}
                        >
                          <Icon className="h-6 w-6 text-[#1d3658]" strokeWidth={2.5} />
                        </div>

                        <h3 className="mb-3 text-xl font-bold text-[#001030]">{service.title}</h3>

                        <p className="mb-6 leading-relaxed text-slate-600">{service.description}</p>

                        <div
                          className={`flex items-center gap-2 text-sm font-semibold text-[#1d3658] transition-transform duration-300 ${isHovered ? "translate-x-1" : ""
                            }`}
                        >
                          <span>Learn More</span>
                          <ArrowRight className="h-4 w-4" />
                        </div>
                      </div>

                      <div
                        className={`absolute bottom-0 left-0 h-[3px] w-full bg-[#1d3658] transition-opacity duration-500 ${isHovered ? "opacity-100" : "opacity-0"
                          }`}
                      />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
