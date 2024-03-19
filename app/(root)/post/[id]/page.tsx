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

    const post = await fetchPostById(user.id);


return(
    <section>
        <h1 className="text-heading1-bold"></h1>
    </section>

)
}

export default Page;