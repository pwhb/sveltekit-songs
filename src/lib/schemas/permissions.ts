import { z } from "zod";

const PermissionSchema = z.object({
    menuId: z.string(),
    action: z.string(),
    method: z.string(),
    pattern: z.string(),
    active: z.boolean().default(false)
});

export const PermissionBulkCreateSchema = z.object({
    permissions: z.array(PermissionSchema)
});

export default PermissionSchema;