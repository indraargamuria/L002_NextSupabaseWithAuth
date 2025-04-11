import './globals.css'
import { ReactNode } from 'react'
import Providers from './providers'
import './globals.css'


export const metadata = {
  title: 'Next.js Supabase Auth App',
  description: 'Login App',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-zinc-900 text-white font-sans">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
