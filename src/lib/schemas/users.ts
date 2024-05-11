import { z } from "zod";

const UserSchema = z.object({
    status: z.string().optional(),
    role: z.string().optional(),
});

export default UserSchema;