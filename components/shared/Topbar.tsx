import { fetchUser } from "@/lib/actions/user.actions";
import { OrganizationSwitcher, SignOutButton, SignedIn, currentUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

async function Topbar   (){
    const userid = await currentUser();
    if(userid==null) return;
    const user =  await fetchUser(userid.id);
    
    return (
<nav className="topbar">
    <Link href="/" className="flex items-center gap-4">

        <Image src="/assets/logo.svg" alt ="logo" width = {28} height = {28}></Image>
        <p className="text-heading3-bold text-[#f3f0ed] max-xs:hidden">TheSocialNetwork</p>
    </Link>


    
    <div className="flex items-center gap-1">

        <div className="block md:hidden" >
            <SignedIn>


            <SignOutButton>

                <div className="flex cursor-pointer">
                    <Image 

                        src= "/assets/logout.svg"
                        alt="Logout"
                        width={24}
                        height={24}
                    />
                </div>
            </SignOutButton>



    


            </SignedIn>

        
        </div>


      

    </div>
    <div className="hidden md:block">
    <Link href={`/profile/${user.id}`} className="flex flex-row">
                <Image src={user.image}
                alt="user profile"
                className="rounded-full cursor-pointer mr-2 ml-2 "
                width={25}  
                height={15}
                />
               <h4 className="cursor-pointer text-base-semibold text-[#f3f0ed]">{user.name}</h4>
              
                </Link>
    </div>

</nav>

    )
}

export default Topbar;