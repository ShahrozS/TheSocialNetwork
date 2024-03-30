"use server"

import { revalidatePath } from "next/cache";
import Post from "../models/post.model";
import User from "../models/user.model";
import { connectToDB } from "../mongoose";
import { fetchUser } from "./user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import Message from "../models/message.model";
import Chat from "../models/chat.model";
import { pusherServer } from "../pusher";
import { toPusherKey } from "../utils";

interface Params{
    text: string,
    chatId:string,
}

export async function sendMessage(
    {
        text,chatId
    }:Params
){

    try{
        connectToDB();
        const user = await currentUser();
        if(!user) return null;

        const [userId1,userId2] = chatId.split('--');

        if(user.id !== userId1 && user.id !== userId2){
            redirect('/');
        }


        const partnerId = user.id === userId1?userId2:userId1;
        const partner = await fetchUser(partnerId);

        const theuser = await fetchUser(user.id);



        const messageData = await Message.create({
            senderId: theuser._id,
            reciverId:partner._id,
            text:text,
            timestamp:Date.now(),
        });

        await Chat.findOneAndUpdate({id:chatId},{
            $push:{messages:messageData._id}
        });

        console.log("Message sent succesfully");
      pusherServer.trigger(toPusherKey(`chat:${chatId}`),'incoming-message',messageData);
      pusherServer.trigger(toPusherKey(`user:${partner.id}`),'new_message',messageData);

    } catch(err:any){
        console.log("Failed To send Message :" + err)
    }
}