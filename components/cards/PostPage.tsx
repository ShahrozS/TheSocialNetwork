import { createChat } from "@/lib/actions/chat.actions";
import { updateOccupationById } from "@/lib/actions/post.actions";
import { fetchUser } from "@/lib/actions/user.actions";
import { chatHrefConstructor, toPusherKey } from "@/lib/utils";
import { redirect, usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {toast} from "react-hot-toast";
import OccupiedByToast from "../toast/occupiedbytoast";
import { useEffect, useState } from "react";
import { pusherClient } from "@/lib/pusher";
import UnseenMessageCount from "./unseenmsgcounter";
import { format } from "date-fns";

interface Props{

    id :string;
    currentUserId :string;
    content :string;
    author :{
    name:string;
    image:string;
    id:string;
    }
    createdAt :Date;
    venue :string;
    timeStart :string;
    timeEnd :string; 
    isOccupied:boolean;
    occupiedBy:string;
}

const PostPage = async ({
  
    id,
    currentUserId,
    content,
    author,
    createdAt,
    venue,
    timeStart,
    timeEnd,
    isOccupied,
    occupiedBy,
    

}:Props) =>{
 

    const handle = () =>{
        createChat(chatHrefConstructor(author.id,occupiedBy));
    }
    if(!id){redirect('/');}
    if(!isOccupied)
{
    if(currentUserId!=author.id){

        console.log("updateding!!")
       updateOccupationById(id,true,currentUserId);




    }
    }else{
    console.log("Post is already  updated!" + currentUserId)
}

//TODO: if current user is not equal to occupied by NOR the author, redirect him out.

console.log( author.id + "+++" + occupiedBy);
const occupiedByGuy = await fetchUser(occupiedBy);

// formating time 
const starttime = timeStart;
const [hours2, minutes2] = starttime.split(":").map(Number);

const dateStart = new Date();
dateStart.setHours(hours2);
dateStart.setMinutes(minutes2);

   const formatetime= (time:Date)=>{
    return format(time," p")
   }
   


   const authorUser = await fetchUser(author.id);

   





var ChatCountUser = "";



if(occupiedByGuy) {
     ChatCountUser = currentUserId == author.id? occupiedByGuy.id:author.id;

    console.log("occupiedBy: "+occupiedByGuy.id + " --- " + author.id + " " + isOccupied + " aurthoruser " + authorUser.id  );

}return (
    
  

        <div className="flex flex-col relative bg-bg-secondary p-5 rounded-lg ">
       
       <div>
            <h1 className="text-heading-large text-text-large">{content}</h1>
            <h1 className="text-heading-md text-white">Reach {venue}</h1>
            <h1 className="text-heading-md text-white">By {formatetime(dateStart)}</h1>

            <div className="flex flex-row text-[#f3f0ed] mt-5">
                Activity Initiated by: 
               <Link href={`/dashboard/profile/${author.id}`} className="flex flex-row">
                <Image src={author.image}
                alt="user profile"
                className="rounded-full cursor-pointer mr-2 ml-2 "
                width={25}  
                height={15}
                />
               {author.id===currentUserId?(<h4 className="cursor-pointer text-base-semibold text-[#f3f0ed]">You</h4>
                ):
                (<h4 className="cursor-pointer text-base-semibold text-[#f3f0ed]">{author.name}</h4>
               )}
                </Link>
            </div>


            {!occupiedByGuy && currentUserId==author.id?
            (<p className="text-[#f3f0ed]">No one has joined the activity yet!</p>)
            :
            currentUserId==author.id?( <div className="flex flex-row text-[#f3f0ed] mt-5">
           
           <Link href={`/dashboard/profile/${author.id}`} className="flex flex-row">
            <Image src={occupiedByGuy.image}
            alt="user profile"
            className="rounded-full cursor-pointer mr-2 ml-2 "
            width={25}  
            height={15}
            />
            <h4 className="cursor-pointer text-base-semibold text-[#f3f0ed]">{occupiedByGuy.name} has joined the activity! </h4>
            </Link>
        </div>):(<></>)}

            </div>

            <div className="flex flex-row mt-52 mr-3 mb-3 self-end" >
               

           


           {
           //User is not the author
            currentUserId!==author.id?(
                <><p className="text-[#f3f0ed] mt-4 lg:mr-3  sm:text-small-semibold lg:text-body-semibold">Confused about the location? Have a chat with {author.name}</p>
           <Link href={`/dashboard/chat/${chatHrefConstructor(authorUser.id,currentUserId)}`}>
         
         
           <div className="relative">
<UnseenMessageCount ChatCountUser={ChatCountUser} currentUserId={currentUserId}/>
           <Image
               src={'/assets/chat.svg'}
               alt='chat'
               width={54}
               height={54}
               className="cursor-pointer xs:mt-4 sm:mt-4 text-white"           
           />
           </div>
           </Link>
           </> 
           
           
            )
            :
            occupiedByGuy && currentUserId == author.id?(
                <>
                
                <p className="text-[#f3f0ed] mt-4 mr-3 text-body-semibold"> Chat with {occupiedByGuy.name}</p>
                <Link href={`/dashboard/chat/${chatHrefConstructor(authorUser.id,occupiedBy)}`}>
                 
                 <div className="relative">
                 <UnseenMessageCount ChatCountUser={ChatCountUser} currentUserId={currentUserId}/>

                <Image
                    src={'/assets/chat.svg'}
                    alt='chat'
                    width={54}
                    height={54}
                    className="cursor-pointer text-white shadow-lg"           
                />
              </div>
                </Link>
                </> 
              
            ):(<></>)
           }
               
{/*             
            {occupiedByGuy?():(<></>)}
                 */}
                
            </div>

        </div>
   
               
        )
}

export default PostPage;





