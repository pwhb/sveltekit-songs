import { AUTH_SECRET_KEY } from "$env/static/private";
import jwt from "jsonwebtoken";
const expirationTime = '12h';

// Generate a JWT token
export const generateToken = (user: any) =>
{
    const token = jwt.sign(user, AUTH_SECRET_KEY, { expiresIn: expirationTime });
    return token;
};

// Verify a JWT token
export const verifyToken = (token: string) =>
{
    const decoded = jwt.verify(token, AUTH_SECRET_KEY);
    return decoded;
};