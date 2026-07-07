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
import { trackEvent } from "@/lib/gtag";

type NavLink =
    | { name: string; href: string; dropdown?: undefined }
    | {
        name: string;
        href: string;
        dropdown: { name: string; href: string }[];
    };

const BRAND = {
    navy: "#001030",
    gray: "#405050",
};

export default function Navbar() {
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
                    { name: "Fraud Readiness Score", href: "/fraud-readiness-score" },
                    { name: "Fraud Health Check", href: "/services#health-check" },
                    { name: "Threat Intelligence for Fraud", href: "/services#threat-intelligence" },
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
                                        className="flex items-center gap-1 py-3 font-medium text-slate-700 transition-colors hover:text-[#001030]"
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
                                        className="group flex items-center gap-1 py-3 font-medium text-slate-700 transition-colors hover:text-[#001030]"
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
                                            className="absolute left-1/2 top-full w-80 -translate-x-1/2 rounded-2xl border border-slate-200 bg-white p-3 shadow-2xl"
                                        >
                                            {link.dropdown.map((item, index) => (
                                                <Link
                                                    key={item.name}
                                                    href={item.href}
                                                    onClick={() => setActiveDropdown(null)}
                                                    className={`block rounded-xl px-4 py-3 text-sm font-medium transition ${index === 0 ? "bg-[#001030] text-white hover:bg-[#0b1b44]" : "text-slate-700 hover:bg-slate-50 hover:text-[#001030]"}`}
                                                >
                                                    {item.name}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    <div className="hidden items-center gap-3 lg:flex">
                        <Link
                            href="mailto:hello@mkfraud.co.za"
                            onClick={() =>
                                trackEvent("contact_click", {
                                    contact_type: "email",
                                    placement: "navbar",
                                })
                            }
                            className="flex items-center gap-2 text-sm font-semibold text-slate-600 transition-colors hover:text-[#001030]"
                        >
                            <Mail className="h-4 w-4" />
                            <span className="hidden xl:inline">hello@mkfraud.co.za</span>
                        </Link>
                        <Link
                            href="/fraud-readiness-score"
                            onClick={() =>
                                trackEvent("cta_click", {
                                    cta_name: "start_readiness_score",
                                    placement: "navbar",
                                })
                            }
                        >
                            <Button
                                size="lg"
                                className="group relative overflow-hidden px-8 py-6 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
                                style={{ backgroundColor: "#04123b" }}
                            >
                                Start Score
                            </Button>
                        </Link>
                    </div>

                    <div className="lg:hidden">
                        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                            <SheetTrigger asChild>
                                <button
                                    className="flex h-10  w-10 items-center justify-center rounded-lg border-2 border-slate-200 bg-white transition-all duration-300 hover:bg-slate-50"
                                    aria-label="Open menu"
                                >
                                    <Menu className="h-5 w-5" style={{ color: BRAND.navy }} />
                                </button>
                            </SheetTrigger>

                            <SheetContent side="right" className="w-full max-w-sm p-0">
                                <SheetHeader className="sr-only">
                                    <SheetTitle>Navigation menu</SheetTitle>
                                </SheetHeader>

                                <div className="flex h-full flex-col bg-white">
                                    <div className="flex items-center justify-between border-b border-slate-200 p-6">
                                        <Link href="/" onClick={() => setIsSheetOpen(false)}>
                                            <Image src="/logo.png" width={160} height={42} alt="MK Fraud Insights" />
                                        </Link>
                                        <button
                                            className="flex h-10 w-10 items-center justify-center rounded-lg border-2 border-slate-200 bg-white"
                                            onClick={() => setIsSheetOpen(false)}
                                            aria-label="Close menu"
                                        >
                                            <X className="h-5 w-5" style={{ color: BRAND.navy }} />
                                        </button>
                                    </div>

                                    <div className="flex-1 overflow-y-auto p-6">
                                        <nav className="space-y-2">
                                            {navLinks.map((link) =>
                                                link.dropdown ? (
                                                    <Accordion key={link.name} type="single" collapsible>
                                                        <AccordionItem value={link.name} className="border-none">
                                                            <AccordionTrigger className="rounded-xl px-4 py-3 text-base font-semibold text-slate-700 hover:bg-slate-50 hover:no-underline">
                                                                {link.name}
                                                            </AccordionTrigger>
                                                            <AccordionContent className="pb-2 pl-4">
                                                                <div className="space-y-1">
                                                                    {link.dropdown.map((item, index) => (
                                                                        <Link
                                                                            key={item.name}
                                                                            href={item.href}
                                                                            onClick={() => setIsSheetOpen(false)}
                                                                            className={`block rounded-lg px-4 py-2 text-sm ${index === 0 ? "bg-[#001030] font-semibold text-white" : "text-slate-600 hover:bg-slate-50 hover:text-[#001030]"}`}
                                                                        >
                                                                            {item.name}
                                                                        </Link>
                                                                    ))}
                                                                </div>
                                                            </AccordionContent>
                                                        </AccordionItem>
                                                    </Accordion>
                                                ) : (
                                                    <Link
                                                        key={link.name}
                                                        href={link.href}
                                                        onClick={() => setIsSheetOpen(false)}
                                                        className="block rounded-xl px-4 py-3 text-base font-semibold text-slate-700 transition hover:bg-slate-50 hover:text-[#001030]"
                                                    >
                                                        {link.name}
                                                    </Link>
                                                )
                                            )}
                                        </nav>
                                    </div>

                                    <div className="border-t border-slate-200 p-6">
                                        <Link href="/fraud-readiness-score" onClick={() => setIsSheetOpen(false)}>
                                            <Button
                                                size="lg"
                                                className="w-full rounded-xl py-6 text-base font-semibold"
                                                style={{ backgroundColor: BRAND.navy }}
                                            >
                                                Start the Score
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
