import { emptyOption } from '$lib/constants/common';
import { API_PATH } from '$lib/constants/constants';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch, params, url }) =>
{
    const { slug } = params;
    const res = await fetch(`${API_PATH}/${slug}${url.search ? url.search + "&" : "?"}`);
    const data = await res.json();
    return {
        slug,
        [slug]: data,
    };
};
