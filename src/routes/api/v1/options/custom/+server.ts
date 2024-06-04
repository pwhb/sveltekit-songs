import { MONGODB_DATABASE } from "$env/static/private";
import COLLECTIONS from "$lib/constants/collections";
import MESSAGES from "$lib/constants/messages";
import { authorize } from "$lib/middlewares/auth";
import { findById } from "$lib/services/mongo";
import clientPromise from "$lib/services/mongodb";
import exceptionHandler from "$lib/utils/exceptions";
import { type RequestHandler, type RequestEvent, json } from "@sveltejs/kit";

const COLLECTION = COLLECTIONS.OPTIONS;

export const GET: RequestHandler = authorize(async ({ params }: RequestEvent) =>
{
    try
    {
        const client = await clientPromise;
        const col = client.db(MONGODB_DATABASE).collection(COLLECTION);
        const res = await col.distinct("name");
        if (!res)
        {
            return json({ message: MESSAGES.NOT_FOUND }, { status: 404 });
        }
        return json({ message: MESSAGES.SUCCESS, data: res }, { status: 200 });
    } catch (error)
    {
        return exceptionHandler(error);
    }
});