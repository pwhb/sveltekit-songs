import { z } from "zod";

const AuthSchema = z.object({
    username: z.string({
        required_error: 'username is required'
    }),
    password: z.string({
        required_error: 'password is required'
    }),
});

export default AuthSchema;