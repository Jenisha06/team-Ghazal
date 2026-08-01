import { supabase } from "../config/supabase.js";
import { comparePassword } from "../utils/hash.js";
import { generateToken } from "../utils/jwt.js";

export const login = async (req, res) => {

    try {

        const {

            email,

            password

        } = req.body;

        if (!email || !password) {

            return res.status(400).json({

                success: false,

                message: "Email and Password required"

            });

        }

        const {

            data: user,

            error

        } = await supabase

            .from("users")

            .select("*")

            .eq("email", email)

            .single();

        if (error || !user) {

            return res.status(401).json({

                success: false,

                message: "Invalid Credentials"

            });

        }

        const isMatch = await comparePassword(

            password,

            user.password

        );

        if (!isMatch) {

            return res.status(401).json({

                success: false,

                message: "Invalid Credentials"

            });

        }

        const token = generateToken(user);

        return res.status(200).json({

            success: true,

            token,

            user: {

                id: user.id,

                name: user.name,

                email: user.email,

                role: user.role

            }

        });

    }

    catch (err) {

        return res.status(500).json({

            success: false,

            error: err.message

        });

    }

};