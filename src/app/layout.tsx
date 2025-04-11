import './globals.css'
import { ReactNode } from 'react'
import Providers from './providers'


export const metadata = {
  title: 'Next.js Supabase Auth App',
  description: 'Login App',
}
console.log('Layout loaded')

export default function RootLayout({ children }: { children: ReactNode }) {
  console.log('Layout loaded') // Ini HARUS muncul
  return (
    <html lang="en">
      <body className="bg-zinc-900 text-white font-sans">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
