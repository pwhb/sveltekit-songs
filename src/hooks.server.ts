import { MONGODB_DATABASE } from '$env/static/private';
import COLLECTIONS from '$lib/constants/collections';
import { aggregate, findById, getLookupPipeline } from '$lib/services/mongo';
import clientPromise from '$lib/services/mongodb';
import { verifyToken } from '$lib/utils/auth';
import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { ObjectId } from 'mongodb';


const authMiddleware: Handle = async ({ event, resolve }) =>
{

	try
	{
		const token = event.cookies.get('token') as string;
		if (!token) return await resolve(event);
		const decoded: any = verifyToken(token);
		if (!decoded) return await resolve(event);
		const users = await aggregate(COLLECTIONS.USERS, [
			{
				$match: {
					_id: new ObjectId(decoded._id as string),
				}
			},
			...getLookupPipeline({
				key: 'roleId',
				from: COLLECTIONS.ROLES,
				foreignField: '_id',
				as: 'role'
			}),
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
		event.locals.user = users![0];
	} catch (error)
	{
		console.error(error);
	}

	return await resolve(event);
};

export const handle = sequence(authMiddleware);
