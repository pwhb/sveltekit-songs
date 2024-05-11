import { API_PATH } from '$lib/constants/constants';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ fetch, params }) =>
{
    const { slug } = params;
    const colRes = await fetch(`${API_PATH}/collections?name=${slug}`);
    const colData = await colRes.json();

    return {
        slug,
        tableConfig: colData.data[0],
    };
};
