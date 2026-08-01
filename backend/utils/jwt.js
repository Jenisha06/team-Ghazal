import jwt from "jsonwebtoken";

export const generateToken = (user) => {

    return jwt.sign(

        {

            id: user.id,

            email: user.email,

            role: user.role,
            engineer_id:user.engineer_id

        },

        process.env.JWT_SECRET,

        {

            expiresIn: "24h"

        }

    );

};