'use client'

import { pusherClient } from "@/lib/pusher";
import { toPusherKey } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";


interface props{
    ChatCountUser :string;
    currentUserId :string;
}


const UnseenMessageCount = ({
    ChatCountUser,
    currentUserId,


}:props) =>{

    interface Message{
        senderId:string;
        reciverId:string;
    
      
        text:string;
        timestamp:Date;
    
    }


    const [unseenMessages, setUnseenMessages] = useState<Message[]>([]);
    const pathname = usePathname();
    const router = useRouter();
    console.log("UnseenMessagnes for count: " + unseenMessages);

    useEffect(()=>{
        console.log("Checking if userEffect!!")
        pusherClient.subscribe(toPusherKey(`user:${ChatCountUser}:chats`))
    
        const chatHandler=(message:Message)=>{
            setUnseenMessages((prev) => [...prev, message])
    
        }
    
    
        pusherClient.bind('new_message',chatHandler)
    
        return()=>{
            pusherClient.unsubscribe(toPusherKey(`user:${ChatCountUser}:chats`))
            pusherClient.unbind('new_message',chatHandler);
        }
    },[router,pathname,currentUserId])

    const unseenMessagesCount = unseenMessages.filter((unseenMsg) => {
        return unseenMsg.senderId === ChatCountUser 
      }).length


    
    

return(
    <div className="absolute shadow-count-badge  sm:right-14 xs:right-1 left-9 rounded-full bg-red-500 w-7 h-7 justify-center flex text-center items-center text-white     text-body1-bold font-medium ">{unseenMessagesCount}</div>

)

}


export default UnseenMessageCount;