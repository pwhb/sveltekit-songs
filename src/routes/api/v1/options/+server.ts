import COLLECTIONS from '$lib/constants/collections';
import MESSAGES from '$lib/constants/messages';
import { authorize } from '$lib/middlewares/auth';
import OptionSchema from '$lib/schemas/options';
import { countDocuments, findMany, insertOne } from '$lib/services/mongo';
import exceptionHandler from '$lib/utils/exceptions';
import { getOptions, QueryType } from '$lib/utils/query';
import { json, type RequestEvent, type RequestHandler } from '@sveltejs/kit';

const COLLECTION = COLLECTIONS.OPTIONS;

export const GET: RequestHandler = async ({ url }: RequestEvent) =>
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
                key: 'active',
                type: QueryType.Boolean,
            },
        ]);

        const data = await findMany(COLLECTION, filter, { skip, limit, sort, projection });
        const count = await countDocuments(COLLECTION, filter);
        return json({ message: MESSAGES.SUCCESS, page, size: limit, count, data }, { status: 200 });
    } catch (error)
    {
        return exceptionHandler(error);
    }
};

export const POST: RequestHandler = authorize(async ({ request, locals }: RequestEvent) =>
{
    try
    {

        const body = await request.json();
        const validated = OptionSchema.parse(body);

        const res = await insertOne(COLLECTION, validated);
        return json({ message: MESSAGES.SUCCESS, data: res }, { status: 200 });
    } catch (error)
    {
        return exceptionHandler(error);
    }
});

