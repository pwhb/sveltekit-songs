import COLLECTIONS from "$lib/constants/collections";
import { UserStatus } from "$lib/constants/common";
import MESSAGES from "$lib/constants/messages";
import { authenticate } from "$lib/middlewares/auth";
import { findOne } from "$lib/services/mongo";
import { generateToken } from "$lib/utils/auth";
import { verifySync } from "@node-rs/argon2";
import { type RequestHandler, json } from "@sveltejs/kit";

export const GET: RequestHandler = authenticate(async ({ request, locals }) =>
{
    try
    {

        return json({ message: MESSAGES.SUCCESS, data: { user: locals.user } }, { status: 200 });

    } catch (error)
    {
        return exceptionHandler(error);

    }
});