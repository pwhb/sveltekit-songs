import { API_PATH } from '$lib/constants/constants';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ fetch, params }) =>
{
    const slug = "collections";
    const { id } = params;
    const res = await fetch(`${API_PATH}/${slug}/${id}`);
    const data = await res.json();

    const colRes = await fetch(`${API_PATH}/collections?size=100`);
    const colData = await colRes.json();

    const colTypesRes = await fetch(`${API_PATH}/options?name=colTypes&size=100`);
    const colTypesData = await colTypesRes.json();

    const customOptionsRes = await fetch(`${API_PATH}/options/custom`);
    const customOptions = await customOptionsRes.json();

    return {
        slug,
        details: data,
        collections: colData.data,
        customOptions: customOptions.data,
        colTypes: colTypesData.data,
        tableConfig: colData.data.find((doc: any) => doc.name === slug)
    };
};
