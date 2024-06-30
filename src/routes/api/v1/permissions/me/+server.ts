import COLLECTIONS from "$lib/constants/collections";
import MESSAGES from "$lib/constants/messages";
import { authenticate, authorize } from "$lib/middlewares/auth";
import { getLookupPipeline, aggregate, countDocuments } from "$lib/services/mongo";
import exceptionHandler from "$lib/utils/exceptions";
import { getOptions, QueryType } from "$lib/utils/query";
import { type RequestHandler, type RequestEvent, json } from "@sveltejs/kit";
import { ObjectId, type Document } from "mongodb";

const COLLECTION = COLLECTIONS.PERMISSIONS;

export const GET: RequestHandler = authenticate(async ({ url, locals }: RequestEvent) =>
{
    try
    {
        const query = Object.fromEntries(url.searchParams);
        const { page, limit, skip, filter, sort, projection } = getOptions(query, [
            {
                key: 'slug',
                type: QueryType.String,
            },
        ]);
        
        filter._id = { $in: locals.user.role.permissions.map((v: string) => new ObjectId(v)) };

        const pipeline: Document[] = [
            {
                $match: filter
            },
            ...getLookupPipeline({
                key: 'menuId',
                from: COLLECTIONS.MENUS,
                foreignField: '_id',
                foreignKey: 'name',
                as: 'menu'
            }),
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