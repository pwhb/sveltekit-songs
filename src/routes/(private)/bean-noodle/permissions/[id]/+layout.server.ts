import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals, fetch, params }) =>
{
    const slug = 'permissions';
    const { id } = params;

    const res = await fetch(`${API_PATH}/${slug}/${id}`);
    const data = await res.json();

    const colRes = await fetch(`${API_PATH}/collections?name=${slug}`);
    const colData = await colRes.json();

    const permissionsRes = await fetch(`${API_PATH}/options?name=permissions&select=label,value&size=100`);
    const permissionsData = await permissionsRes.json();

    const collectionsRes = await fetch(`${API_PATH}/collections?select=name,_id&size=100`);
    const collectionsData = await collectionsRes.json();

    return {
        slug,
        details: data,
        tableConfig: colData.data[0],
        selectConfig: {
            action: permissionsData.data,
            collection: collectionsData.data.map((doc: any) => ({ label: doc.name, value: doc._id, }))
        }
    };
};
