import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function Home() {
  

    const user = await currentUser();
    if(!currentUser){
        redirect('/sign-up')
    }else{
        redirect('/dashboard')
    }
  
    return <></>
}