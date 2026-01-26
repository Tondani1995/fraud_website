"use client";

import Wrapper from "@/app/Wrapper";
import axios from "axios";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Eye, EyeOff, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

type InsightStatus = "draft" | "published";

type CreateInsightPayload = {
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    tags: string[];
    status: InsightStatus;
};

function slugify(input: string) {
    return input
        .toLowerCase()
        .trim()
        .replace(/['’]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
}

export default function NewInsightPage() {
    const router = useRouter();

    const [title, setTitle] = useState("");
    const [slug, setSlug] = useState("");
    const [autoSlug, setAutoSlug] = useState(true);
    const [excerpt, setExcerpt] = useState("");
    const [content, setContent] = useState("");
    const [tagsRaw, setTagsRaw] = useState("");
    const [status, setStatus] = useState<InsightStatus>("draft");

    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const tags = useMemo(() => {
        return tagsRaw
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean);
    }, [tagsRaw]);

    const canSubmit = useMemo(() => {
        return title.trim() && slug.trim() && excerpt.trim() && content.trim();
    }, [title, slug, excerpt, content]);

    async function onSubmit() {
        setError(null);
        if (!canSubmit) {
            setError("Please fill in Title, Slug, Excerpt, and Content.");
            return;
        }

        const payload: CreateInsightPayload = {
            title: title.trim(),
            slug: slug.trim(),
            excerpt: excerpt.trim(),
            content: content.trim(),
            tags,
            status,
        };

        setSubmitting(true);
        try {
            await axios.post("/api/insights", payload);
            router.push("/admin/insights");
            router.refresh();
        } catch (e: any) {
            setError(e?.response?.data?.message || e?.message || "Failed to create insight.");
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <Wrapper>
            <main className="bg-white">
                {/* Header */}
                <section className="relative overflow-hidden bg-gradient-to-br from-[#001030] via-[#1d3658] to-[#0b1b33]">
                    <div className="absolute inset-0">
                        <div className="absolute left-0 top-0 h-[520px] w-[520px] rounded-full bg-white/10 blur-3xl" />
                        <div className="absolute right-0 bottom-0 h-[520px] w-[520px] rounded-full bg-white/5 blur-3xl" />
                    </div>
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:52px_52px]" />

                    <div className="relative mx-auto max-w-7xl px-6 py-16 lg:px-8">
                        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                            <div>
                                <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white/90">
                                    Admin
                                </p>
                                <h1 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                                    Add New Insight
                                </h1>
                                <p className="mt-2 max-w-2xl text-base leading-relaxed text-white/80">
                                    Create a new insight post. You can wire richer editors later.
                                </p>
                            </div>

                            <div className="flex flex-col gap-3 sm:flex-row">
                                <Link
                                    href="/admin/insights"
                                    className="inline-flex h-12 items-center justify-center rounded-2xl border border-white/25 bg-white/10 px-5 text-sm font-semibold text-white hover:bg-white/15"
                                >
                                    <ArrowLeft className="mr-2 h-4 w-4" />
                                    Back
                                </Link>

                                <Button
                                    onClick={onSubmit}
                                    disabled={submitting || !canSubmit}
                                    className="h-12 rounded-2xl bg-white px-6 font-semibold text-[#1d3658] hover:bg-slate-100"
                                >
                                    {submitting ? (
                                        <span className="flex items-center gap-2">
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                            Saving...
                                        </span>
                                    ) : (
                                        <span className="flex items-center gap-2">
                                            <Save className="h-5 w-5" />
                                            Save
                                        </span>
                                    )}
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className="absolute bottom-0 left-0 h-px w-full bg-white/15" />
                </section>

                {/* Form */}
                <section className="relative overflow-hidden bg-gradient-to-br from-white via-slate-50 to-white">
                    <div className="pointer-events-none absolute inset-0 -z-10">
                        <div className="absolute left-0 top-10 h-[520px] w-[520px] rounded-full bg-[#1d3658]/8 blur-3xl" />
                        <div className="absolute right-0 bottom-0 h-[560px] w-[560px] rounded-full bg-[#001030]/6 blur-3xl" />
                        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0b122005_1px,transparent_1px),linear-gradient(to_bottom,#0b122005_1px,transparent_1px)] bg-[size:44px_44px]" />
                    </div>

                    <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8 lg:py-12 ">
                        {error && (
                            <div className="mb-6 overflow-hidden rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700 shadow-sm">
                                <p className="font-semibold">{error}</p>
                            </div>
                        )}

                        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 py-16">
                            <div className="lg:col-span-8">
                                <Card className="rounded-3xl border-2 border-slate-200 shadow-2xl">
                                    <CardHeader>
                                        <CardTitle className="text-xl font-semibold text-[#001030]">Content</CardTitle>
                                        <CardDescription>
                                            Keep it simple for now — later you can add a rich text editor.
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="title" className="text-sm font-semibold text-slate-700">
                                                Title
                                            </Label>
                                            <Input
                                                id="title"
                                                value={title}
                                                onChange={(e) => {
                                                    const v = e.target.value;
                                                    setTitle(v);
                                                    if (autoSlug) setSlug(slugify(v));
                                                }}
                                                className="h-12 rounded-2xl"
                                                placeholder="e.g. Control Gaps & Early Warning Signals"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between gap-3">
                                                <Label htmlFor="slug" className="text-sm font-semibold text-slate-700">
                                                    Slug
                                                </Label>
                                                <div className="flex items-center gap-2">
                                                    <Switch
                                                        checked={autoSlug}
                                                        onCheckedChange={(v) => setAutoSlug(Boolean(v))}
                                                        id="autoSlug"
                                                    />
                                                    <Label htmlFor="autoSlug" className="text-xs text-slate-600">
                                                        Auto-generate
                                                    </Label>
                                                </div>
                                            </div>

                                            <Input
                                                id="slug"
                                                value={slug}
                                                onChange={(e) => {
                                                    setSlug(e.target.value);
                                                    setAutoSlug(false);
                                                }}
                                                className="h-12 rounded-2xl font-mono"
                                                placeholder="e.g. control-gaps-early-warning"
                                            />
                                            <p className="text-xs text-slate-500">
                                                This becomes the URL: <span className="font-mono">/insights/{slug || "your-slug"}</span>
                                            </p>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="excerpt" className="text-sm font-semibold text-slate-700">
                                                Excerpt
                                            </Label>
                                            <Textarea
                                                id="excerpt"
                                                value={excerpt}
                                                onChange={(e) => setExcerpt(e.target.value)}
                                                className="min-h-[110px] rounded-2xl"
                                                placeholder="Short summary shown on cards and list pages..."
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="content" className="text-sm font-semibold text-slate-700">
                                                Content
                                            </Label>
                                            <Textarea
                                                id="content"
                                                value={content}
                                                onChange={(e) => setContent(e.target.value)}
                                                className="min-h-[240px] rounded-2xl"
                                                placeholder="Write the full article here..."
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="tags" className="text-sm font-semibold text-slate-700">
                                                Tags
                                            </Label>
                                            <Input
                                                id="tags"
                                                value={tagsRaw}
                                                onChange={(e) => setTagsRaw(e.target.value)}
                                                className="h-12 rounded-2xl"
                                                placeholder="e.g. Readiness, Controls, Operations"
                                            />
                                            <p className="text-xs text-slate-500">Comma-separated.</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            <div className="lg:col-span-4">
                                <div className="sticky top-8 space-y-6">
                                    <Card className="rounded-3xl border-2 border-slate-200 shadow-xl">
                                        <CardHeader>
                                            <CardTitle className="text-xl font-semibold text-[#001030]">Settings</CardTitle>
                                            <CardDescription>Publishing and quick preview.</CardDescription>
                                        </CardHeader>
                                        <CardContent className="space-y-5">
                                            <div className="space-y-2">
                                                <Label className="text-sm font-semibold text-slate-700">Status</Label>
                                                <Select value={status} onValueChange={(v) => setStatus(v as InsightStatus)}>
                                                    <SelectTrigger className="h-12 rounded-2xl">
                                                        <SelectValue placeholder="Select status" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="draft">Draft</SelectItem>
                                                        <SelectItem value="published">Published</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-5">
                                                <p className="text-sm font-semibold text-[#001030]">Preview</p>
                                                <p className="mt-1 text-sm text-slate-600">
                                                    After saving, visit the insight detail route.
                                                </p>
                                                <Button
                                                    variant="outline"
                                                    className="mt-4 h-12 w-full rounded-2xl"
                                                    onClick={() => {
                                                        if (!slug.trim()) return;
                                                        router.push(`/insights/${slug.trim()}`);
                                                    }}
                                                    disabled={!slug.trim()}
                                                >
                                                    <span className="flex items-center gap-2">
                                                        <Eye className="h-4 w-4" />
                                                        Open Preview
                                                    </span>
                                                </Button>
                                            </div>

                                            <Button
                                                onClick={onSubmit}
                                                disabled={submitting || !canSubmit}
                                                className="h-12 w-full rounded-2xl bg-[#001030] px-6 font-semibold text-white hover:opacity-95"
                                            >
                                                {submitting ? (
                                                    <span className="flex items-center gap-2">
                                                        <Loader2 className="h-4 w-4 animate-spin" />
                                                        Saving...
                                                    </span>
                                                ) : (
                                                    <span className="flex items-center gap-2">
                                                        <Save className="h-5 w-5" />
                                                        Save Insight
                                                    </span>
                                                )}
                                            </Button>
                                        </CardContent>
                                    </Card>

                                    <Card className="rounded-3xl border-2 border-slate-200 shadow-xl">
                                        <CardHeader>
                                            <CardTitle className="text-lg font-semibold text-[#001030]">Tips</CardTitle>
                                            <CardDescription>Keep URLs clean and consistent.</CardDescription>
                                        </CardHeader>
                                        <CardContent className="space-y-2 text-sm text-slate-600">
                                            <p>• Title is required.</p>
                                            <p>• Slug must be unique.</p>
                                            <p>• Excerpt appears on listing cards.</p>
                                            <p>• Tags help filtering later.</p>
                                        </CardContent>
                                    </Card>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="absolute bottom-0 left-0 h-px w-full bg-[#1d3658]/15" />
                </section>
            </main>
        </Wrapper>
    );
}
