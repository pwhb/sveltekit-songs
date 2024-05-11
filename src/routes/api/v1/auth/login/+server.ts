import COLLECTIONS from "$lib/constants/collections";
import { findOne } from "$lib/services/mongo";
import { json, type RequestHandler } from "@sveltejs/kit";
import { verifySync } from "@node-rs/argon2";
import MESSAGES from "$lib/constants/messages";
import { generateToken } from "$lib/utils/auth";
import { UserStatus } from "$lib/constants/common";
import AuthSchema from "$lib/schemas/auth";
import exceptionHandler from "$lib/utils/exceptions";

export const POST: RequestHandler = async ({ request }) =>
{
    try
    {
        const body = await request.json();
        const validated = AuthSchema.parse(body);

        const existingUser = await findOne(COLLECTIONS.USERS, { username: validated.username });

        console.log({ existingUser });

        if (!existingUser || !existingUser.active)
        {
            return json({ message: MESSAGES.USER_NOT_FOUND }, { status: 404 });
        }



        if (verifySync(existingUser.password, validated.password))
        {
            const token = generateToken({ _id: existingUser._id });
            return json({
                message: MESSAGES.LOGIN_SUCCESS,
                token: token
            }, { status: 201 });
        }
        return json({ message: MESSAGES.INVALID_CREDENTIALS }, { status: 401 });

    } catch (error)
    {
        return exceptionHandler(error);
    }
};