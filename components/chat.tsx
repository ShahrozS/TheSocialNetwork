
import ChatInput from "@/components/chat-input";
import Messages from "@/components/messages";
import { createChat, getChatMessages } from "@/lib/actions/chat.actions";
import { fetchUser } from "@/lib/actions/user.actions";
import { chatHrefConstructor } from "@/lib/utils";
import { Session, currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import { redirect } from "next/navigation";



interface props{
    chatid:string;
}
//fakefakekfakfkakf
const Chat = async ({chatid}:props)=>{
    const [userId1,userId2] = chatid.split('--');

    const user  = await currentUser();
    if (!user) return null; 
    
    
    const userInfo = await fetchUser(user.id);
    if (!userInfo?.onboarded) redirect("/");

    console.log("User id1: " + userId1 + "user id2: " + userId2 + " Current user: " + user.id + "  partner: " + userInfo.id)
    if(user.id!==userId1 && user.id !==  userId2){
        console.log("Redirecting")
    redirect("/");
    }
    
    const chatPartnerId = user.id===userId1 ? userId2 :userId1
    
    const chatPartner = await fetchUser(chatPartnerId);
    console.log("--->"+chatPartner)
    
    createChat(chatHrefConstructor(chatPartnerId,user.id));
    
    const initialMessages = await getChatMessages(chatid);
    console.log("Message: "+ initialMessages);
    
    if(!initialMessages){
        return null;
    }
        return(
            <section>
         <div className="flex-1 justify-between flex flex-col max-h-[83vh] min-w-[0] md:max-h-[83vh] lg:max-h-[80vh]  sm:max-h-[73vh] xs:max-h-[75vh] overflow-y-hidden">
            <div className="flex sm:items-center justify-between py-3 border-b-2 border-dark-1 shadow-lg ">
                <div className="relative flex items-start space-x-4">
    
    <div className="relative">
        <div className="relative w-10 sm:w-12 h-10 sm:h-12">
            
        <Image
    fill
    referrerPolicy='no-referrer'
    src={chatPartner.image}
    alt = {"profile picture"}
    className='rounded-full'
    /> 
    
        </div>
    </div>
    <div className="flex flex-col leading-tight">
        <div className="text-heading4-medium flex items-center">
            <span className="text-dark-1 mr-3 font-semibold">
                {chatPartner.name}
            </span>
        </div>
    <span className=" text-dark-2">{chatPartner.username}</span>
    
    </div>
    
                </div>
    
    
            </div>
    
    
    <Messages chatId={chatid} userId={userInfo._id.toString()} initialMessages={initialMessages}/>
    <ChatInput chatId={chatid}/>
         </div>
         </section>
        )
    
}

export default Chat;