'use client'

import { sendMessage } from "@/lib/actions/message.actions";
import { useRef, useState } from "react";

import TextareaAutosize from 'react-textarea-autosize';
import { Button } from "./ui/button";

interface ChatInputProps {
    
    chatId:string;
}
    
const ChatInput = ({chatId}:ChatInputProps) => {

    const [input,setInput] = useState<string>('');

    const sendMessageFunc = async()=>{
if(!input) return
        
        try{
            await new Promise((res)=>setTimeout(res,1000));
            
            sendMessage({text:input,chatId})

            setInput('');
            textareaRef.current?.focus()
        }catch(err:any){
            console.log("Error: " + err);
        }
    }

    const textareaRef = useRef<HTMLTextAreaElement | null>(null);
    return ( 

        <div className="border-t border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
            <div className="relative flex-1 overflow-hidden rounded-lg shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-gray-500">
                <TextareaAutosize ref={textareaRef} onKeyDown={(e)=>{
                    if(e.key==='Enter' && !e.shiftKey){
                        e.preventDefault()
                        sendMessage({text:input,chatId})
                        setInput('');
                    }
                }}
                
                rows={1}
                value={input}
                onChange={(e)=>setInput(e.target.value)}

                placeholder={"Initiate a convo!"}
                className="block w-full border-0 resize-none bg-transparent text-gray-900 placeholder:text-gray-400 focus:ring-9 sm:py-1.g sm:text-small sm:leading-6  "
                />
                
                <div onClick={()=>textareaRef.current?.focus()}
                className='py-2'
                aria-hidden = 'true'
                >
                    <div className="py-px">
                        <div className="h-9">

                        </div>
                    </div>
                        </div>    

<div className="absolute right-0 bottom-0 flex justify-between py-2 pl-3 pr-2">
     <div className="flex-shrink-0">
        <Button onClick={sendMessageFunc} type='submit'></Button>
     </div>

</div>

            </div>

        </div>
     );
}
 
export default ChatInput;