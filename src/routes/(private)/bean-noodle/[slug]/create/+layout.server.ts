import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals, fetch, params }) =>
{
    const { slug } = params;
    const colRes = await fetch(`/api/collections?name=${slug}`);
    const colData = await colRes.json();

    return {
        slug,
        tableConfig: colData.data[0],
    };
};
