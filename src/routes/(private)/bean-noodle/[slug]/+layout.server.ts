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
            const optionsRes = await fetch(`${API_PATH}/${slug}?size=100`);
            const optionsData = await optionsRes.json();
            const options = [emptyOption, ...optionsData.data.map((doc: any) => ({ label: doc[key], value: doc._id, }))];
            optionsConfig[col.value] = options;
        }
    }

    return {
        optionsConfig,
        tableConfig: colData.data[0],
    };
};
