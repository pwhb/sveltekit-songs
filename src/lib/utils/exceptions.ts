import MESSAGES from "$lib/constants/messages";
import { json } from "@sveltejs/kit";
import { ZodError } from "zod";

export default function exceptionHandler(error: any)
{
    console.error(error);

    if (error instanceof ZodError)
    {
        return zodExceptionHandler(error);
    }

    return new Response(null, { status: 500 });
}
export const zodExceptionHandler = (error: any) =>
{

    const { issues } = error;
    const errorResponse: any = {};
    issues.forEach((issue: any) =>
    {
        errorResponse[issue.path[0]] = issue.message;
    });
    return json({
        message: MESSAGES.VALIDATION_ERROR,
        error: errorResponse
    }, { status: 400 });
}; 