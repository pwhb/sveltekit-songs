import { z } from "zod";

const SongSchema = z.object({
    title: z.string(),
    artist: z.string().optional(),
    src: z.string(),
    youtube: z.string().optional(),
    thumbnail: z.string().optional(),
    active: z.boolean().default(false)
});

export default SongSchema;