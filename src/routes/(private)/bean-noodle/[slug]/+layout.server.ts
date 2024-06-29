import type { LayoutServerLoad } from './$types';
import { emptyOption } from '$lib/constants/common';
import { API_PATH } from '$lib/constants/constants';

export const load: LayoutServerLoad = async ({ params, fetch }) =>
{
    const { slug } = params;
    const colRes = await fetch(`${API_PATH}/collections?name=${slug}`);
    const colData = await colRes.json();

    const selectCols = colData.data[0].columns.filter((col: any) => col.type === "select");

    const optionsConfig: any = {};

    if (selectCols.length)
    {
        for (const col of selectCols)
        {

            const [slug, key] = col.slug_key.split(":");
            if (!slug || !key) continue;

            const url = slug === "custom" ? `${API_PATH}/options?name=${key}&size=100` : `${API_PATH}/${slug}?size=100`;
            const optionsRes = await fetch(url);
            const optionsData = await optionsRes.json();
            const options = [emptyOption, ...optionsData.data.map((doc: any) => ({ label: doc[slug === "custom" ? "value" : key], value: slug === "custom" ? doc.value : doc._id, }))];
            optionsConfig[col.value] = options;
        }
    }
    return {
        optionsConfig,
        tableConfig: colData.data[0],
    };
};
