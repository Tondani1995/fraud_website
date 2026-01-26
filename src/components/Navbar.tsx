"use client";

import { Menu, X, ChevronDown, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

type NavLink =
    | { name: string; href: string; dropdown?: undefined }
    | {
        name: string;
        href: string;
        dropdown: { name: string; href: string }[];
    };

const BRAND = {
    navy: "#001030",
    navy2: "#1d3658",
    gray: "#405050",
};

export default function Navbar() {
    const pathname = usePathname();
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const [isSheetOpen, setIsSheetOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    const navLinks: NavLink[] = useMemo(
        () => [
            { name: "Home", href: "/" },
            {
                name: "Services",
                href: "/services",
                dropdown: [
                    { name: "Fraud Health Check", href: "/services#health-check" },
                    { name: "Programme Design", href: "/services#programme-design" },
                    { name: "Awareness & Resilience", href: "/services#awareness" },
                    { name: "Internal Controls", href: "/services#controls" },
                ],
            },
            { name: "Industries", href: "/industries" },
            { name: "About", href: "/about" },
            { name: "Insights", href: "/insights" },
            { name: "Contact", href: "/contact" },
        ],
        []
    );

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        setActiveDropdown(null);
        setIsSheetOpen(false);
    }, [pathname]);

    useEffect(() => {
        const onClickOutside = (e: MouseEvent) => {
            if (!dropdownRef.current) return;
            if (!dropdownRef.current.contains(e.target as Node)) setActiveDropdown(null);
        };
        document.addEventListener("mousedown", onClickOutside);
        return () => document.removeEventListener("mousedown", onClickOutside);
    }, []);

    const isServicesOpen = activeDropdown === "Services";

    return (
        <nav
            className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${isScrolled
                ? "border-b border-slate-200 bg-white/95 shadow-lg backdrop-blur-xl"
                : "bg-white"
                }`}
        >
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="flex h-20 items-center justify-between md:h-24">
                    <div className="flex items-center gap-3">
                        <Link href="/" className="flex items-center">
                            <Image src="/logo.png" width={170} height={44} alt="MK Fraud Insights" priority />
                        </Link>
                    </div>

                    <div className="hidden items-center gap-8 lg:flex">
                        {navLinks.map((link) => {
                            if (!link.dropdown) {
                                return (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        className="flex items-center gap-1 py-3 font-semibold text-slate-700 transition-colors hover:text-[var(--brand-navy)]"
                                        style={{ ["--brand-navy" as any]: BRAND.navy }}
                                    >
                                        {link.name}
                                    </Link>
                                );
                            }

                            return (
                                <div key={link.name} className="relative" ref={dropdownRef}>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setActiveDropdown((v) => (v === link.name ? null : link.name))
                                        }
                                        className="group flex items-center gap-1 py-3 font-semibold text-slate-700 transition-colors hover:text-[var(--brand-navy)]"
                                        style={{ ["--brand-navy" as any]: BRAND.navy }}
                                        aria-haspopup="menu"
                                        aria-expanded={isServicesOpen}
                                    >
                                        {link.name}
                                        <ChevronDown
                                            className={`h-4 w-4 transition-transform duration-300 ${isServicesOpen ? "rotate-180" : ""
                                                }`}
                                        />
                                    </button>

                                    {isServicesOpen && (
                                        <div
                                            role="menu"
                                            className="absolute left-0 top-full mt-0 w-72 overflow-hidden rounded-2xl border-2 border-slate-200 bg-white shadow-2xl"
                                        >
                                            <div className="p-2">
                                                {link.dropdown.map((item) => (
                                                    <Link
                                                        key={item.name}
                                                        href={item.href}
                                                        className="group flex items-center gap-3 rounded-xl p-3 transition-all duration-300 hover:bg-gradient-to-r hover:from-slate-50 hover:to-slate-100"
                                                        onClick={() => setActiveDropdown(null)}
                                                    >
                                                        <div
                                                            className="flex h-2 w-2 rounded-full opacity-0 transition-opacity group-hover:opacity-100"
                                                            style={{
                                                                backgroundImage: `linear-gradient(to right, ${BRAND.navy}, ${BRAND.gray})`,
                                                            }}
                                                        />
                                                        <span
                                                            className="font-semibold text-slate-700 transition-colors group-hover:text-[var(--brand-navy)]"
                                                            style={{ ["--brand-navy" as any]: BRAND.navy }}
                                                        >
                                                            {item.name}
                                                        </span>
                                                    </Link>
                                                ))}
                                            </div>
                                            <div className="border-t border-slate-200 p-3">
                                                <Link
                                                    href="/services"
                                                    className="block rounded-xl px-3 py-2 text-sm font-semibold text-slate-600 transition-colors hover:text-[var(--brand-navy)]"
                                                    style={{ ["--brand-navy" as any]: BRAND.navy }}
                                                    onClick={() => setActiveDropdown(null)}
                                                >
                                                    View all services
                                                </Link>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    <div className="hidden items-center gap-3 lg:flex">
                        <Link
                            href="mailto:hello@mkfraud.co.za"
                            className="flex items-center gap-2 text-sm font-semibold text-slate-600 transition-colors hover:text-[var(--brand-navy)]"
                            style={{ ["--brand-navy" as any]: BRAND.navy }}
                        >
                            <Mail className="h-4 w-4" />
                            <span className="hidden xl:inline">hello@mkfraud.co.za</span>
                        </Link>

                        <Link href="/contact">
                            <Button
                                className="group relative overflow-hidden px-8 py-6 font-bold shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl bg-[#04123b]"
                            // style={{
                            //   backgroundImage: `linear-gradient(to right, ${BRAND.navy}, ${BRAND.navy2}, ${BRAND.gray})`,
                            //   boxShadow: "0 10px 30px rgba(0,16,48,0.18)",
                            // }}
                            >
                                Book a Call
                            </Button>
                        </Link>
                    </div>

                    <div className="lg:hidden">
                        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                            <SheetTrigger asChild>
                                <button
                                    className="flex h-10  w-10 items-center justify-center rounded-lg border-2 border-slate-200 bg-white transition-all duration-300 hover:bg-slate-50"
                                    style={{ borderColor: isSheetOpen ? BRAND.navy : undefined }}
                                    aria-label="Open menu"
                                >
                                    {isSheetOpen ? (
                                        <X className="h-5 w-5" style={{ color: BRAND.navy }} />
                                    ) : (
                                        <Menu className="h-5 w-5" style={{ color: BRAND.navy }} />
                                    )}
                                </button>
                            </SheetTrigger>

                            <SheetContent side="right" className="w-[92vw] max-w-md p-0">
                                <SheetHeader className="sr-only">
                                    <SheetTitle>Navigation menu</SheetTitle>
                                </SheetHeader>

                                <div className="flex items-sta justify-between border-b border-slate-200 px-4 py-4">
                                    <Link href="/" className="flex items-center" onClick={() => setIsSheetOpen(false)}>
                                        <Image src="/logo.png" width={160} height={42} alt="MK Fraud Insights" />
                                    </Link>
                                    <button
                                        onClick={() => setIsSheetOpen(false)}
                                        className="flex h-10 w-10 items-center justify-center rounded-lg border-2 border-slate-200 bg-white relative z-50 transition-all duration-300 hover:bg-slate-50"
                                        style={{ borderColor: BRAND.navy }}
                                        aria-label="Close menu"
                                    >
                                        <X className="h-5 w-5" style={{ color: BRAND.navy }} />
                                    </button>
                                </div>

                                <div className="px-4 py-4 overflow-auto">
                                    <div className="space-y-2">
                                        {navLinks.map((link) => {
                                            if (!link.dropdown) {
                                                return (
                                                    <Link
                                                        key={link.name}
                                                        href={link.href}
                                                        onClick={() => setIsSheetOpen(false)}
                                                        className="flex items-center justify-between rounded-xl border bg-white px-4 py-4 font-semibold text-slate-700 transition-all duration-300 hover:bg-slate-50"
                                                        style={{ borderColor: "rgb(226 232 240)" }}
                                                    >
                                                        <span className="transition-colors" style={{ color: BRAND.navy }}>
                                                            {link.name}
                                                        </span>
                                                    </Link>
                                                );
                                            }

                                            return (
                                                <Accordion key={link.name} type="single" collapsible className="w-full">
                                                    <AccordionItem value="services" className="border-0">
                                                        <AccordionTrigger
                                                            className="rounded-xl border bg-white px-4 py-4 font-semibold text-slate-700 transition-all duration-300 hover:bg-slate-50 [&[data-state=open]]:bg-slate-50"
                                                            style={{ borderColor: "rgb(226 232 240)", color: BRAND.navy }}
                                                        >
                                                            {link.name}
                                                        </AccordionTrigger>
                                                        <AccordionContent className="pb-0 pt-2">
                                                            <div className="space-y-2 rounded-xl border bg-white p-2" style={{ borderColor: "rgb(226 232 240)" }}>
                                                                {link.dropdown.map((item) => (
                                                                    <Link
                                                                        key={item.name}
                                                                        href={item.href}
                                                                        onClick={() => setIsSheetOpen(false)}
                                                                        className="block rounded-lg px-3 py-3 text-sm font-semibold text-slate-700 transition-all duration-300 hover:bg-gradient-to-r hover:from-slate-50 hover:to-slate-100"
                                                                        style={{ color: BRAND.navy }}
                                                                    >
                                                                        {item.name}
                                                                    </Link>
                                                                ))}
                                                                <Link
                                                                    href="/services"
                                                                    onClick={() => setIsSheetOpen(false)}
                                                                    className="block rounded-lg px-3 py-3 text-sm font-semibold transition-colors"
                                                                    style={{ color: BRAND.gray }}
                                                                >
                                                                    View all services
                                                                </Link>
                                                            </div>
                                                        </AccordionContent>
                                                    </AccordionItem>
                                                </Accordion>
                                            );
                                        })}
                                    </div>

                                    <div className="mt-5 space-y-3 border-t border-slate-200 pt-5">
                                        <Link
                                            href="mailto:hello@mkfraud.co.za"
                                            className="flex items-center gap-3 rounded-xl border-2 bg-white p-4 font-semibold transition-all duration-300 hover:bg-slate-50"
                                            style={{ borderColor: "rgb(226 232 240)", color: BRAND.navy }}
                                            onClick={() => setIsSheetOpen(false)}
                                        >
                                            <Mail className="h-5 w-5" style={{ color: BRAND.navy }} />
                                            hello@mkfraud.co.za
                                        </Link>

                                        <Link href="/contact" onClick={() => setIsSheetOpen(false)}>
                                            <Button
                                                className="w-full rounded-xl py-6 font-bold shadow-lg bg-[#04123b]"
                                            >
                                                Book a Call
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </nav>
    );
}
