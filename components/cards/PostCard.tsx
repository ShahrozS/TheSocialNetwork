

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
}

const PostCard = ({
  
    id,
    currentUserId,
    content,
    author,
    createdAt,
    venue,
    timeStart,
    timeEnd,

}:Props) =>{




  



    return (
        <article className ="flex w-full  items-center flex-row  justify-between rounded-xl bg-dark-2 p-7" >

<div className="flex flex-col">

    <h2 className=" head-text text-light-2">
        {content}
    </h2>
    <h4 className="text-base1-semibold text-light-2">
      At  {venue} 
    </h4>
    <h5 className="text-small-regular text-light-2 mt-2">
        {timeStart} - {timeEnd}
    </h5>
    </div>

<Link
href={`/post/${id}`}
>
        <button  className=" bg-slate-600 mr-6 text-light-2 rounded-full items-center text-center self-center w-28 h-12  text-base1-semibold " >Join!</button>
        </Link>
        </article>
    )
}

export default PostCard;