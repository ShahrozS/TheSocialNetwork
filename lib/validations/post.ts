import * as z from 'zod';



export const PostValidation = z.object({

    post: z.string().nonempty().min(3,{message:"Minimum of 3 characters"}),
    venue:z.string().min(3,{message:"Should be more than 3 characters"}).max(30),
    timeStart: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/),
    timeEnd: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/),
    accountId:z.string(),
})