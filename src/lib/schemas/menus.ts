import { z } from "zod";

const MenuSchema = z.object({
    name: z.string(),
    url: z.string().optional(),
    parent: z.string().optional().nullable(),
    icon: z.string().optional(),
    collection: z.string().optional().nullable(),
    active: z.boolean().default(false)
});

export default MenuSchema;