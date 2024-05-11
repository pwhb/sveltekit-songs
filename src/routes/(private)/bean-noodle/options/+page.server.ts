import { API_PATH } from '$lib/constants/constants';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, fetch, params, url }) =>
{
    const slug = "options";
    const res = await fetch(`${API_PATH}/${slug}${url.search ? url.search + "&" : "?"}`);
    const data = await res.json();
    const colRes = await fetch(`${API_PATH}/collections?name=${slug}`);
    const colData = await colRes.json();

    return {
        slug,
        [slug]: data,
        tableConfig: colData.data[0]
    };
};
