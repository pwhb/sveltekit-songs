import { emptyOption } from '$lib/constants/common';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals, fetch, params }) =>
{
    const slug = 'menus';
    const { id } = params;

    const res = await fetch(`${API_PATH}/${slug}/${id}`);
    const data = await res.json();

    const colRes = await fetch(`${API_PATH}/collections?name=${slug}`);
    const colData = await colRes.json();

    const menusRes = await fetch(`${API_PATH}/menus?isParent=true&size=100`);
    const menusData = await menusRes.json();

    const parent = [emptyOption, ...menusData.data.map((doc: any) => ({ label: doc.name, value: doc._id, }))];

    const collectionsRes = await fetch(`${API_PATH}/collections?select=name,_id&size=100`);
    const collectionsData = await collectionsRes.json();

    return {
        slug,
        details: data,
        tableConfig: colData.data[0],
        selectConfig: {
            parent: parent,
            collection: [emptyOption, ...collectionsData.data.map((doc: any) => ({ label: doc.name, value: doc._id, }))]
        }
    };
};
