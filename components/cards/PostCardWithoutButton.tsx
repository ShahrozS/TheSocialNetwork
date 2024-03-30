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

const PostCardWithoutButton = ({
  
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
        <article className ="flex w-full  items-center flex-row  justify-between rounded-xl bg-bg-secondary p-7" >

<div className="flex flex-col">

    <h2 className=" text-head-text-1 text-text-large">
        {content}
    </h2>
    <h4 className="text-base1-semibold text-white">
      At  {venue} 
    </h4>
    <h5 className="text-small-regular text-[#e7e4e4] mt-2">
        {timeStart} - {timeEnd}
    </h5>
    </div>


        </article>
    )
}

export default PostCardWithoutButton;