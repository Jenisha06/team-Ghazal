import jwt from "jsonwebtoken";

/**
 * Express Middleware for JWT Token Verification.
 * 
 * Extracts JWT token from:
 * 1. HTTP Cookie (req.cookies.token)
 * 2. Authorization Header (Bearer <token>)
 * 
 * Decodes user payload ({ id, email, role, engineer_id }) and attaches it to req.user.
 */
export const verifyToken = (req, res, next) => {
    let token = req.cookies?.token;

    // Check Authorization header if cookie is missing
    if (!token && req.headers.authorization) {
        const authHeader = req.headers.authorization;
        if (authHeader.startsWith("Bearer ")) {
            token = authHeader.split(" ")[1];
        }
    }

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "No token provided. Authorization denied."
        });
    }

    try {
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        // Attach decoded payload ({ id, email, role, engineer_id }) to request object
        req.user = decoded;

        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token."
        });
    }
};