import { z } from "zod";

const RoleSchema = z.object({
    name: z.string(),
    menus: z.array(z.string()).default([]).optional(),
    permissions: z.array(z.string()).default([]).optional(),
    active: z.boolean().default(false)
});

export default RoleSchema;