import { z } from "zod";

const SongSchema = z.object({
    title: z.string(),
    artist: z.string(),
    src: z.string(),
    youtube: z.string(),
    thumbnail: z.string(),
    active: z.boolean().default(false)
});

export default SongSchema;