import { z } from "zod";

const UserSchema = z.object({
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    username: z.string(),
    penName: z.string().optional(),
    avatar: z.string().optional(),
    roleId: z.string().optional(),
    active: z.boolean().default(false)
});

export default UserSchema;