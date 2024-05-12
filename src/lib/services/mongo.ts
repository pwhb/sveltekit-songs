import { MONGODB_DATABASE } from "$env/static/private";
import { ObjectId, type Document, type Filter, type FindOneAndDeleteOptions, type FindOneAndUpdateOptions, type FindOptions } from "mongodb";
import clientPromise from "./mongodb";

export async function insertOne(collection: string, doc: any, by?: any)
{
    try
    {
        const client = await clientPromise;
        const col = client.db(MONGODB_DATABASE).collection(collection);
        return await col.insertOne({
            ...doc,
            "history": {
                created:
                {
                    at: new Date(),
                    by: by || null
                }
            }
        });
    }
    catch (error)
    {
        console.error(error);
        return null;
    }

}

export async function updateOne(collection: string, filter: Filter<any>, doc: any, options: FindOneAndUpdateOptions & {
    includeResultMetadata?: true;
} = { returnDocument: "after" }, by?: any)
{
    try
    {
        const client = await clientPromise;
        const col = client.db(MONGODB_DATABASE).collection(collection);
        return await col.findOneAndUpdate(filter, {
            $set: {
                ...doc,
                "history.updated": {
                    at: new Date(),
                    by: by || null
                }
            }
        }, options);
    }
    catch (error)
    {
        console.error(error);
        return null;
    }

}

export async function findByIdAndUpdate(collection: string, id: string, doc: any, options: FindOneAndUpdateOptions & {
    includeResultMetadata?: true;
} = { returnDocument: "after" }, by?: any)
{
    try
    {
        const client = await clientPromise;
        const col = client.db(MONGODB_DATABASE).collection(collection);
        return await col.findOneAndUpdate({ _id: new ObjectId(id) }, {
            $set: {
                ...doc,
                "history.updated": {
                    at: new Date(),
                    by: by || null
                }
            }
        }, options);
    }
    catch (error)
    {
        console.error(error);
        return null;
    }

}

export async function findOne(collection: string, filter: Filter<any>, options: FindOptions<any> = {})
{
    try
    {
        const client = await clientPromise;
        const col = client.db(MONGODB_DATABASE).collection(collection);
        return await col.findOne(filter, options);
    }
    catch (error)
    {
        console.error(error);
        return null;
    }

}

export async function findById(collection: string, id: string, options: FindOptions<any> = {})
{
    try
    {
        const client = await clientPromise;
        const col = client.db(MONGODB_DATABASE).collection(collection);
        return await col.findOne({ _id: new ObjectId(id) }, options);
    }
    catch (error)
    {
        console.error(error);
        return null;
    }

}

export async function findByIdAndRemove(collection: string, id: string, options: FindOneAndDeleteOptions & { includeResultMetadata?: true; } = {})
{
    try
    {
        const client = await clientPromise;
        const col = client.db(MONGODB_DATABASE).collection(collection);
        return await col.findOneAndDelete({ _id: new ObjectId(id) }, options);
    }
    catch (error)
    {
        console.error(error);
        return null;
    }

}


export async function findMany(collection: string, filter: Filter<any>, options: FindOptions<any> = {})
{
    try
    {
        const client = await clientPromise;
        const col = client.db(MONGODB_DATABASE).collection(collection);
        return await col.find(filter, options).toArray();
    }
    catch (error)
    {
        console.error(error);
        return null;
    }

}

export async function countDocuments(collection: string, filter: Filter<any>)
{
    try
    {
        const client = await clientPromise;
        const col = client.db(MONGODB_DATABASE).collection(collection);
        return await col.countDocuments(filter);
    }
    catch (error)
    {
        console.error(error);
        return null;
    }

}



export async function aggregate(collection: string, pipeline: Document[] = [])
{
    try
    {
        const client = await clientPromise;
        const col = client.db(MONGODB_DATABASE).collection(collection);
        return await col.aggregate(pipeline).toArray();
    }
    catch (error)
    {
        console.error(error);
        return null;
    }

}


export function getLookupPipeline({ key, from, foreignField, foreignKey, as }: {
    key: string;
    from: string;
    foreignField?: string;
    foreignKey?: string;
    as: string;
})
{
    return [
        {
            $addFields: {
                [key]: { $toObjectId: `$${key}` }
            }
        },
        {
            $lookup: {
                from: from,
                localField: key,
                foreignField: foreignField || "_id",
                as: as
            }
        },
        {
            $addFields: {
                [as]: { $arrayElemAt: [`$${as}.${foreignKey || 'name'}`, 0] }
            }
        },
    ];
}