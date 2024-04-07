import Providers from '@/components/Providers'
import './globals.css'
import { ClerkProvider, currentUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import { fetchUser } from '@/lib/actions/user.actions'

export const metadata= {
  title: 'TheSocialNetwork',
  description: 'A University Social Network Application',
}

console.log("Idher?")

export default async function  RootLayout({
  children,
}: {
  children: React.ReactNode
}) {



    return (
      <>
    <html lang='en'>
      <body>
      {children}
      </body>
    </html>
    </>
  )
}