import PostPage from '@/components/cards/PostPage';
import { fetchPostById } from '@/lib/actions/post.actions';
import { fetchUser } from '@/lib/actions/user.actions';
import {currentUser} from '@clerk/nextjs'; 
import { redirect } from 'next/navigation';

const Page = async ({params}:{params:{id:string}}) =>{




    if(!params.id) return null;

    const user = await currentUser();
    if(!user) return null;

    const userInfo = await fetchUser(user.id);
    if(!userInfo?.onboarded) redirect('/onboarding');

    const post = await fetchPostById(params.id);
    console.log(params.id);

    if(!post) redirect('/');

return(
    <PostPage
            key={post._id}
            id={post._id}
            currentUserId={user?.id || ""}
            content = {post.text}
            author = {post.author}
            createdAt = {post.createdAt}
            venue = {post.venue}
            timeStart = {post.timeStart}
            timeEnd = {post.timeEnd}
            isOccupied = {post.isOccupied}
            occupiedBy = {post.occupiedBy}

   />

)
}

export default Page;