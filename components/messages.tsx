"use client"

import { fetchUser } from "@/lib/actions/user.actions";
import { pusherClient } from "@/lib/pusher";
import { cn, toPusherKey } from "@/lib/utils";
import { Message } from "@/lib/validations/message";
import { useEffect, useRef, useState } from "react";
import { format } from 'date-fns'
interface MessagesProps{
    initialMessages: Message[];
    userId:string;
    chatId:string;
}   


const Messages =({
initialMessages,
userId,
chatId
}:MessagesProps)=>{


    const scrollDownRef = useRef<HTMLDivElement | null>(null)

const [messages,setMessages] = useState<Message[]>(initialMessages);
    
useEffect(()=>{
pusherClient.subscribe(
    toPusherKey(`chat:${chatId}`)
    )

    const messageHandler = ( message:Message) =>{
        setMessages((prev)=>[message,...prev])
    }


    pusherClient.bind('incoming-message',messageHandler)

    return()=>{
        pusherClient.unsubscribe(
            toPusherKey(`chat:${chatId}`)
        )
        pusherClient.unbind('incoming-message',messageHandler)

    }



},[])

const formatTimeStamp = (timestamp:Date)=>{
    return format(timestamp,' p')
}

return (

        <div id="messages" className='flex h-full flex-1 flex-col-reverse gap-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch'>

        <div ref={scrollDownRef}/>

        {messages.map((message,index)=>{
            const isCurrentUser = message.senderId === userId;
            const hasNextMessageFromSameUser = messages[index-1]?.senderId===messages[index].senderId

            return <div className='chat-message' key={`${message.id}-${message.timestamp}`}>
                <div className={cn('flex items-end',{
                    'justify-end':isCurrentUser,
                })}>
                    <div className={cn('flex flex-col space-y-2 text-base max-w-xs mx-2',{
                        'order-1 items-end':!isCurrentUser,
                        'order-2 items-start':isCurrentUser,
                    })}>
                        <span className={cn('px-4 py-2 rounded-lg inline-block',{
                            'bg-indigo-600 text-white': !isCurrentUser,
                            'bg-indigo-200 text-gray-900':isCurrentUser,
                            'rounded-br-none':!hasNextMessageFromSameUser&&isCurrentUser,
                            'rounded-bl-none' :!hasNextMessageFromSameUser && !isCurrentUser,
                        })}>
                            {message.text}{''}
                            <span className="ml-2 text-xs text-gray-400">
                                {formatTimeStamp(message.timestamp)}
                                
                            </span>
                        </span>
                    </div>
                    

                </div>
            </div>
    
      
      })}
        </div>


    )

}

export default Messages;