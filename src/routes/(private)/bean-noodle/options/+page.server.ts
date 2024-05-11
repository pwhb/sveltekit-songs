import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, fetch, params, url }) =>
{
    const slug = "options";
    const res = await fetch(`/api/${slug}${url.search ? url.search + "&" : "?"}`);
    const data = await res.json();
    const colRes = await fetch(`/api/collections?name=${slug}`);
    const colData = await colRes.json();

    return {
        slug,
        [slug]: data,
        tableConfig: colData.data[0]
    };
};
