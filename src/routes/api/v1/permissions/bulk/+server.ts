import COLLECTIONS from "$lib/constants/collections";
import MESSAGES from "$lib/constants/messages";
import { authorize } from "$lib/middlewares/auth";
import { PermissionBulkCreateSchema } from "$lib/schemas/permissions";
import { insertMany, insertOne } from "$lib/services/mongo";
import exceptionHandler from "$lib/utils/exceptions";
import { type RequestHandler, type RequestEvent, json } from "@sveltejs/kit";

const COLLECTION = COLLECTIONS.PERMISSIONS;

export const POST: RequestHandler = authorize(async ({ request, locals }: RequestEvent) =>
{
    try
    {
        const body = await request.json();
        const validated = PermissionBulkCreateSchema.parse(body);
        const res = await insertMany(COLLECTION, validated.permissions.map(v => ({
            ...v,
            slug: v.pattern.split("/")[3]
        })), locals.user._id.toString());
        return json({ message: MESSAGES.SUCCESS, data: res }, { status: 200 });
    } catch (error)
    {
        return exceptionHandler(error);
    }
});
