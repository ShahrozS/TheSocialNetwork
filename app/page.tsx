import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function Home() {
  

    const user = await currentUser();
    if(!user) redirect("/sign-up");
    const currentuser = fetchUser(user.id);

    if(!currentUser) redirect('/onboarding');

    if(!user){
        redirect('/sign-up')
    }
    else{
        console.log("?")
        redirect('/onboarding')
        
    }
  
  
}