import { ObjectId } from "mongodb";
import { DEFAULT_LIMIT } from "../constants/constants";


export enum QueryType
{
    String,
    Boolean,
    ObjectId,
    Date,
    Regex,
    Any
}

export interface QueryKey
{
    type: QueryType;
    key: string;
    field?: string;
    searchedFields?: string[];
}


export function getFilter(keys: QueryKey[], query: any)
{
    const or: any[] = [];
    const and: any[] = [];

    const filter: any = {};
    for (let key of keys)
    {
        if (query[key.key] || key.type === QueryType.Date)
        {
            switch (key.type)
            {

                case QueryType.String: {
                    filter[key.field ? key.field : key.key] = query[key.key];
                    break;
                }
                case QueryType.Boolean: {
                    filter[key.field ? key.field : key.key] = query[key.key] === "true";
                    break;
                }
                case QueryType.ObjectId: {
                    filter[key.field ? key.field : key.key] = new ObjectId(query[key.key] as string);
                    break;
                }
                case QueryType.Date: {
                    if (!!query[`${key.key}.from`])
                    {
                        const from = new Date(query[`${key.key}.from`]).getTime();
                        and.push({
                            [key.field ? key.field : key.key]: { $gte: from }
                        });
                    }

                    if (!!query[`${key.key}.to`])
                    {
                        const to = new Date(query[`${key.key}.to`]).getTime();
                        and.push({
                            [key.field ? key.field : key.key]: { $lt: to + 1000 * 60 * 60 * 24 }
                        });
                    }
                    break;
                }
                case QueryType.Regex: {
                    if (key.searchedFields && key.searchedFields.length)
                    {
                        for (let searchedKey of key.searchedFields)
                        {
                            or.push({
                                [searchedKey]: { $regex: query[key.key], $options: "i" }
                            });
                        }
                    } else
                    {
                        or.push({
                            [key.key]: { $regex: query[key.key], $options: "i" }
                        });
                    }
                    break;
                }
            }
        }
    }

    if (and.length && or.length)
    {
        filter["$and"] = [...and, { "$or": or }];
    } else if (or.length)
    {
        filter["$or"] = or;
    } else if (and.length)
    {
        filter["$and"] = and;
    }

    return filter;

}

export function getSort(sort_by?: any)
{
    const sort: any = {};
    if (sort_by)
    {
        const split = sort_by.split(",");
        for (let key of split)
        {
            const trimmed = key.trim();
            const field = trimmed.replace("-", "");
            sort[field] = trimmed[0] === "-" ? -1 : 1;
        }
    } else
    {
        sort["history.created.at"] = -1;
    }
    return sort;
}

export function getSelect(select?: any)
{
    const projection: any = {};
    if (select)
    {
        const split = select.split(",");
        for (let key of split)
        {
            const trimmed = key.trim();
            const field = trimmed.replace("-", "");
            projection[field] = trimmed[0] === "-" ? -1 : 1;
        }
    }
    return projection;
}

export function getOptions(query: any, keys: QueryKey[] = [])
{
    const page = query.page ? parseInt(query.page as string) : 0;
    const size = query.size ? parseInt(query.size as string) : DEFAULT_LIMIT;
    const skip = page * size;

    const filter = getFilter(keys, query);
    const sort = getSort(query.sort_by as string);
    const projection = getSelect(query.select as string);
    return { page, limit: size, skip, filter, sort, projection };
}