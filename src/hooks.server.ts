import { MONGODB_DATABASE } from '$env/static/private';
import COLLECTIONS from '$lib/constants/collections';
import { findById } from '$lib/services/mongo';
import clientPromise from '$lib/services/mongodb';
import { verifyToken } from '$lib/utils/auth';
import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { ObjectId } from 'mongodb';


const authMiddleware: Handle = async ({ event, resolve }) =>
{
	const token = event.cookies.get('token') as string;
	if (!token) return await resolve(event);
	const decoded: any = verifyToken(token);
	if (!decoded) return await resolve(event);

	try
	{
		const user = await findById(COLLECTIONS.USERS, decoded._id);
		event.locals.user = user;
	} catch (error)
	{
		console.error(error);
	}

	return await resolve(event);
};

export const handle = sequence(authMiddleware);
