import type { ReactNode } from "react";
import { CheckCircle2 } from "lucide-react";

function normalizeText(text: string) {
    return (text || "").replace(/\r\n/g, "\n").trim();
}

function isSafeHref(href: string) {
    const value = href.trim();
    if (!value) return false;

    return (
        /^https?:\/\//i.test(value) ||
        /^mailto:/i.test(value) ||
        /^tel:/i.test(value) ||
        value.startsWith("/") ||
        value.startsWith("#")
    );
}

function renderInline(text: string, keyPrefix: string) {
    const nodes: ReactNode[] = [];
    const tokenRegex =
        /\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*|==([^=]+)==|\*([^*\n]+)\*|<u>(.*?)<\/u>/gi;
    let lastIndex = 0;
    let matchIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = tokenRegex.exec(text)) !== null) {
        if (match.index > lastIndex) {
            nodes.push(text.slice(lastIndex, match.index));
        }

        const [
            fullMatch,
            linkLabel,
            linkHref,
            boldText,
            highlightText,
            italicText,
            underlineText,
        ] = match;
        const key = `${keyPrefix}-${matchIndex}`;

        if (linkLabel && linkHref) {
            const href = linkHref.trim();

            if (isSafeHref(href)) {
                const external = /^https?:\/\//i.test(href);
                nodes.push(
                    <a
                        key={key}
                        href={href}
                        className="font-semibold text-[#1d3658] underline decoration-[#1d3658]/35 underline-offset-4 transition-colors hover:text-[#001030]"
                        target={external ? "_blank" : undefined}
                        rel={external ? "noreferrer noopener" : undefined}
                    >
                        {linkLabel}
                    </a>
                );
            } else {
                nodes.push(linkLabel);
            }
        } else if (boldText) {
            nodes.push(
                <strong key={key} className="font-semibold text-[#001030]">
                    {boldText}
                </strong>
            );
        } else if (highlightText) {
            nodes.push(
                <mark
                    key={key}
                    className="rounded-md bg-[#ffe58f] px-1.5 py-0.5 text-[#001030]"
                >
                    {highlightText}
                </mark>
            );
        } else if (italicText) {
            nodes.push(
                <em key={key} className="italic text-slate-700">
                    {italicText}
                </em>
            );
        } else if (underlineText) {
            nodes.push(
                <span
                    key={key}
                    className="underline decoration-[#1d3658]/40 underline-offset-4"
                >
                    {underlineText}
                </span>
            );
        } else {
            nodes.push(fullMatch);
        }

        lastIndex = match.index + fullMatch.length;
        matchIndex += 1;
    }

    if (lastIndex < text.length) {
        nodes.push(text.slice(lastIndex));
    }

    return nodes.length ? nodes : [text];
}

function renderLines(lines: string[], keyPrefix: string) {
    const nodes: ReactNode[] = [];

    lines.forEach((line, index) => {
        if (index > 0) nodes.push(<br key={`${keyPrefix}-br-${index}`} />);
        nodes.push(...renderInline(line, `${keyPrefix}-line-${index}`));
    });

    return nodes;
}

function renderHeading(level: number, text: string, key: string) {
    if (level === 1) {
        return (
            <h2 key={key} className="mt-10 text-3xl font-semibold tracking-tight text-[#001030]">
                {renderInline(text, `${key}-h1`)}
            </h2>
        );
    }

    if (level === 2) {
        return (
            <h3 key={key} className="mt-10 text-2xl font-semibold tracking-tight text-[#001030]">
                {renderInline(text, `${key}-h2`)}
            </h3>
        );
    }

    return (
        <h4 key={key} className="mt-8 text-xl font-semibold tracking-tight text-[#001030]">
            {renderInline(text, `${key}-h3`)}
        </h4>
    );
}

export function stripInsightFormatting(text: string) {
    return normalizeText(text)
        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1")
        .replace(/<u>(.*?)<\/u>/gi, "$1")
        .replace(/\*\*(.*?)\*\*/g, "$1")
        .replace(/==(.*?)==/g, "$1")
        .replace(/\*(.*?)\*/g, "$1")
        .replace(/^#{1,3}\s+/gm, "")
        .replace(/^(-|\*|\u2022)\s+/gm, "")
        .replace(/^\d+\.\s+/gm, "")
        .replace(/^>\s+/gm, "");
}

export function renderInsightRichText(text: string) {
    const normalized = normalizeText(text);
    if (!normalized) return null;

    const blocks = normalized
        .split(/\n{2,}/)
        .map((block) => block.trim())
        .filter(Boolean);

    return blocks.map((block, blockIndex) => {
        const lines = block
            .split("\n")
            .map((line) => line.trim())
            .filter(Boolean);
        const key = `block-${blockIndex}`;

        if (!lines.length) return null;

        if (lines.length === 1) {
            const headingMatch = lines[0].match(/^(#{1,3})\s+(.+)$/);
            if (headingMatch) {
                return renderHeading(headingMatch[1].length, headingMatch[2].trim(), key);
            }
        }

        const isBullets = lines.every((line) => /^(-|\*|\u2022)\s+/.test(line));
        if (isBullets) {
            return (
                <ul key={key} className="mt-5 space-y-3">
                    {lines.map((line, lineIndex) => {
                        const item = line.replace(/^(-|\*|\u2022)\s+/, "");
                        return (
                            <li key={`${key}-li-${lineIndex}`} className="flex items-start gap-3">
                                <span className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#1d3658]/10">
                                    <CheckCircle2 className="h-4 w-4 text-[#1d3658]" strokeWidth={3} />
                                </span>
                                <span className="text-slate-700">
                                    {renderInline(item, `${key}-item-${lineIndex}`)}
                                </span>
                            </li>
                        );
                    })}
                </ul>
            );
        }

        const isOrderedList = lines.every((line) => /^\d+\.\s+/.test(line));
        if (isOrderedList) {
            return (
                <ol
                    key={key}
                    className="mt-5 list-decimal space-y-3 pl-6 marker:font-semibold marker:text-[#1d3658]"
                >
                    {lines.map((line, lineIndex) => {
                        const item = line.replace(/^\d+\.\s+/, "");
                        return (
                            <li key={`${key}-ol-${lineIndex}`} className="pl-1 text-slate-700">
                                {renderInline(item, `${key}-ordered-${lineIndex}`)}
                            </li>
                        );
                    })}
                </ol>
            );
        }

        const isQuote = lines.every((line) => /^>\s+/.test(line));
        if (isQuote) {
            const quoteLines = lines.map((line) => line.replace(/^>\s+/, ""));

            return (
                <blockquote
                    key={key}
                    className="mt-6 rounded-2xl border-l-4 border-[#1d3658] bg-[#1d3658]/6 px-5 py-4 text-slate-700 shadow-sm"
                >
                    <div className="leading-relaxed text-slate-700">
                        {renderLines(quoteLines, `${key}-quote`)}
                    </div>
                </blockquote>
            );
        }

        const maybeLegacyHeading =
            lines.length === 1 &&
            block.length <= 70 &&
            block.split(" ").length <= 8;

        if (maybeLegacyHeading) {
            return (
                <h3 key={key} className="mt-10 text-2xl font-semibold tracking-tight text-[#001030]">
                    {renderInline(block, `${key}-legacy-heading`)}
                </h3>
            );
        }

        return (
            <p key={key} className="mt-5 leading-relaxed text-slate-700">
                {renderLines(lines, key)}
            </p>
        );
    });
}