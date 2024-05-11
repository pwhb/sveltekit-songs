import { MONGODB_DATABASE } from '$env/static/private';
import COLLECTIONS from '$lib/constants/collections';
import MESSAGES from '$lib/constants/messages';
import { countDocuments, findMany } from '$lib/services/mongo';
import clientPromise from '$lib/services/mongodb';
import exceptionHandler from '$lib/utils/exceptions';
import { getOptions, QueryType } from '$lib/utils/query';
import { json, type RequestEvent, type RequestHandler } from '@sveltejs/kit';

const COLLECTION = COLLECTIONS.USERS;

export const GET: RequestHandler = async ({ url }: RequestEvent) =>
{
    try
    {

        const query = Object.fromEntries(url.searchParams);
        const { page, limit, skip, filter, sort, projection } = getOptions(query, [
            {
                key: 'q',
                type: QueryType.Regex,
                searchedFields: ['username', 'firstName']
            },
            {
                key: 'username',
                type: QueryType.String,
            },
            {
                key: 'firstName',
                type: QueryType.String,
            },
            {
                key: 'lastName',
                type: QueryType.String,
            },
            {
                key: 'penName',
                type: QueryType.String,
            },
            {
                key: 'role',
                type: QueryType.String,
            },
            {
                key: 'active',
                type: QueryType.Boolean,
            },
        ]);

        projection.password = 0;

        const data = await findMany(COLLECTION, filter, { skip, limit, sort, projection });
        const count = await countDocuments(COLLECTION, filter);
        return json({ message: MESSAGES.SUCCESS, page, size: limit, count, data }, { status: 200 });
    } catch (error)
    {
        return exceptionHandler(error);
    }
};

// export const POST: RequestHandler = async ({ request, locals }: RequestEvent) =>
// {
//     try
//     {
//         const client = await clientPromise;
//         const db = client.db(MONGODB_DATABASE);
//         const col = db.collection(COLLECTION);

//         const body = await request.json();
//         const validated = SongSchema.parse(body);

//         const res = await col.insertOne({
//             ...validated,
//             // createdBy: locals.user._id,
//             createdAt: new Date(),
//             updatedAt: new Date()
//         });
//         return json({ message: MESSAGES.SUCCESS, data: res }, { status: 200 });
//     } catch (error)
//     {
//         return exceptionHandler(error);
//     }
// };

