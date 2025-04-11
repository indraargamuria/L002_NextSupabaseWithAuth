
'use client'
import { useState } from 'react'
import { signIn } from '@/lib/authService'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleLogin = async () => {
    const { error } = await signIn(email, password)
    if (!error) router.push('/')
    else alert(error.message)
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-4 bg-zinc-800 rounded">
      <h2 className="text-xl mb-4">Login</h2>
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" className="mb-2 w-full p-2 bg-zinc-700 rounded" />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" className="mb-4 w-full p-2 bg-zinc-700 rounded" />
      <button onClick={handleLogin} className="bg-green-600 px-4 py-2 rounded">Login</button>
    </div>
  )
}