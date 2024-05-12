import { API_PATH } from '$lib/constants/constants';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals, fetch, params }) =>
{
    const slug = "collections";
    const { id } = params;
    const res = await fetch(`${API_PATH}/${slug}/${id}`);
    const data = await res.json();

    const colRes = await fetch(`${API_PATH}/collections?name=${slug}`);
    const colData = await colRes.json();

    const colTypesRes = await fetch(`${API_PATH}/options?name=colTypes&size=100`);
    const colTypesData = await colTypesRes.json();

    return {
        slug,
        details: data,
        colTypes: colTypesData.data,
        tableConfig: colData.data[0]
    };
};
