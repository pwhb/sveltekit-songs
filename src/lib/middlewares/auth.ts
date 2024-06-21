import COLLECTIONS from "$lib/constants/collections";
import { UserStatus } from "$lib/constants/common";
import MESSAGES from "$lib/constants/messages";
import { aggregate, findById, findMany, findOne } from "$lib/services/mongo";
import { verifyToken } from "$lib/utils/auth";
import { json, type RequestEvent, type RequestHandler } from "@sveltejs/kit";
import { ObjectId, type Document, type Filter, type FindOneAndDeleteOptions, type FindOneAndUpdateOptions, type FindOptions } from "mongodb";



export function authenticate(handler: RequestHandler)
{
    return async function (event: RequestEvent)
    {

        try
        {
            let token = event.cookies.get('token');
            const unauthenticatedResponse = json({ message: MESSAGES.UNAUTHENTICATED }, { status: 401 });
            if (!token)
            {
                const header = event.request.headers.get("Authorization");
                if (!header) return unauthenticatedResponse;
                const [bearer, tokenFromHeader] = header.split(" ");
                if (bearer !== "Bearer" || !tokenFromHeader) return unauthenticatedResponse;
                token = tokenFromHeader;
            }

            const decoded: any = verifyToken(token);

            if (!decoded) return unauthenticatedResponse;

            const users = await aggregate(COLLECTIONS.USERS, [
                {
                    $match: {
                        _id: new ObjectId(decoded._id as string),
                    }
                },
                {
                    $project: {
                        password: 0,
                        history: 0
                    }
                },
                {
                    $limit: 1
                }
            ]);
            if (!users || !users[0] || !users[0].active) return unauthenticatedResponse;
            
            event.locals.user = users[0]

            return handler(event);
        } catch (error: any)
        {
            console.error(error);
            if (error.name === "TokenExpiredError") return json({ message: MESSAGES.TOKEN_EXPIRED }, { status: 401 });
            return new Response(null, { status: 500 });
        }
    };
}

export function authorize(handler: RequestHandler, allowed: [string] = ["root"])
{
    return authenticate(async function (event: RequestEvent)
    {
        try
        {
            const unauthorizedResponse = json({ message: MESSAGES.UNAUTHORIZED }, { status: 401 });

            if (!event.locals.user) return unauthorizedResponse;

            const { request, params } = event;
            const { method, url } = request;
            let { pathname } = new URL(url);
            if (params.id)
            {
                pathname = pathname.replace(params.id, ":id");
            }

            const permissions = await findMany(COLLECTIONS.PERMISSIONS, { method, pattern: pathname });
            console.log({
                user: event.locals.user,
                permissions
            });


            return handler(event);
        } catch (error)
        {
            console.error(error);
            return new Response(null, { status: 500 });
        }
    });
}