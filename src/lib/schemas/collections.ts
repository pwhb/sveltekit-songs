import { z } from "zod";

const CollectionSchema = z.object({
    name: z.string(),
    columns: z.array(z.object({
        label: z.string(),
        value: z.string(),
        type: z.string().optional(),
        editable: z.boolean().default(false),
        displayable: z.boolean().default(false)
    })).default([]),
    active: z.boolean().default(false)
});

export default CollectionSchema;