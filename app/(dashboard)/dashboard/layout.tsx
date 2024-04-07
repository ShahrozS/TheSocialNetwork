import type { Metadata } from "next";
import { Inter } from "next/font/google";

import '../../globals.css';

import { ClerkProvider, currentUser } from "@clerk/nextjs";


import Topbar from "@/components/shared/Topbar";
import LeftSidebar from "@/components/shared/LeftSidebar";
import RightSidebar from "@/components/shared/RightSidebar";
import Bottombar from "@/components/shared/Bottombar";
import { fetchUser } from "@/lib/actions/user.actions";
import Providers from "@/components/Providers";
import { redirect } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata= {
  title: 'TheSocialNetwork',
  description: 'A University Social Network Application',
}



const Layout = async ({
  children,
}: {
  children: React.ReactNode;
})=> {


  const userid = await currentUser();

  if(!userid) redirect('/sign-in');

  const user = await fetchUser(userid.id);
  if(!user) return



  if(!user.onboarded) redirect("/onboarding");
  console.log("Checking logins " + userid + " " + user);

  console.log("SHDDSHISHDI")

  return (
    <ClerkProvider>  <Providers>
   <html lang='en'>
        <body className={inter.className}>
          
          <Providers>
          <Topbar userid = {userid.id} user = {JSON.parse(JSON.stringify(user))} />

          <main className='flex flex-row'>
            <LeftSidebar />
            <section className='main-container'>
              <div className='w-full max-w-4xl'>{children}</div>
            </section>
            {/* @ts-ignore */}
        
          </main>

          <Bottombar />
          </Providers>
        </body>
      </html>
      </Providers>
    </ClerkProvider>
  );
}
export default Layout