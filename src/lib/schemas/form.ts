import { z } from "zod";
import OptionSchema from "./options";

const FormSchema = z.object({
    name: z.string(),
    data: z.array(z.object({
        label: z.string(),
        value: z.string(),
        type: z.string(),
        options: z.array(OptionSchema).optional()
    })),
});

export default FormSchema;