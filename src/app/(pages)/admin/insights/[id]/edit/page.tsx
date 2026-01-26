"use client";

import Wrapper from "@/app/Wrapper";
import axios from "axios";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, Save, Loader2 } from "lucide-react";

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

export default function EditInsightPage() {
    const router = useRouter();
    const params = useParams<{ id: string }>();
    const id = params?.id;

    const [title, setTitle] = useState("");
    const [slug, setSlug] = useState("");
    const [excerpt, setExcerpt] = useState("");
    const [content, setContent] = useState("");
    const [tagsRaw, setTagsRaw] = useState("");
    const [status, setStatus] = useState<"draft" | "published">("draft");

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const tags = useMemo(() => {
        return tagsRaw.split(",").map((t) => t.trim()).filter(Boolean);
    }, [tagsRaw]);

    useEffect(() => {
        if (!id) return;

        async function fetchInsight() {
            try {
                const res = await axios.get(`/api/insights/${id}`);
                const data = res.data;
                setTitle(data.title);
                setSlug(data.slug);
                setExcerpt(data.excerpt);
                setContent(data.content);
                setTagsRaw((data.tags || []).join(", "));
                setStatus(data.status);
            } catch {
                setError("Failed to load insight");
            } finally {
                setLoading(false);
            }
        }

        fetchInsight();
    }, [id]);

    async function onSave() {
        setSaving(true);
        setError(null);

        try {
            await axios.put(`/api/insights/${id}`, {
                title,
                slug,
                excerpt,
                content,
                tags,
                status,
            });

            router.push("/admin/insights");
            router.refresh();
        } catch {
            setError("Failed to update insight");
        } finally {
            setSaving(false);
        }
    }

    if (loading) {
        return (
            <div className="flex h-[60vh] items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-[#1d3658]" />
            </div>
        );
    }

    return (
        <main className="bg-white py-20">
            <section className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
                <div className="mb-6 flex items-center justify-between">
                    <h1 className="text-3xl font-semibold text-[#001030]">Edit Insight</h1>
                    <Link href="/admin/insights" className="text-sm font-semibold text-[#1d3658]">
                        ← Back
                    </Link>
                </div>

                {error && (
                    <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                        {error}
                    </div>
                )}

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
                    <div className="lg:col-span-8">
                        <Card className="rounded-3xl border-2">
                            <CardHeader>
                                <CardTitle>Content</CardTitle>
                                <CardDescription>Edit your insight content</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-5">
                                <div>
                                    <Label>Title</Label>
                                    <Input className="mt-1.5" value={title} onChange={(e) => setTitle(e.target.value)} />
                                </div>

                                <div>
                                    <Label>Slug</Label>
                                    <Input className="mt-1.5" value={slug} onChange={(e) => setSlug(e.target.value)} />
                                </div>

                                <div>
                                    <Label>Excerpt</Label>
                                    <Textarea className="mt-2" value={excerpt} onChange={(e) => setExcerpt(e.target.value)} />
                                </div>

                                <div>
                                    <Label>Content</Label>
                                    <Textarea
                                        rows={10}
                                        className="min-h-[220px] mt-2"
                                        value={content}
                                        onChange={(e) => setContent(e.target.value)}
                                    />
                                </div>

                                <div>
                                    <Label>Tags</Label>
                                    <Input className="mt-1.5" value={tagsRaw} onChange={(e) => setTagsRaw(e.target.value)} />
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="lg:col-span-4">
                        <Card className="rounded-3xl border-2">
                            <CardHeader>
                                <CardTitle>Settings</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-5">
                                <div>
                                    <Label>Status</Label>
                                    <Select value={status} onValueChange={(v) => setStatus(v as any)}>
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="draft">Draft</SelectItem>
                                            <SelectItem value="published">Published</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <Button
                                    onClick={onSave}
                                    disabled={saving}
                                    className="w-full bg-[#001030] text-white"
                                >
                                    {saving ? "Saving..." : "Save Changes"}
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>
        </main>
    );
}
