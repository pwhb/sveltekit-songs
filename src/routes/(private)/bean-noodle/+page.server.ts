import type { PageServerLoad } from './$types';

import { makeTree } from '$lib/utils/structures';
import { API_PATH } from '$lib/constants/constants';


export const load: PageServerLoad = async ({ locals, fetch }) =>
{
	const menusRes = await fetch(`${API_PATH}/menus?active=true&size=100&select=_id,name,children,parentId,icon,url`);
	const menusData = await menusRes.json();
	const menus = menusData.data.filter((v: any) => locals.user.role.menus.includes(v._id));
	return {
		menus: makeTree(menus, 'children', 'parentId')
	};
};
