import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals, fetch, params }) =>
{
    const slug = 'roles';
    const colRes = await fetch(`${API_PATH}/collections?name=${slug}`);
    const colData = await colRes.json();

    const permissionsRes = await fetch(`${API_PATH}/permissions?size=100`);
    const permissionsData = await permissionsRes.json();

    const collectionsRes = await fetch(`${API_PATH}/collections?select=name,_id&size=100`);
    const collectionsData = await collectionsRes.json();

    return {
        slug,
        tableConfig: colData.data[0],
        selectConfig: {
            permissions: permissionsData.data.map((doc: any) => ({ menu: doc.collection, label: `${doc.collection}/${doc.action}`, value: doc._id, })),
            menus: collectionsData.data.map((doc: any) => ({ label: doc.name, value: doc._id, }))
        }
    };
};
