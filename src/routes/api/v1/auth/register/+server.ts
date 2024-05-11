import COLLECTIONS from "$lib/constants/collections";
import { insertOne, findOne } from "$lib/services/mongo";
import { json, type RequestHandler } from "@sveltejs/kit";
import { hashSync } from "@node-rs/argon2";
import MESSAGES from "$lib/constants/messages";
import AuthSchema from "$lib/schemas/auth";
import exceptionHandler from "$lib/utils/exceptions";
import { UserStatus } from "$lib/constants/common";
export const POST: RequestHandler = async ({ request }) =>
{
    try
    {
        const body = await request.json();
        const validated = AuthSchema.parse(body);

        const existingUser = await findOne(COLLECTIONS.USERS, { username: validated.username });
        if (!existingUser)
        {
            const res = await insertOne(COLLECTIONS.USERS, {
                username: validated.username,
                password: hashSync(validated.password),
                status: UserStatus.INACTIVE
            });
            if (res)
            {
                return json({
                    message: MESSAGES.USER_CREATED
                }, { status: 201 });
            }
            throw Error(MESSAGES.FAILED_TO_CREATE_USER);
        }
        return json({ message: MESSAGES.USERNAME_ALREADY_TAKEN }, { status: 201 });
    } catch (error)
    {
        return exceptionHandler(error);

    }
};