import { fetchUserPosts } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import PostCardWithoutButton from "../cards/PostCardWithoutButton";


interface Props{

    currentUserId: string;
    accountId:string;
    accountType:string;

}


interface Result{
    name:string;
    image:string;
    id:string;
    posts:{
        _id:string;
        content:string;
        author:{
            name:string;
            image:string;
            id:string;
        }
        createdAt:string;
        venue:string;
        timeStart:string;
        timeEnd:string;
    }[];
}

const PostsTab = async({
    currentUserId, accountId , accountType
}:Props)=>{

    let result: Result;

     result = await fetchUserPosts(accountId);

    if(!result){ redirect('/');}

    return(
<section className="mt-9 flex flex-col gap-10">
 
 {result.posts.map((post)=>(


<PostCardWithoutButton
    key={post._id}
    id={post._id}
    currentUserId={currentUserId}
    content = {post.content}
    author = {post.author}
    createdAt = {post.createdAt}
    venue = {post.venue}
    timeStart = {post.timeStart}
    timeEnd = {post.timeEnd}
    />
    
 ) )}
</section>
    );
}

export default PostsTab;