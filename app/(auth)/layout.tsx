import { ClerkProvider } from "@clerk/nextjs"
import { Inter } from "next/font/google";


import '../globals.css';
export const metadata= {
    title: 'theSocialNetwork',
    description: 'A University Social Network Application',
}



const inter = Inter({subsets:["latin"]});


export default function RootLayout({
    
children
}:{children:React.ReactNode}){
return (

<ClerkProvider>
    <html lang="en">
<body className={`${inter.className} bg-dark-1 flex-col flex justify-center align-middle h-screen items-center `}>
    {children}
</body>
    </html>
</ClerkProvider>)
}