import COLLECTIONS from "$lib/constants/collections";
import { UserStatus } from "$lib/constants/common";
import MESSAGES from "$lib/constants/messages";
import { findById } from "$lib/services/mongo";
import { verifyToken } from "$lib/utils/auth";
import { json, type RequestEvent, type RequestHandler } from "@sveltejs/kit";


export function authenticate(handler: RequestHandler)
{
    return async function (event: RequestEvent)
    {

        try
        {
            const header = event.request.headers.get("Authorization");
            const unauthenticatedResponse = json({ message: MESSAGES.UNAUTHENTICATED }, { status: 401 });
            if (!header) return unauthenticatedResponse;
            const [bearer, token] = header.split(" ");
            if (bearer !== "Bearer" || !token) return unauthenticatedResponse;

            const decoded: any = verifyToken(token);

            if (!decoded) return unauthenticatedResponse;

            const user = await findById(COLLECTIONS.USERS, decoded._id, {
                projection: {
                    password: 0,
                    history: 0
                }
            });
            if (!user || user.status !== UserStatus.ACTIVE) return unauthenticatedResponse;

            event.locals.user = user;

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

            if (!event.locals.user || !event.locals.user.role || !allowed.includes(event.locals.user.role)) return unauthorizedResponse;

            return handler(event);
        } catch (error)
        {
            console.error(error);
            return new Response(null, { status: 500 });
        }
    });
}