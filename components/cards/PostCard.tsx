

import { updateOccupationById } from "@/lib/actions/post.actions";
import { format } from "date-fns";
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




    //conveting time 

    const StarttimeString = timeStart;
const [hours, minutes] = StarttimeString.split(":").map(Number);

const dateStart = new Date();
dateStart.setHours(hours);
dateStart.setMinutes(minutes);


const EndtimeString = timeEnd;
const [hours2, minutes2] = EndtimeString.split(":").map(Number);

const dateEnd = new Date();
dateEnd.setHours(hours2);
dateEnd.setMinutes(minutes2);



   const formatetime= (time:Date)=>{
    return format(time," p")
   }
   
   console.log("AUTHOR:::"+ currentUserId)
    return (
        <article className ="flex w-full  items-center flex-row  justify-between rounded-xl bg-bg-secondary p-7" >

<div className="flex flex-col">

    <h2 className=" text-head-text-1 text-text-large   ">
        {content}
    </h2>
    <h4 className="text-base1-semibold text-white">
      At  {venue} 
    </h4>
    <h5 className="text-small-regular text-white mt-2">
        {formatetime(dateStart)} - {formatetime(dateEnd)}
    </h5>
    </div>

{currentUserId!=author.id?
(<Link
    href={`/post/${id}`}
    >
            <button  className=" bg-bg-button mr-6 text-button rounded-full items-center text-center self-center w-28 h-12  text-base1-semibold " >Join!</button>
            </Link>):(     
               <Link
               href={`/post/${id}`}
               > 
                <button  className=" bg-bg-button mr-6 text-button rounded-full items-center text-center self-center w-28 h-12  text-base1-semibold " >Open</button>
                </Link>)}



        </article>
    )
}

export default PostCard;