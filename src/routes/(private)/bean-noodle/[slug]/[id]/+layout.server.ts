import { API_PATH } from '$lib/constants/constants';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals, fetch, params }) =>
{
    const { slug, id } = params;
    const res = await fetch(`${API_PATH}/${slug}/${id}`);
    const data = await res.json();

    const colRes = await fetch(`${API_PATH}/collections?name=${slug}`);
    const colData = await colRes.json();


    return {
        slug,
        details: data,
        tableConfig: colData.data[0]
    };
};
