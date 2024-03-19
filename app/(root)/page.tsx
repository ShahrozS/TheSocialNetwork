

import ThreadCard from "@/components/cards/ThreadCard";
import { fetchPosts } from "@/lib/actions/post.actions";
import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs";
 
export default  async  function Home() {

const user = await currentUser();


const result =  await fetchPosts(1,30);

console.log(result);
  return (
    <>
      
      <h1 className="head-text text-left">Home</h1>
      <section className="mt-9 flex flex-col gap-10">
        {result.posts.length === 0?(
          <p className="no-result">No Posts Found</p>
        ):(
          <>
          {result.posts.map((post)=> (
            <ThreadCard
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