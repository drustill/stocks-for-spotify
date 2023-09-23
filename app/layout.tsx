import './globals.css'
import { Figtree } from 'next/font/google'

import Navbar from '@/components/Navbar'
import SupabaseProvider from '@/providers/SupabaseProvider'
import UserProvider from '@/providers/UserProvider'
import ModalProvider from '@/providers/ModalProvider'
import getFriends from '@/actions/getFriends'

const font = Figtree({ subsets: ['latin'] })

export const metadata = {
  title: 'Stocks for Spotify',
  description: 'Fun lalala',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  
  const userFriends = await getFriends();
  console.log(userFriends)
  console.log("hiiiii")
  // ITS A AUTH LOGIN PROBLEM I THINK

  return (
    <html lang="en">
      <body className={font.className}>
        <SupabaseProvider>
          <UserProvider>
            <ModalProvider />
            <Navbar friends={userFriends}>
              {children}
            </Navbar>
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  )
}
