import { z } from "zod";

const PermissionSchema = z.object({
    collection: z.string(),
    method: z.string(),
    route: z.string(),
    active: z.boolean().default(false)
});

export default PermissionSchema;