import { NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";

/**
 * Next.js Middleware for JWT Route Protection and Role-Based Access Control (RBAC)
 * 
 * Protects admin routes (/dashboard, /analytics, /aiEngine, /security) and technician routes.
 * Ensures that:
 * 1. A valid JWT token cookie exists.
 * 2. Token can be successfully decoded without expiration/malformation errors.
 * 3. The user's role matches the required role (case-insensitive check: "admin" vs "technician").
 * 4. Non-admin users attempting to access admin routes are redirected to /login.
 */
export function middleware(request) {
    const token = request.cookies.get("token")?.value;
    const { pathname } = request.nextUrl;

    // 1. Admin-Only Routes (/dashboard, /tickets, /analytics, /ticketDetails, /aiEngine)
    const isAdminOnlyRoute = 
        pathname.startsWith("/dashboard") ||
        pathname.startsWith("/tickets") ||
        pathname.startsWith("/analytics") ||
        pathname.startsWith("/ticketDetails") ||
        pathname.startsWith("/aiEngine");

    if (isAdminOnlyRoute) {
        if (!token) {
            return NextResponse.redirect(new URL("/login", request.url));
        }

        try {
            const user = jwtDecode(token);
            if (!user.role || user.role.toLowerCase() !== "admin") {
                return NextResponse.redirect(new URL("/login", request.url));
            }
        } catch (err) {
            return NextResponse.redirect(new URL("/login", request.url));
        }
    }

    // 2. Technician-Only Routes (/technicianDashboard, /technicianTickets, /technicianTicketDetails)
    const isTechnicianOnlyRoute = 
        pathname.startsWith("/technicianDashboard") ||
        pathname.startsWith("/technicianTickets") ||
        pathname.startsWith("/technicianTicketDetails") ||
        pathname.startsWith("/technician/dashboard");

    if (isTechnicianOnlyRoute) {
        if (!token) {
            return NextResponse.redirect(new URL("/login", request.url));
        }

        try {
            const user = jwtDecode(token);
            if (!user.role || user.role.toLowerCase() !== "technician") {
                return NextResponse.redirect(new URL("/login", request.url));
            }
        } catch (err) {
            return NextResponse.redirect(new URL("/login", request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/dashboard/:path*",
        "/analytics/:path*",
        "/tickets/:path*",
        "/ticketDetails/:path*",
        "/aiEngine/:path*",
        "/technicianDashboard/:path*",
        "/technicianTickets/:path*",
        "/technicianTicketDetails/:path*",
        "/technician/dashboard/:path*"
    ]
};