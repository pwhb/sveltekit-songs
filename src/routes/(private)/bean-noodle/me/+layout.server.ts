import { API_PATH } from '$lib/constants/constants';
import { serialize } from '$lib/utils/common';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals, fetch, params }) =>
{
    const slug = "users";
    const colRes = await fetch(`${API_PATH}/collections?name=${slug}`);
    const colData = await colRes.json();

    return {
        slug,
        details: { data: serialize(locals.user) },
        tableConfig: colData.data[0]
    };
};
