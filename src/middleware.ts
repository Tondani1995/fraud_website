import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const COOKIE_NAME = "mk_admin_token";

function getJwtSecret() {
    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error("Missing JWT_SECRET in .env");
    return new TextEncoder().encode(secret);
}

function redirectToLogin(req: NextRequest, nextPath: string) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("next", nextPath);
    return NextResponse.redirect(url);
}

export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    // protect admin routes
    if (!pathname.startsWith("/admin")) return NextResponse.next();

    // legacy /admin/login should land on the actual login page
    if (pathname === "/admin/login") return redirectToLogin(req, "/admin/insights");

    const token = req.cookies.get(COOKIE_NAME)?.value;

    // no token => go login
    if (!token) return redirectToLogin(req, pathname);

    try {
        const { payload } = await jwtVerify(token, getJwtSecret());

        // must be admin
        if (payload.role !== "admin") return redirectToLogin(req, "/admin/insights");

        return NextResponse.next();
    } catch {
        return redirectToLogin(req, pathname);
    }
}

export const config = {
    matcher: ["/admin/:path*"],
};
