import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDB } from "@/lib/mongodb";
import Insight from "@/lib/models/Insight";

type Ctx = { params: Promise<{ id: string }> };

function isValidObjectId(id: string) {
    return mongoose.Types.ObjectId.isValid(id);
}

export async function GET(_: Request, { params }: Ctx) {
    try {
        await connectDB();
        const { id } = await params;

        const doc = isValidObjectId(id)
            ? await Insight.findById(id).lean()
            : await Insight.findOne({ slug: id }).lean();

        if (!doc) {
            return NextResponse.json({ message: "Insight not found" }, { status: 404 });
        }

        return NextResponse.json(doc);
    } catch (err: any) {
        return NextResponse.json(
            { message: err?.message || "Failed to fetch insight" },
            { status: 500 }
        );
    }
}

export async function PUT(req: Request, { params }: Ctx) {
    try {
        await connectDB();
        const { id } = await params;
        const body = await req.json();

        const updated = isValidObjectId(id)
            ? await Insight.findByIdAndUpdate(id, body, { new: true })
            : await Insight.findOneAndUpdate({ slug: id }, body, { new: true });

        if (!updated) {
            return NextResponse.json({ message: "Insight not found" }, { status: 404 });
        }

        return NextResponse.json(updated);
    } catch (err: any) {
        return NextResponse.json(
            { message: err?.message || "Failed to update insight" },
            { status: 500 }
        );
    }
}

export async function DELETE(_: Request, { params }: Ctx) {
    try {
        await connectDB();
        const { id } = await params;

        const deleted = isValidObjectId(id)
            ? await Insight.findByIdAndDelete(id)
            : await Insight.findOneAndDelete({ slug: id });

        if (!deleted) {
            return NextResponse.json({ message: "Insight not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true });
    } catch (err: any) {
        return NextResponse.json(
            { message: err?.message || "Failed to delete insight" },
            { status: 500 }
        );
    }
}
