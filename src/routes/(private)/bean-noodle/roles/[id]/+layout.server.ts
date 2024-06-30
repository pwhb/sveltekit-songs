import { API_PATH } from '$lib/constants/constants';
import { joinMenusAndPermissions, makeTree } from '$lib/utils/structures';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals, fetch, params }) =>
{
    const slug = 'roles';
    const { id } = params;

    const res = await fetch(`${API_PATH}/${slug}/${id}`);
    const data = await res.json();

    const colRes = await fetch(`${API_PATH}/collections?name=${slug}`);
    const colData = await colRes.json();

    const menusRes = await fetch(`${API_PATH}/menus?active=true&size=100&select=_id,name,children,parentId,collection`);
    const menusData = await menusRes.json();

    const permissionsRes = await fetch(`${API_PATH}/permissions?active=true&size=100&select=_id,menu,menuId,action,pattern`);
    const permissionsData = await permissionsRes.json();

    const menus = menusData.data.map((val: any) => ({ ...val, selected: data.data.menus ? data.data.menus.includes(val._id) : false }));

    const permissions = permissionsData.data.map((val: any) => ({ ...val, selected: data.data.permissions ? data.data.permissions.includes(val._id) : false }));

    const menusWithPermissions = joinMenusAndPermissions(menus, permissions);
    return {
        slug,
        details: data,
        tableConfig: colData.data[0],
        selectConfig: {
            menuTree: makeTree(menusWithPermissions, 'children', 'parentId'),
            permissions: permissions
        }
    };
};
