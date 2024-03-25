"use server"

import { revalidatePath } from "next/cache";
import Post from "../models/post.model";
import User from "../models/user.model";
import { connectToDB } from "../mongoose";
import { fetchUser } from "./user.actions";
import Chat from "../models/chat.model";
import Message from "../models/message.model";
import { messageArrayValidator } from "../validations/message";
import { Document } from "mongoose";

interface Message {
    id: string
    senderId: string
    receiverId: string
    text: string
    timestamp: number
  }
  

export async function createChat(chatId:string){
try{
connectToDB();
await Chat.create({id:chatId})
console.log("Chat created succesfully")
}
catch(err:any){
    console.log(`cannot create chat :${err}`);
}
}


export async function getChatMessages(chatId : string){
    connectToDB();
    try{
        const chat = await Chat.findOne({id:chatId}).populate({
            path:'messages',
            model: Message,
          });
       
          
         
          
    if (!chat) {
      throw new Error('Chat not found');
        return null;
    }

    console.log(getChatMessages);

    
   const reversedDbMessages = chat.messages.reverse();

   const plainMessages = reversedDbMessages.map((message:Message) => ({
    senderId: message.senderId?.toString(),
    receiverId: message.receiverId?.toString(),
    text: message.text,
    timestamp: message.timestamp.toString(),
  }));
  
  return plainMessages;
console.log("Messages: "+ reversedDbMessages)

   return reversedDbMessages;
   
}catch(err:any){
    console.log(`Failed to get messages :  ${err}` );
}
}


