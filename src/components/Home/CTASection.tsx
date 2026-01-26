"use client";

import { ArrowRight, Calendar, CheckCircle2, Clock, Shield } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CTASection() {
  const [isHovered, setIsHovered] = useState(false);

  const benefits = [
    { icon: Clock, text: "Get results in 30 days" },
    { icon: Shield, text: "Tailored to your risk profile" },
    { icon: CheckCircle2, text: "Actionable fraud prevention plan" },
  ];

  const deliverables = [
    {
      title: "Risk assessment",
      description: "Map exposure points across people, process, and channels.",
    },
    {
      title: "Custom strategy",
      description: "A practical plan aligned with your operations and constraints.",
    },
    {
      title: "30-day roadmap",
      description: "Clear priorities and steps you can execute immediately.",
    },
    {
      title: "Expert guidance",
      description: "Direct input from fraud specialists throughout the engagement.",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-white">
      <div className="absolute inset-0 -z-10">
        <div className="absolute -left-24 -top-24 h-[520px] w-[520px] rounded-full bg-[#1d3658]/10 blur-3xl" />
        <div className="absolute -right-28 -bottom-28 h-[600px] w-[600px] rounded-full bg-slate-900/5 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0b12240a_1px,transparent_1px),linear-gradient(to_bottom,#0b12240a_1px,transparent_1px)] bg-[size:56px_56px]" />
      </div>

      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">
        <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-2xl">
          <div className="absolute inset-0 bg-[radial-gradient(900px_500px_at_18%_20%,rgba(29,54,88,0.10),transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(900px_500px_at_85%_85%,rgba(0,16,48,0.06),transparent_65%)]" />

          <div className="relative grid grid-cols-1 gap-10 items-center p-8 lg:grid-cols-12 lg:gap-12 lg:p-14">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#1d3658]/15 bg-white px-5 py-2.5 shadow-sm">
                <span className="flex h-2 w-2 rounded-full bg-[#1d3658]" />
                <span className="text-sm font-bold uppercase tracking-wide text-[#001030]">
                  Limited availability
                </span>
              </div>

              <h2 className="mt-6 text-4xl font-bold leading-[1.08] tracking-tight text-[#001030] sm:text-5xl">
                Want a clear fraud plan in{" "}
                <span className="relative inline-block">
                  <span className="relative z-10 text-[#1d3658]">30 days</span>
                  <span className="absolute -bottom-2 left-0 h-3 w-full bg-[#1d3658]/15 blur-sm" />
                </span>
                ?
              </h2>

              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-600 sm:text-xl">
                Book a call and we&apos;ll recommend the quickest, highest-impact path based on your
                organisation&apos;s environment.
              </p>

              <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
                {benefits.map((benefit) => {
                  const Icon = benefit.icon;
                  return (
                    <div
                      key={benefit.text}
                      className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
                    >
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[#001030]">
                        <Icon className="h-5 w-5 text-white" strokeWidth={2.5} />
                      </div>
                      <p className="text-sm font-semibold leading-snug text-[#001030]">
                        {benefit.text}
                      </p>
                    </div>
                  );
                })}
              </div>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Link href="/contact" className="w-full sm:w-auto">
                  <Button
                    className="group w-full rounded-xl bg-[#001030] px-8 py-6 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.03] hover:bg-[#0b1b44]"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                  >
                    <span className="flex items-center gap-3">
                      <Calendar className="h-5 w-5" />
                      Book your strategy call
                      <ArrowRight
                        className={`h-5 w-5 transition-transform duration-300 ${isHovered ? "translate-x-1" : ""
                          }`}
                      />
                    </span>
                  </Button>
                </Link>

                <Link href="/services" className="w-full sm:w-auto">
                  <Button
                    variant="outline"
                    className="w-full rounded-xl border-2 border-[#1d3658]/25 px-8 py-6 text-base font-semibold text-[#001030] transition-all duration-300 hover:border-[#1d3658]/45 hover:bg-[#1d3658]/5"
                  >
                    Learn more
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>

              <p className="mt-6 flex items-center gap-2 text-sm text-slate-500">
                <CheckCircle2 className="h-4 w-4 text-[#1d3658]" />
                No commitment required • Free consultation
              </p>
            </div>

            <div className="lg:col-span-5">
              <div className="relative h-full overflow-hidden rounded-3xl border border-slate-200 bg-white p-7 shadow-sm lg:p-8">
                <div className="absolute inset-0 opacity-70"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(29,54,88,0.06) 0%, rgba(0,16,48,0.04) 55%, rgba(64,80,80,0.04) 100%)",
                  }}
                />

                <div className="relative">
                  <div className="mb-6 flex items-center justify-between">
                    <h3 className="text-2xl font-bold text-[#001030]">What you&apos;ll get</h3>
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-[#1d3658]/15">
                      <Shield className="h-6 w-6 text-[#1d3658]" />
                    </div>
                  </div>

                  <div className="space-y-4">
                    {deliverables.map((item) => (
                      <div
                        key={item.title}
                        className="group rounded-2xl border border-slate-200 bg-white p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#1d3658]/20 hover:shadow-md"
                      >
                        <div className="flex md:flex-row flex-col items-start gap-3">
                          <div className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-[#1d3658]/10">
                            <CheckCircle2 className="h-4 w-4 text-[#1d3658]" />
                          </div>
                          <div className="flex-1">
                            <p className="font-bold text-[#001030]">{item.title}</p>
                            <p className="mt-1 text-sm leading-relaxed text-slate-600">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 h-[3px] w-full bg-[#1d3658] opacity-35" />
        </div>
      </div>
    </section>
  );
}
