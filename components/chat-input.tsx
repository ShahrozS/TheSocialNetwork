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

        <div className=" flex flex-row border-gray-200 px-4 pt-4 mb-2 ">
            <div className=" flex-1 overflow-hidden rounded-lg flex flex-row shadow-sm ring-2  ring-black   focus-within:ring-gray-500">
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
                className="block w-full border-none outline-none text-dark-1 resize-none bg-transparent  placeholder:text-dark-1 sm:py-1.g sm:text-small sm:leading-6  p-3 "
                />
                
                <div onClick={()=>textareaRef.current?.focus()}
                className='py-4 '
              
                >
                   
                        </div>    

<div className="  flex justify-between py-4 pl-3 pr-4">
     <div className="flex-shrink-0">
        <Button onClick={sendMessageFunc} type='submit' 
        className="  w-20 rounded-md text-sm font-medium transition-color focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none bg-slate-900 text-white hover:bg-slate-800  hover:text-white h-10 py-2 px-4 sm:h-9 sm:px-2 lg:h-11 lg:px-8"
        >Send</Button>
     </div>

</div>

            </div>

        </div>
     );
}
 
export default ChatInput;