import { z } from "zod";

const PermissionSchema = z.object({
    collection: z.string(),
    action: z.string(),
    active: z.boolean().default(false)
});

export default PermissionSchema;