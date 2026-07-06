import "dotenv/config";

import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongodb";
import { User } from "@/lib/models/User";

async function seed() {
    const email = process.env.SEED_ADMIN_EMAIL?.toLowerCase().trim();
    const plainPassword = process.env.SEED_ADMIN_PASSWORD;

    if (!email || !plainPassword) {
        throw new Error("Set SEED_ADMIN_EMAIL and SEED_ADMIN_PASSWORD before running seed:admin.");
    }

    await connectDB();

    const passwordHash = await bcrypt.hash(plainPassword, 12);

    await User.updateOne(
        { email },
        { $set: { email, passwordHash, role: "admin" } },
        { upsert: true }
    );

    console.log("Admin user created/updated.");
    console.log({ email, role: "admin" });
    process.exit(0);
}

seed().catch((e) => {
    console.error("Seed failed:", e);
    process.exit(1);
});
