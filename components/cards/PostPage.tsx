import { createChat } from "@/lib/actions/chat.actions";
import { updateOccupationById } from "@/lib/actions/post.actions";
import { fetchUser } from "@/lib/actions/user.actions";
import { chatHrefConstructor } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface Props{

    id :string;
    currentUserId :string;
    content :string;
    author :{
    name:string;
    image:string;
    id:string;
    }
    createdAt :string;
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
    occupiedBy

}:Props) =>{

    const handle = () =>{
        createChat(chatHrefConstructor(author.id,occupiedBy));
    }

    if(!isOccupied)
{
    if(currentUserId!=author.id){

    
       updateOccupationById(id,true,currentUserId);
    }
    }else{
    console.log("Post is already  updated!" + currentUserId)
}

const occupiedByGuy = await fetchUser(occupiedBy);
console.log("occupiedBy: "+occupiedByGuy.id + " --- " + author.id);
    return (
    


        <div className="flex flex-col relative bg-gray-600 p-5 rounded-lg ">
       
       <div>
            <h1 className="text-heading-large text-light-2">{content}</h1>
            <h1 className="text-heading-md text-light-2">Reach {venue}</h1>
            <h1 className="text-heading-md text-light-2">By {timeStart}</h1>

            <div className="flex flex-row text-light-1 mt-5">
                Activity Initiated by: 
               <Link href={`/profile/${author.id}`} className="flex flex-row">
                <Image src={author.image}
                alt="user profile"
                className="rounded-full cursor-pointer mr-2 ml-2 "
                width={25}  
                height={15}
                />
               {author.id===currentUserId?(<h4 className="cursor-pointer text-base-semibold text-light-1">You</h4>
                ):
                (<h4 className="cursor-pointer text-base-semibold text-light-1">{author.name}</h4>
               )}
                </Link>
            </div>
            {!occupiedByGuy && currentUserId==author.id?
            (<p className="text-light-2">No one has joined the activity yet!</p>)
            :
            currentUserId==author.id?( <div className="flex flex-row text-light-1 mt-5">
           
           <Link href={`/profile/${author.id}`} className="flex flex-row">
            <Image src={occupiedByGuy.image}
            alt="user profile"
            className="rounded-full cursor-pointer mr-2 ml-2 "
            width={25}  
            height={15}
            />
            <h4 className="cursor-pointer text-base-semibold text-light-1">{occupiedByGuy.name} has joined the activity! </h4>
            </Link>
        </div>):(<></>)}

            </div>

            <div className="flex flex-row mt-52 mr-3 mb-3 self-end" >
               

           {
            !occupiedByGuy? (  <></>
            ):
            occupiedBy && currentUserId===author.id && occupiedByGuy?(
                <><p className="text-light-2 mt-4 mr-3 text-body-semibold"> Chat with {occupiedByGuy.name}</p>
                <Link href={`/chat/${chatHrefConstructor(author.id,occupiedBy)}`}>
                 
                <Image
                    src={'/assets/chat.svg'}
                    alt='chat'
                    width={54}
                    height={54}
                    className="cursor-pointer text-white"           
                />
                </Link>
                </> 

           ): ( <><p className="text-light-2 mt-4 mr-3 text-body-semibold">Confused about the location? Have a chat with {author.name}</p>
           <Link href={`/chat/${chatHrefConstructor(author.id,occupiedBy)}`}>
            
           <Image
               src={'/assets/chat.svg'}
               alt='chat'
               width={54}
               height={54}
               className="cursor-pointer text-white"           
           />
           </Link>
           </> 
           
           
           )}    
               
{/*             
            {occupiedByGuy?():(<></>)}
                 */}
                
            </div>

        </div>
    )
}

export default PostPage;