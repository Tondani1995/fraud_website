import Wrapper from "@/app/Wrapper";
import Link from "next/link";
import {
    Activity,
    ArrowLeft,
    ArrowUpRight,
    BarChart3,
    ChartColumnIncreasing,
    Mail,
    MessageCircle,
    MousePointerClick,
    PhoneCall,
    Sparkles,
    Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";

const metrics = [
    {
        label: "Sessions",
        value: "12,480",
        change: "+12.4%",
        note: "vs previous 30 days",
        icon: Activity,
        bars: [38, 42, 51, 48, 56, 60, 66, 62, 74, 70, 77, 82],
    },
    {
        label: "Active Users",
        value: "8,912",
        change: "+8.1%",
        note: "engaged visitors",
        icon: Users,
        bars: [28, 32, 34, 39, 44, 46, 43, 49, 54, 59, 62, 65],
    },
    {
        label: "Conversion Rate",
        value: "4.8%",
        change: "+0.6%",
        note: "lead actions completed",
        icon: ChartColumnIncreasing,
        bars: [24, 26, 27, 29, 31, 33, 35, 34, 36, 38, 39, 41],
    },
    {
        label: "Qualified Leads",
        value: "126",
        change: "+18.0%",
        note: "form and booking intent",
        icon: Sparkles,
        bars: [12, 16, 14, 18, 19, 22, 25, 24, 28, 31, 33, 36],
    },
];

const channels = [
    { label: "Organic Search", share: 38, trend: "+9.2%", tone: "bg-[#1d3658]" },
    { label: "Direct", share: 24, trend: "+4.1%", tone: "bg-[#2f5f89]" },
    { label: "Referral", share: 18, trend: "+6.8%", tone: "bg-[#4d7aa3]" },
    { label: "Social", share: 12, trend: "+11.3%", tone: "bg-[#7198bc]" },
    { label: "Email", share: 8, trend: "+3.7%", tone: "bg-[#9fb8cf]" },
];

const topPages = [
    { page: "/", label: "Home", sessions: "4,260", rate: "5.8%" },
    { page: "/services", label: "Services", sessions: "2,980", rate: "6.3%" },
    { page: "/contact", label: "Contact", sessions: "1,740", rate: "11.4%" },
    { page: "/insights", label: "Insights", sessions: "1,320", rate: "3.1%" },
    { page: "/industries", label: "Industries", sessions: "980", rate: "4.2%" },
];

const conversions = [
    {
        label: "Contact Form Submissions",
        value: "54",
        detail: "Top driver from contact and services pages",
        icon: Mail,
    },
    {
        label: "Calendly Booking Clicks",
        value: "31",
        detail: "Strong intent from consultation CTA traffic",
        icon: MousePointerClick,
    },
    {
        label: "WhatsApp Clicks",
        value: "23",
        detail: "High mobile engagement on contact paths",
        icon: MessageCircle,
    },
    {
        label: "Phone Call Clicks",
        value: "18",
        detail: "Mostly from direct and referral traffic",
        icon: PhoneCall,
    },
];

export default function AdminAnalyticsPage() {
    return (
        <Wrapper>
            <main className="bg-white">
                <section className="relative overflow-hidden bg-gradient-to-br from-[#001030] via-[#1d3658] to-[#0b1b33]">
                    <div className="absolute inset-0">
                        <div className="absolute left-0 top-0 h-[540px] w-[540px] rounded-full bg-white/10 blur-3xl" />
                        <div className="absolute right-0 bottom-0 h-[520px] w-[520px] rounded-full bg-white/5 blur-3xl" />
                    </div>
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:52px_52px]" />

                    <div className="relative mx-auto max-w-7xl px-6 py-14 lg:px-8">
                        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                            <div>
                                <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white/90">
                                    Static Preview
                                </p>
                                <h1 className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl">
                                    Analytics Dashboard
                                </h1>
                                <p className="mt-2 max-w-2xl text-base leading-relaxed text-white/80">
                                    Demo analytics layout you can show the client right now. Replace this
                                    with live GA4 data once the Measurement ID is shared.
                                </p>
                            </div>

                            <div className="flex flex-col gap-3 sm:flex-row">
                                <Link href="/admin/insights">
                                    <Button
                                        variant="outline"
                                        className="h-12 rounded-lg border-white/25 bg-white/10 px-5 text-white hover:bg-white/15"
                                    >
                                        <ArrowLeft className="mr-2 h-4 w-4" />
                                        Back to Insights
                                    </Button>
                                </Link>

                                <Button className="h-12 rounded-lg bg-white px-6 font-semibold text-[#1d3658] hover:bg-slate-100">
                                    <BarChart3 className="mr-2 h-5 w-5" />
                                    Demo Snapshot
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className="absolute bottom-0 left-0 h-px w-full bg-white/15" />
                </section>

                <section className="relative overflow-hidden bg-gradient-to-br from-white via-slate-50 to-white py-14">
                    <div className="pointer-events-none absolute inset-0 -z-10">
                        <div className="absolute left-0 top-10 h-[520px] w-[520px] rounded-full bg-[#1d3658]/8 blur-3xl" />
                        <div className="absolute right-0 bottom-0 h-[560px] w-[560px] rounded-full bg-[#001030]/6 blur-3xl" />
                        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0b122005_1px,transparent_1px),linear-gradient(to_bottom,#0b122005_1px,transparent_1px)] bg-[size:44px_44px]" />
                    </div>

                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="mb-8 rounded-3xl border border-[#1d3658]/15 bg-white/80 p-5 shadow-sm backdrop-blur">
                            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                                <div>
                                    <p className="text-sm font-semibold text-[#001030]">
                                        Demo data only
                                    </p>
                                    <p className="mt-1 text-sm text-slate-600">
                                        Use this as a presentation-ready admin dashboard until real
                                        analytics is connected.
                                    </p>
                                </div>
                                <div className="inline-flex items-center gap-2 rounded-full bg-[#1d3658]/8 px-4 py-2 text-xs font-semibold text-[#1d3658]">
                                    <Sparkles className="h-4 w-4" />
                                    Waiting for GA4 Measurement ID
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
                            {metrics.map((metric) => {
                                const Icon = metric.icon;

                                return (
                                    <div
                                        key={metric.label}
                                        className="overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-xl"
                                    >
                                        <div className="flex items-start justify-between gap-4">
                                            <div>
                                                <p className="text-sm font-semibold text-slate-500">
                                                    {metric.label}
                                                </p>
                                                <p className="mt-3 text-3xl font-semibold tracking-tight text-[#001030]">
                                                    {metric.value}
                                                </p>
                                            </div>
                                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#1d3658]/10">
                                                <Icon className="h-6 w-6 text-[#1d3658]" />
                                            </div>
                                        </div>

                                        <div className="mt-4 flex items-center gap-2 text-sm">
                                            <span className="font-semibold text-emerald-600">{metric.change}</span>
                                            <span className="text-slate-500">{metric.note}</span>
                                        </div>

                                        <div className="mt-6 flex h-16 items-end gap-2">
                                            {metric.bars.map((bar, index) => (
                                                <div
                                                    key={`${metric.label}-${index}`}
                                                    className="flex-1 rounded-t-xl bg-gradient-to-t from-[#001030] to-[#7ca2c4]"
                                                    style={{ height: `${bar}%` }}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12">
                            <div className="lg:col-span-5">
                                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl">
                                    <div className="flex items-center justify-between gap-4">
                                        <div>
                                            <p className="text-sm font-semibold uppercase tracking-wide text-[#1d3658]">
                                                Traffic Channels
                                            </p>
                                            <h2 className="mt-2 text-2xl font-semibold leading-tight text-[#001030]">
                                                Acquisition mix
                                            </h2>
                                        </div>
                                        <div className="rounded-2xl bg-[#1d3658]/10 p-3">
                                            <ArrowUpRight className="h-5 w-5 text-[#1d3658]" />
                                        </div>
                                    </div>

                                    <div className="mt-6 space-y-4">
                                        {channels.map((channel) => (
                                            <div key={channel.label}>
                                                <div className="mb-2 flex items-center justify-between gap-4">
                                                    <p className="text-sm font-semibold text-[#001030]">
                                                        {channel.label}
                                                    </p>
                                                    <div className="flex items-center gap-3 text-sm">
                                                        <span className="text-slate-500">{channel.share}%</span>
                                                        <span className="font-semibold text-emerald-600">
                                                            {channel.trend}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="h-3 rounded-full bg-slate-100">
                                                    <div
                                                        className={`h-3 rounded-full ${channel.tone}`}
                                                        style={{ width: `${channel.share}%` }}
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="lg:col-span-7">
                                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl">
                                    <div className="flex items-center justify-between gap-4">
                                        <div>
                                            <p className="text-sm font-semibold uppercase tracking-wide text-[#1d3658]">
                                                Top Pages
                                            </p>
                                            <h2 className="mt-2 text-2xl font-semibold leading-tight text-[#001030]">
                                                High-interest content
                                            </h2>
                                        </div>
                                        <div className="rounded-2xl bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-600">
                                            Last 30 days
                                        </div>
                                    </div>

                                    <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200">
                                        <div className="grid grid-cols-[1.4fr_0.9fr_0.7fr] gap-4 bg-slate-50 px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                                            <span>Page</span>
                                            <span>Sessions</span>
                                            <span>Conv. Rate</span>
                                        </div>

                                        {topPages.map((page) => (
                                            <div
                                                key={page.page}
                                                className="grid grid-cols-[1.4fr_0.9fr_0.7fr] gap-4 border-t border-slate-200 px-5 py-4 text-sm"
                                            >
                                                <div>
                                                    <p className="font-semibold text-[#001030]">{page.label}</p>
                                                    <p className="mt-1 font-mono text-xs text-slate-500">
                                                        {page.page}
                                                    </p>
                                                </div>
                                                <p className="font-semibold text-slate-700">{page.sessions}</p>
                                                <p className="font-semibold text-emerald-600">{page.rate}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12">
                            <div className="lg:col-span-7">
                                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl">
                                    <p className="text-sm font-semibold uppercase tracking-wide text-[#1d3658]">
                                        Conversion Events
                                    </p>
                                    <h2 className="mt-2 text-2xl font-semibold leading-tight text-[#001030]">
                                        Actions worth tracking
                                    </h2>

                                    <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                                        {conversions.map((item) => {
                                            const Icon = item.icon;

                                            return (
                                                <div
                                                    key={item.label}
                                                    className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5"
                                                >
                                                    <div className="flex items-start justify-between gap-4">
                                                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#1d3658]/10">
                                                            <Icon className="h-5 w-5 text-[#1d3658]" />
                                                        </div>
                                                        <p className="text-2xl font-semibold text-[#001030]">
                                                            {item.value}
                                                        </p>
                                                    </div>
                                                    <p className="mt-4 font-semibold text-[#001030]">
                                                        {item.label}
                                                    </p>
                                                    <p className="mt-2 text-sm leading-relaxed text-slate-600">
                                                        {item.detail}
                                                    </p>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>

                            <div className="lg:col-span-5">
                                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl">
                                    <p className="text-sm font-semibold uppercase tracking-wide text-[#1d3658]">
                                        Ready for Live Data
                                    </p>
                                    <h2 className="mt-2 text-2xl font-semibold leading-tight text-[#001030]">
                                        GA4 handover checklist
                                    </h2>

                                    <div className="mt-6 space-y-4">
                                        {[
                                            "GA4 Measurement ID",
                                            "Tracked domains",
                                            "Conversion events list",
                                            "Cookie consent requirement",
                                            "Optional GTM container",
                                        ].map((item) => (
                                            <div
                                                key={item}
                                                className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-4"
                                            >
                                                <span className="h-2.5 w-2.5 rounded-full bg-[#1d3658]" />
                                                <span className="font-medium text-slate-700">{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </Wrapper>
    );
}
