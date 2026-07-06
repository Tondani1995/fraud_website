"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const linkedInUrl = process.env.NEXT_PUBLIC_LINKEDIN_URL || "/contact";
const calendlyUrl = "https://calendly.com/mkfraud/30min?embed_domain=mkfraud.co.za&embed_type=Inline";

export default function SiteRuntimeFixes() {
    const pathname = usePathname();

    useEffect(() => {
        if (typeof document === "undefined") return;

        document
            .querySelectorAll<HTMLAnchorElement>('a[href="#"], a[href="https://www.linkedin.com"]')
            .forEach((anchor) => {
                const label = anchor.textContent?.toLowerCase() || "";
                const ariaLabel = anchor.getAttribute("aria-label")?.toLowerCase() || "";
                const isLinkedIn = label.includes("linkedin") || ariaLabel.includes("linkedin");

                if (isLinkedIn || anchor.href.endsWith("#")) {
                    anchor.href = linkedInUrl;
                    anchor.rel = linkedInUrl.startsWith("http") ? "noopener noreferrer" : "";
                }
            });

        document
            .querySelectorAll<HTMLIFrameElement>('iframe[src*="calendly.com/mkfraud/30min"]')
            .forEach((iframe) => {
                if (iframe.src !== calendlyUrl) iframe.src = calendlyUrl;
            });
    }, [pathname]);

    return null;
}
