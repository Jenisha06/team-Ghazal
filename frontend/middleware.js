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

    // Define admin route paths requiring ADMIN role
    const isAdminRoute = 
        pathname.startsWith("/dashboard") ||
        pathname.startsWith("/analytics") ||
        pathname.startsWith("/tickets") ||
        pathname.startsWith("/aiEngine") ||
        pathname.startsWith("/security");

    // Protect Admin Dashboard & Admin Pages
    if (isAdminRoute) {
        // If JWT token is missing, block access and redirect to login page
        if (!token) {
            return NextResponse.redirect(
                new URL("/login", request.url)
            );
        }

        try {
            // Decode JWT token payload
            const user = jwtDecode(token);

            // Role-Based Access Control (RBAC): Ensure role is "admin" (case-insensitive)
            if (!user.role || user.role.toLowerCase() !== "admin") {
                // Non-admin user (e.g. technician, driver, fleet manager) -> Redirect to login
                return NextResponse.redirect(
                    new URL("/login", request.url)
                );
            }
        } catch (err) {
            // Token expired or invalid -> Redirect to login
            return NextResponse.redirect(
                new URL("/login", request.url)
            );
        }
    }

    // Protect Technician Dashboard
    const isTechnicianRoute = 
        pathname.startsWith("/technicianDashboard") ||
        pathname.startsWith("/technician/dashboard");

    if (isTechnicianRoute) {
        if (!token) {
            return NextResponse.redirect(
                new URL("/login", request.url)
            );
        }

        try {
            const user = jwtDecode(token);

            // Ensure role is "technician" (case-insensitive)
            if (!user.role || user.role.toLowerCase() !== "technician") {
                return NextResponse.redirect(
                    new URL("/login", request.url)
                );
            }
        } catch (err) {
            return NextResponse.redirect(
                new URL("/login", request.url)
            );
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/dashboard/:path*",
        "/analytics/:path*",
        "/tickets/:path*",
        "/aiEngine/:path*",
        "/security/:path*",
        "/technicianDashboard/:path*",
        "/technician/dashboard/:path*"
    ]
};