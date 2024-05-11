import type { PageServerLoad } from './$types';

import { makeTree } from '$lib/utils/structures';
import { API_PATH } from '$lib/constants/constants';


export const load: PageServerLoad = async ({ locals, fetch }) =>
{
	const menusRes = await fetch(`${API_PATH}/menus?active=true&size=100&select=_id,name,children,parent,icon,url`);
	const menusData = await menusRes.json();
	return {
		menus: makeTree(menusData.data, 'children', 'parent')
	};
};
