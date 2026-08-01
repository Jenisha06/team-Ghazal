import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

// Hash a password before storing it
export const hashPassword = async (password) => {
    return await bcrypt.hash(password, SALT_ROUNDS);
};

// Compare login password with hashed password
export const comparePassword = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
};