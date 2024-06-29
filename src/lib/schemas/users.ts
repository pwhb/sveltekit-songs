import { z } from "zod";
// {
//     "_id": "65c92c635b2d9d001303fb7a",
//     "firstName": "Thu",
//     "lastName": "zar",
//     "username": "th.am",
//     "penName": "th.am",
//     "avatar": "",
//     "active": true,
//     "slug": "thu-zar",
//     "history": {
//         "created": {
//             "at": "2024-02-11T20:21:55.060Z",
//             "by": "644105c625abcc30ca3651e1"
//         },
//         "updated": {
//             "at": "2024-06-29T14:10:57.320Z",
//             "by": null
//         }
//     },
//     "roleId": "64435e4c4844d85bd2a7036b"
// }
const UserSchema = z.object({
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    username: z.string(),
    penName: z.string(),
    avatar: z.string().optional(),
    roleId: z.string().optional(),
    active: z.boolean().default(false)
});

export default UserSchema;