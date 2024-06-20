import { z } from "zod";

const PermissionSchema = z.object({
    action: z.string(),
    method: z.string(),
    pattern: z.string(),
    active: z.boolean().default(false)
});

export default PermissionSchema;