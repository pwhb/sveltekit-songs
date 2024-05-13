import COLLECTIONS from '$lib/constants/collections';
import MESSAGES from '$lib/constants/messages';
import { authorize } from '$lib/middlewares/auth';
import UploadSchema from '$lib/schemas/uploads';
import { aggregate, countDocuments, findMany, getLookupPipeline, insertOne } from '$lib/services/mongo';
import exceptionHandler from '$lib/utils/exceptions';
import { getOptions, QueryType } from '$lib/utils/query';
import { json, type RequestEvent, type RequestHandler } from '@sveltejs/kit';
import type { Document } from 'mongodb';

const COLLECTION = COLLECTIONS.UPLOADS;

export const GET: RequestHandler = authorize(async ({ url, locals }: RequestEvent) =>
{
    try
    {

        const query = Object.fromEntries(url.searchParams);
        const { page, limit, skip, filter, sort, projection } = getOptions(query, [
            {
                key: 'q',
                type: QueryType.Regex,
                searchedFields: ['name']
            },
            {
                key: 'name',
                type: QueryType.String
            },
            {
                key: 'active',
                type: QueryType.Boolean,
            },
        ]);
        filter["history.created.by"] = locals.user._id.toString();
        const pipeline: Document[] = [
            {
                $match: filter
            },
            ...getLookupPipeline({
                key: 'history.created.by',
                from: COLLECTIONS.USERS,
                foreignField: '_id',
                foreignKey: 'username',
                as: 'history.created.by'
            }),
            {
                $sort: sort
            },
            {
                $skip: skip
            },
            {
                $limit: limit
            }
        ];
        if (Object.keys(projection).length)
        {
            pipeline.push({ $project: projection });
        }
        const data = await aggregate(COLLECTION, pipeline);
        const count = await countDocuments(COLLECTION, filter);
        return json({ message: MESSAGES.SUCCESS, page, size: limit, count, data }, { status: 200 });
    } catch (error)
    {
        return exceptionHandler(error);
    }
});

export const POST: RequestHandler = authorize(async ({ request, locals }: RequestEvent) =>
{
    try
    {

        const body = await request.json();
        const validated = UploadSchema.parse(body);

        const res = await insertOne(COLLECTION, validated, locals.user._id.toString());
        return json({ message: MESSAGES.SUCCESS, data: res }, { status: 200 });
    } catch (error)
    {
        return exceptionHandler(error);
    }
});

