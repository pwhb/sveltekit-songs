import { emptyOption } from '$lib/consts/common';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, fetch, params, url }) =>
{
    const slug = 'permissions';
    const res = await fetch(`/api/${slug}${url.search ? url.search + "&" : "?"}sort_by=name`);
    const data = await res.json();

    const colRes = await fetch(`/api/collections`);
    const colData = await colRes.json();

    const actionRes = await fetch(`/api/options?name=permissions&select=label,value&size=100`);
    const actionData = await actionRes.json();

    return {
        slug,
        [slug]: data,
        tableConfig: colData.data.find((doc: any) => doc.name === slug),
        selectConfig: {
            collection: [emptyOption, ...colData.data.map((doc: any) => ({ label: doc.name, value: doc._id, }))],
            action: actionData.data
        }
    };
};
