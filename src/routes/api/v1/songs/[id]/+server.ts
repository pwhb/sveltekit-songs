import COLLECTIONS from '$lib/constants/collections';
import MESSAGES from '$lib/constants/messages';
import { authorize } from '$lib/middlewares/auth';
import SongSchema from '$lib/schemas/songs';
import { findByIdAndRemove, findById, findByIdAndUpdate } from '$lib/services/mongo';
import exceptionHandler from '$lib/utils/exceptions';
import { json, type RequestEvent, type RequestHandler } from '@sveltejs/kit';


const COLLECTION = COLLECTIONS.SONGS;

export const GET: RequestHandler = authorize(async ({ params }: RequestEvent) =>
{
    try
    {
        const { id } = params;
        const res = await findById(COLLECTION, id as string);
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

export const PATCH: RequestHandler = authorize(async ({ request, params, locals }: RequestEvent) =>
{
    try
    {
        const { id } = params;
        const body = await request.json();
        const validated = SongSchema.parse(body);
        const res = await findByIdAndUpdate(COLLECTION, id as string, validated, {
            returnDocument: 'after'
        }, locals.user._id.toString());
        if (!res)
        {
            return json({ message: MESSAGES.NOT_FOUND }, { status: 404 });
        }
        return json({ message: MESSAGES.SUCCESS, data: res }, { status: 201 });
    } catch (error)
    {
        return exceptionHandler(error);
    }
});

export const DELETE: RequestHandler = authorize(async ({ params }: RequestEvent) =>
{
    try
    {
        const { id } = params;
        const res = await findByIdAndRemove(COLLECTION, id as string);
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
