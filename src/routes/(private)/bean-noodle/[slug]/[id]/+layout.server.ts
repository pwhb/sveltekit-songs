import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals, fetch, params }) =>
{
    const { slug, id } = params;
    const res = await fetch(`/api/${slug}/${id}`);
    const data = await res.json();

    const colRes = await fetch(`/api/collections?name=${slug}`);
    const colData = await colRes.json();


    return {
        slug,
        details: data,
        tableConfig: colData.data[0]
    };
};
