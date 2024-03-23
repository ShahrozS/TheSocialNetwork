import { updateOccupationById } from "@/lib/actions/post.actions";
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
}

const PostPage = ({
  
    id,
    currentUserId,
    content,
    author,
    createdAt,
    venue,
    timeStart,
    timeEnd,
    isOccupied,

}:Props) =>{

    if(!isOccupied)
{
       updateOccupationById(id,true,currentUserId);
}else{
    console.log("Post is already  updated!")
}
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
                <h4 className="cursor-pointer text-base-semibold text-light-1">{author.name}</h4>
                </Link>
            </div>


            </div>

            <div className="flex flex-row mt-52 mr-3 mb-3 self-end" >
                <p className="text-light-2 mt-4 mr-3 text-body-semibold">Chat with {author.name}</p>
                <Image
                    src={'/assets/chat.svg'}
                    alt='chat'
                    width={54}
                    height={54}
                    className="cursor-pointer text-white"
                />
            </div>

        </div>
    )
}

export default PostPage;