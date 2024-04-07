import { SignIn, currentUser } from "@clerk/nextjs";

export default async function Page(){
    

  

    return(
    <>    
    <h1  className="text-heading1-bold flex flex-col text-white font-sans mb-10 ">TheSocialNetwork<span className="text-white text-small-regular text-center">by shahroz</span></h1>
    <SignIn/>
    </>);
}
