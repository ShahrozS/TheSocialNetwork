

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
    occupiedBy: string;
    isOccupied: boolean;
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
    occupiedBy,
    isOccupied,
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

{/* if current user is author show the open button if hes the one who joined the activity show open to him too , if the user is new on home screen show join, if the post is already joined by someoone show occupied */}

                            {
                                currentUserId === author.id? (<Link
                                    href={`/dashboard/post/${id}`}
                                    > 
                                     <button  className=" bg-bg-button mr-6 text-button rounded-full items-center text-center self-center w-28 h-12  text-base1-semibold " >Open</button>
                                     </Link>)
                                :
                                isOccupied && currentUserId === occupiedBy?(<Link
                                    href={`/dashboard/post/${id}`}
                                    > 
                                     <button  className=" bg-bg-button mr-6 text-button rounded-full items-center text-center self-center w-28 h-12  text-base1-semibold " >Open</button>
                                     </Link>)
                                :
                                !isOccupied && (currentUserId !== occupiedBy && currentUserId!==author.id)?(<Link
                                    href={`/dashboard/post/${id}`}
                                    >
                                            <button  className=" bg-bg-button mr-6 text-button rounded-full items-center text-center self-center w-28 h-12  text-base1-semibold " >Join!</button>
                                            </Link>)
                                :(<button  className=" bg-bg-button mr-6 text-button rounded-full items-center text-center self-center w-28 h-12  text-base1-semibold opacity-70" disabled >Occupied!</button>)

                            }



        </article>
    )
}

export default PostCard;