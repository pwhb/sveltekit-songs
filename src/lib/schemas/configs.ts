import { z } from "zod";

const ConfigSchema = z.object({
    name: z.string(),
    data: z.any().optional()
});

export default ConfigSchema;