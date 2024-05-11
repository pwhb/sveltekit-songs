import { z } from "zod";

const WritingSchema = z.object({
    title: z.string(),
    category: z.string(),
    titleImage: z.string(),
    song: z.string(),
    finishedAt: z.string(),
    active: z.boolean().default(false)
});

export default WritingSchema;