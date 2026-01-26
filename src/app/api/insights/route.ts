import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Insight from "@/lib/models/Insight";

function slugify(input: string) {
    return input
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");
}

export async function GET() {
    try {
        await connectDB();
        const insights = await Insight.find({}).sort({ createdAt: -1 }).lean();
        return NextResponse.json({ success: true, data: insights }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json(
            { success: false, message: error?.message || "Failed to fetch insights" },
            { status: 500 }
        );
    }
}

export async function POST(req: Request) {
    try {
        await connectDB();

        const body = await req.json();
        const title = (body?.title || "").toString().trim();
        const excerpt = (body?.excerpt || "").toString().trim();
        const content = (body?.content || "").toString().trim();
        const tags = Array.isArray(body?.tags) ? body.tags : [];
        const author = (body?.author || "MK Fraud Insights").toString().trim();
        const status = (body?.status || "draft").toString().trim();

        if (!title) {
            return NextResponse.json(
                { success: false, message: "Title is required" },
                { status: 400 }
            );
        }

        let slug = (body?.slug || "").toString().trim();
        if (!slug) slug = slugify(title);

        const exists = await Insight.findOne({ slug }).select("_id").lean();
        if (exists) {
            return NextResponse.json(
                { success: false, message: "Slug already exists" },
                { status: 409 }
            );
        }

        const created = await Insight.create({
            title,
            slug,
            excerpt,
            content,
            tags,
            author,
            status,
            publishedAt: status === "published" ? new Date() : null,
        });

        return NextResponse.json({ success: true, data: created }, { status: 201 });
    } catch (error: any) {
        return NextResponse.json(
            { success: false, message: error?.message || "Failed to create insight" },
            { status: 500 }
        );
    }
}
