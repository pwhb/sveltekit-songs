import { z } from "zod";

const AuthSchema = z.object({
    username: z
        .string({
            required_error: 'username is required'
        })
        .min(4, 'username must be at least 4 characters'),
    password: z
        .string({
            required_error: 'password is required'
        })
        .min(4, 'password must be at least 4 characters'),
});

export default AuthSchema;