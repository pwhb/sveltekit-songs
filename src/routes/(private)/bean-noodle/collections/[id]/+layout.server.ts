import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals, fetch, params }) =>
{
    const slug = "collections";
    const { id } = params;
    const res = await fetch(`/api/${slug}/${id}`);
    const data = await res.json();

    const colRes = await fetch(`/api/collections?name=${slug}`);
    const colData = await colRes.json();

    const colTypesRes = await fetch(`/api/options?name=colTypes&size=100`);
    const colTypesData = await colTypesRes.json();

    return {
        slug,
        details: data,
        colTypes: colTypesData.data,
        tableConfig: colData.data[0]
    };
};
