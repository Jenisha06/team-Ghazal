import { getUser } from "./auth";

/**
 * Client-Side Protection Guard for Admin Dashboard & Admin Routes.
 * Verifies JWT token existence and checks whether the user's role is "admin".
 * Redirects unauthorized or non-admin users to the /login page.
 */
export function requireAdmin() {
    const user = getUser();

    if (!user) {
        if (typeof window !== "undefined") {
            window.location.href = "/login";
        }
        return null;
    }

    // Role-Based Access Control (RBAC): Admin Role Check (Case-insensitive)
    if (!user.role || user.role.toLowerCase() !== "admin") {
        if (typeof window !== "undefined") {
            window.location.href = "/login";
        }
        return null;
    }

    return user;
}

/**
 * Client-Side Protection Guard for Technician Dashboard.
 */
export function requireTechnician() {
    const user = getUser();

    if (!user) {
        if (typeof window !== "undefined") {
            window.location.href = "/login";
        }
        return null;
    }

    if (!user.role || user.role.toLowerCase() !== "technician") {
        if (typeof window !== "undefined") {
            window.location.href = "/login";
        }
        return null;
    }

    return user;
}

/**
 * Client-Side Protection Guard for Shared Routes (/tickets, /ticketDetails).
 * Allows access if a valid JWT exists for either "admin" or "technician" roles.
 */
export function requireAuth() {
    const user = getUser();

    if (!user) {
        if (typeof window !== "undefined") {
            window.location.href = "/login";
        }
        return null;
    }

    const role = (user.role || "").toLowerCase();
    if (role !== "admin" && role !== "technician") {
        if (typeof window !== "undefined") {
            window.location.href = "/login";
        }
        return null;
    }

    return user;
}
