
import COLLECTIONS from '$lib/constants/collections';
import { findOne } from '$lib/services/mongo';
import { serialize } from '$lib/utils/common.js';
import type { LayoutServerLoad } from './$types';



export const load: LayoutServerLoad = async ({ locals }) =>
{

    const configRes: any = await findOne(COLLECTIONS.CONFIGS, { name: "layout" });
    return {
        config: configRes.data,
        user: locals.user ? serialize(locals.user) : null
    };
};
