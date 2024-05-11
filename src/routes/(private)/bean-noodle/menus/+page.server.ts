import { emptyOption } from '$lib/consts/common';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, fetch, params, url }) =>
{
    const slug = 'menus';
    const res = await fetch(`/api/${slug}${url.search ? url.search + "&" : "?"}sort_by=name`);
    const data = await res.json();

    const parent = [emptyOption, ...data.data.filter((doc: any) => (!doc.parent)).map((doc: any) => ({ label: doc.name, value: doc._id, }))];

    const colRes = await fetch(`/api/collections`);
    const colData = await colRes.json();


    return {
        slug,
        [slug]: data,
        tableConfig: colData.data.find((doc: any) => doc.name === slug),
        selectConfig: {
            parent: parent,
            collection: [emptyOption, ...colData.data.map((doc: any) => ({ label: doc.name, value: doc._id, }))]
        }
    };
};
