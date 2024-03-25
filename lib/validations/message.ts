import * as z from 'zod';



export const MessageValidation = z.object({

    id:z.string(),
    senderId:z.string(),
    reciverId:z.string(),
    text:z.string(),
    timestamp:z.date(),



})

export const messageArrayValidator = z.array(MessageValidation)

export type Message = z.infer<typeof MessageValidation>