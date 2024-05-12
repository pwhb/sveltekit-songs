import { z } from "zod";

const UploadSchema = z.object({
    name: z.string(),
    label: z.string(),
    value: z.string(),
    active: z.boolean().default(false)
});

export default UploadSchema;