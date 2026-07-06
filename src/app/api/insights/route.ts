import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Insight from "@/lib/models/Insight";
import { adminUnauthorizedResponse, getAdminFromRequest } from "@/lib/adminAuth";

function slugify(input: string) {
    return input
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-+|-+$/g, "");
}

const PUBLIC_INSIGHT_FIELDS = "title slug excerpt tags author status publishedAt createdAt updatedAt";

export async function GET(req: Request) {
    try {
        await connectDB();

        const isAdmin = Boolean(await getAdminFromRequest(req));
        const query = isAdmin ? {} : { status: "published" };
        const fields = isAdmin ? undefined : PUBLIC_INSIGHT_FIELDS;

        const insightsQuery = Insight.find(query).sort({ publishedAt: -1, createdAt: -1 });
        const insights = fields ? await insightsQuery.select(fields).lean() : await insightsQuery.lean();

        return NextResponse.json({ success: true, data: insights }, { status: 200 });
    } catch {
        return NextResponse.json(
            { success: false, message: "Failed to fetch insights" },
            { status: 500 }
        );
    }
}

export async function POST(req: Request) {
    try {
        const admin = await getAdminFromRequest(req);
        if (!admin) return adminUnauthorizedResponse();

        await connectDB();

        const body = await req.json();
        const title = (body?.title || "").toString().trim();
        const excerpt = (body?.excerpt || "").toString().trim();
        const content = (body?.content || "").toString().trim();
        const tags = Array.isArray(body?.tags) ? body.tags : [];
        const author = (body?.author || "MK Fraud Insights").toString().trim();
        const status = body?.status === "published" ? "published" : "draft";

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
    } catch {
        return NextResponse.json(
            { success: false, message: "Failed to create insight" },
            { status: 500 }
        );
    }
}
