import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const COOKIE_NAME = "mk_admin_token";

function getJwtSecret() {
    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error("Missing JWT_SECRET in .env");
    return new TextEncoder().encode(secret);
}

export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    // protect admin routes
    if (!pathname.startsWith("/admin")) return NextResponse.next();

    const token = req.cookies.get(COOKIE_NAME)?.value;

    // no token => go login
    if (!token) {
        const url = req.nextUrl.clone();
        url.pathname = "/admin/login";
        url.searchParams.set("next", pathname);
        return NextResponse.redirect(url);
    }

    try {
        const { payload } = await jwtVerify(token, getJwtSecret());

        // must be admin
        if (payload.role !== "admin") {
            const url = req.nextUrl.clone();
            url.pathname = "/admin/login";
            return NextResponse.redirect(url);
        }

        return NextResponse.next();
    } catch {
        const url = req.nextUrl.clone();
        url.pathname = "/admin/login";
        return NextResponse.redirect(url);
    }
}

export const config = {
    matcher: ["/admin/:path*"],
};
