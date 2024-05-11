import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
// import { checkIsAllowed } from '$lib/utils/formatters';

export const load: LayoutServerLoad = async ({ locals, url }) =>
{
	if (!locals.user)
	{
		throw redirect(307, '/auth/login');
	}

	return {};
};
