/**
 * Backend Role-Based Access Control (RBAC) Middleware.
 * Verifies that the decoded JWT user (req.user) has one of the allowed roles.
 * 
 * @param  {...string} roles Allowed roles (e.g. "admin", "technician")
 */
export const requireRole = (...roles) => {
    return (req, res, next) => {
        if (!req.user || !req.user.role) {
            return res.status(403).json({
                success: false,
                message: "Access forbidden. User role missing."
            });
        }

        const userRole = req.user.role.toLowerCase();
        const allowedRoles = roles.map(r => r.toLowerCase());

        if (!allowedRoles.includes(userRole)) {
            return res.status(403).json({
                success: false,
                message: "Access forbidden. Insufficient permissions."
            });
        }

        next();
    };
};
