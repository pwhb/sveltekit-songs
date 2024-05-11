import { redirect } from '@sveltejs/kit';
import type { Action, Actions } from './$types';

const logout: Action = async ({ request, url, cookies }) =>
{
	cookies.delete('token', { path: '/' });
	throw redirect(302, '/auth/login');
};

export const actions: Actions = {
	default: logout
};
