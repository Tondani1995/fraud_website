import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDB } from "@/lib/mongodb";
import Insight from "@/lib/models/Insight";
import { adminUnauthorizedResponse, getAdminFromRequest } from "@/lib/adminAuth";

type Ctx = { params: Promise<{ id: string }> };

function isValidObjectId(id: string) {
    return mongoose.Types.ObjectId.isValid(id);
}

function buildLookup(id: string, isAdmin: boolean) {
    const lookup = isValidObjectId(id) ? { _id: id } : { slug: id };
    return isAdmin ? lookup : { ...lookup, status: "published" };
}

export async function GET(req: Request, { params }: Ctx) {
    try {
        await connectDB();
        const { id } = await params;
        const isAdmin = Boolean(await getAdminFromRequest(req));

        const doc = await Insight.findOne(buildLookup(id, isAdmin)).lean();

        if (!doc) {
            return NextResponse.json({ message: "Insight not found" }, { status: 404 });
        }

        return NextResponse.json(doc);
    } catch {
        return NextResponse.json(
            { message: "Failed to fetch insight" },
            { status: 500 }
        );
    }
}

export async function PUT(req: Request, { params }: Ctx) {
    try {
        const admin = await getAdminFromRequest(req);
        if (!admin) return adminUnauthorizedResponse();

        await connectDB();
        const { id } = await params;
        const body = await req.json();
        const nextStatus = body?.status === "published" ? "published" : "draft";

        const update = {
            ...body,
            status: nextStatus,
            publishedAt: nextStatus === "published" ? body?.publishedAt || new Date() : null,
        };

        const updated = isValidObjectId(id)
            ? await Insight.findByIdAndUpdate(id, update, { new: true })
            : await Insight.findOneAndUpdate({ slug: id }, update, { new: true });

        if (!updated) {
            return NextResponse.json({ message: "Insight not found" }, { status: 404 });
        }

        return NextResponse.json(updated);
    } catch {
        return NextResponse.json(
            { message: "Failed to update insight" },
            { status: 500 }
        );
    }
}

export async function DELETE(req: Request, { params }: Ctx) {
    try {
        const admin = await getAdminFromRequest(req);
        if (!admin) return adminUnauthorizedResponse();

        await connectDB();
        const { id } = await params;

        const deleted = isValidObjectId(id)
            ? await Insight.findByIdAndDelete(id)
            : await Insight.findOneAndDelete({ slug: id });

        if (!deleted) {
            return NextResponse.json({ message: "Insight not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true });
    } catch {
        return NextResponse.json(
            { message: "Failed to delete insight" },
            { status: 500 }
        );
    }
}
