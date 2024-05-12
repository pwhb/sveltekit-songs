import { API_PATH } from '$lib/constants/constants';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, fetch, params, url }) =>
{
    const { slug } = params;
    const res = await fetch(`${API_PATH}/${slug}${url.search ? url.search + "&" : "?"}`);
    const data = await res.json();

    const colRes = await fetch(`${API_PATH}/collections?name=${slug}`);
    const colData = await colRes.json();

    const selectCols = colData.data[0].columns.filter((col: any) => col.type === "select");

    const optionsConfig: any = {};
    if (selectCols.length)
    {
        selectCols.forEach(async (col: any) =>
        {
            const optionsRes = await fetch(`${API_PATH}/${col.slug}?size=100`);
            const optionsData = await optionsRes.json();
            optionsConfig[col.value] = optionsData.data;
            console.log({col: col.value, options: optionsData.data});
        });
    }


    return {
        slug,
        [slug]: data,
        tableConfig: colData.data[0],
        optionsConfig
    };
};
