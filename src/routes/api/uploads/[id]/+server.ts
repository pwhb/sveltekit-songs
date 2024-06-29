import COLLECTIONS from '$lib/constants/collections';
import MESSAGES from '$lib/constants/messages';
import { authorize } from '$lib/middlewares/auth';
import UploadSchema from '$lib/schemas/uploads';

import { findByIdAndRemove, findById, findByIdAndUpdate } from '$lib/services/mongo';
import { get } from '$lib/services/s3';
import exceptionHandler from '$lib/utils/exceptions';
import { json, type RequestEvent, type RequestHandler } from '@sveltejs/kit';


const COLLECTION = COLLECTIONS.UPLOADS;

export const GET: RequestHandler = async ({ params }: RequestEvent) =>
{
    try
    {
        const { id } = params;
        const res = await findById(COLLECTION, id as string);
        if (!res)
        {
            return json({ message: MESSAGES.NOT_FOUND }, { status: 404 });
        }
        const s3Res = (await get(res.Key)) as any;

        return new Response(s3Res?.Body, {
            headers: { 'Content-Type': s3Res?.ContentType }
        });
    } catch (error)
    {
        return exceptionHandler(error);
    }
};

export const PATCH: RequestHandler = authorize(async ({ request, params, locals }: RequestEvent) =>
{
    try
    {
        const { id } = params;
        const body = await request.json();
        const validated = UploadSchema.parse(body);
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
