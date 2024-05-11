import type { PageServerLoad } from './$types';

import { makeTree } from '$lib/utils/structures';


export const load: PageServerLoad = async ({ locals, fetch }) =>
{
	// const menusRes = await fetch(`/api/menus?active=true&size=100&select=_id,name,children,parentId,icon,url`);
	// const menusData = await menusRes.json();
	// return {
	// 	menus: makeTree(menusData.data, 'children', 'parentId')
	// 	// fullUser: serialize(fullUser)
	// };
	return {

	};
};
