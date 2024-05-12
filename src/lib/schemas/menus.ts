import { z } from "zod";

const MenuSchema = z.object({
    name: z.string(),
    url: z.string().optional(),
    parentId: z.string().optional().nullable(),
    icon: z.string().optional(),
    collectionId: z.string().optional().nullable(),
    active: z.boolean().default(false)
});

export default MenuSchema;