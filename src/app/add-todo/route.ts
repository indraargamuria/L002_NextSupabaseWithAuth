import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function POST(req: Request) {
  const supabase = createRouteHandlerClient({ cookies })
  const formData = await req.formData()
  const title = formData.get('title') as string
  const { data: { user } } = await supabase.auth.getUser()

  if (!user || !title) redirect('/')

  await supabase.from('todos').insert({ title, user_id: user.id })
  redirect('/')
}
