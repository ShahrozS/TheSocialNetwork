

import PostCard from "@/components/cards/PostCard";
import { fetchPosts } from "@/lib/actions/post.actions";
import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { useState } from "react";
 
export default  async  function Home() {

const user = await currentUser();

if(user==null) redirect('/sign-in')
const result =  await fetchPosts(1,30);





console.log(result);
  return (
    <>
      
      <section className="mt-9 flex flex-col gap-10">
        {result.posts.length === 0 ?(
          <p className="no-result">No Posts Found</p>
        ):(
          <>

<div className="flex items-center justify-start text-start">
  <div className="border-b border-light-2 w-10"></div>
  <h1 className="text-light-2 text-heading-md px-4">Your Active Posts</h1>
  <div className="flex-grow border-b border-light-2"></div>
</div>
          {result.posts.filter(post =>post.author.id === (user?.id||"")).map(post=>(
      
          <PostCard
          key={post._id}
          id={post._id}
          currentUserId={user?.id || ""}
          content = {post.text}
          author = {post.author}
          createdAt = {post.createdAt}
          venue = {post.venue}
          timeStart = {post.timeStart}
          timeEnd = {post.timeEnd}

          />
            
          ))}

<div className="flex items-center justify-start text-start">
  <div className="border-b border-light-2 w-10"></div>
  <h1 className="text-light-2 text-heading-md  px-4">Recent Posted Activities</h1>
  <div className="flex-grow border-b border-light-2"></div>
</div>       
         {result.posts.filter(post =>post.author.id !== (user?.id||"")).map(post=>(
     
         <PostCard
         key={post._id}
         id={post._id}
         currentUserId={user?.id || ""}
         content = {post.text}
         author = {post.author}
         createdAt = {post.createdAt}
         venue = {post.venue}
         timeStart = {post.timeStart}
         timeEnd = {post.timeEnd}

         />
           
         ))}

          

          </>

        )}
      </section>
    </>
  )
}