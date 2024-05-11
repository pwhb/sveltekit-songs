import { AUTH_SECRET_KEY } from "$env/static/private";
import COLLECTIONS from "$lib/constants/collections";
import { findOne } from "$lib/services/mongo";
import { verify } from "@node-rs/argon2";
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

export const login = async ({ username, password }: { username: string; password: string; }) =>
{
    const error = { username: '', password: '' };
    const previous = { username };
    if (!username)
    {
        error.username = 'username cannot be empty';
    }
    if (!password)
    {
        error.password = 'password cannot be empty';
    }

    if (error.username || error.password) return { error, previous };


    const user = await findOne(COLLECTIONS.USERS, { username });
    if (!user)
    {
        error.username = "user doesn't exist";
        return { error, previous };
    }

    const isCorrect = await verify(user.password, password as string);
    if (!isCorrect)
    {
        error.password = 'wrong password';
        return { error, previous };
    }

    const token = generateToken({
        _id: user._id,
    });

    return { token };
};