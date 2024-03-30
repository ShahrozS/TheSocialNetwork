import Providers from '@/components/Providers'
import './globals.css'

export const metadata= {
  title: 'TheSocialNetwork',
  description: 'A University Social Network Application',
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}