
'use client'

import { fetchUser } from "@/lib/actions/user.actions";
import { pusherClient } from "@/lib/pusher";
import { toPusherKey } from "@/lib/utils";
import { OrganizationSwitcher, SignOutButton, SignedIn, currentUser, useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import path from "path";
import { useEffect, useState } from "react";
import {toast} from "react-hot-toast";
import OccupiedByToast from "../toast/occupiedbytoast";
import Post from "@/lib/models/post.model";

import { Document } from "mongoose";



interface ExtendedPost{
id:string;
}

interface User{
    id: string;
    username: string;
    name: string;
    bio: string;
    image: string;
    onboarded: boolean;
}
interface Post{
    _id:string;
    text: string;
    author: User;
    venue: string;
    timeStart: string;
    timeEnd: string;
    createdAt: Date;
    isOccupied: boolean;
    occupiedBy?: string;
    expireAt?: Date;
}
interface topbarprops{
    userid:string,
    user: Partial<User>,

}

 function Topbar   ({userid,user}:topbarprops){

  


    if(userid==null) return;
    
console.log("In Top bar!");
const imagelink = user.image?user.image:""; 



    console.log( " User--> " + user)
    

    // useEffect(()=>{

    //     pusherClient.subscribe(toPusherKey(`user:${userid}:posts`))

    //     pusherClient.subscribe(toPusherKey(`user:${userid}:posts:isOccupied`))

    //     const postHandler = (post:ExtendedPost)=>{
           
    //         toast.custom((t)=>(
    //             <OccupiedByToast 
    //             t={t}
    //             postId={post.id}
    //             />
    //         ))
    //     }
    //     return () =>{
    //         pusherClient.unsubscribe(toPusherKey(`user:${userid}:posts`))

    //         pusherClient.unsubscribe(toPusherKey(`user:${userid}:posts:isOccupied`))
    
    //     }
    // },[])


    const [seenPosts, setSeenPosts] = useState(new Set());

  useEffect(() => {
    console.log("Woring!!");
    const handlePostOccupied = (post: Post) => {
      if (!seenPosts.has(post._id)) {
        console.log("WORKING!!")
        toast.custom((t) => (
            
            <OccupiedByToast
              t={t}
              postId={post._id}
              postText={post.text}
            />
          
            ) )
        setSeenPosts((prev) => new Set(prev).add(post._id));
      }
    };

    pusherClient.subscribe(toPusherKey(`user:${user?.id}:posts`));
    pusherClient.bind("postOccupied", handlePostOccupied);

    return () => {
      pusherClient.unsubscribe(toPusherKey(`user:${user?.id}:posts`));
      pusherClient.unbind("postOccupied", handlePostOccupied);
    };
  }, [user?.id, seenPosts]);




    return (
<nav className="topbar">
    <Link href="/" className="flex items-center gap-4">

        <Image src="/assets/logo.svg" alt ="logo" width = {68} height = {68}></Image>
        <p className=" text-[#f3f0ed] max-xs:hidden font-serif text-heading2-semibold ">TheSocialNetwork</p>
    </Link>


    
    <div className="flex items-center gap-1">

        <div className="block md:hidden" >
            <SignedIn>


            <SignOutButton>

                <div className="flex cursor-pointer">
                    <Image 

                        src= "/assets/logout.svg"
                        alt="Logout"
                        width={24}
                        height={24}
                    />
                </div>
            </SignOutButton>



    


            </SignedIn>

        
        </div>


      

    </div>
    <div className="hidden md:block">
    <Link href={`/dashboard/profile/${user?.id}`} className="flex flex-row">
                <Image src={imagelink}
                alt="user profile"
                className="rounded-full cursor-pointer mr-2 ml-2 "
                width={25}  
                height={15}
                />
               <h4 className="cursor-pointer text-base-semibold text-[#f3f0ed]">{user?.name}</h4>
              
                </Link>
    </div>

</nav>

    )
}

export default Topbar;