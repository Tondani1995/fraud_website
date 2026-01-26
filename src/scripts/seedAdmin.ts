import "dotenv/config"; // ✅ loads .env into process.env

import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongodb";
import { User } from "@/lib/models/User";

async function seed() {
    await connectDB();

    const email = "admin@gmail.com";
    const plainPassword = "123456";
    const passwordHash = await bcrypt.hash(plainPassword, 10);

    await User.updateOne(
        { email },
        { $set: { email, passwordHash, role: "admin" } },
        { upsert: true }
    );

    console.log("✅ Admin user created/updated:");
    console.log({ email, password: plainPassword, role: "admin" });
    process.exit(0);
}

seed().catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
});
