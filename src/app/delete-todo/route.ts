import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  const supabase = createRouteHandlerClient({ cookies })
  const { searchParams } = new URL(req.url)
  const id = Number(searchParams.get('id'))

  if (!id) redirect('/')

  await supabase.from('todos').delete().eq('id', id)
  redirect('/')
}
