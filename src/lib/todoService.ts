
import { supabase } from './supabaseClient'
import { Todo } from '@/types/todo'

export async function getTodos(): Promise<Todo[]> {
  const { data: { user }, error: userError } = await supabase.auth.getUser()
  if (userError || !user) throw userError || new Error('User not authenticated')

  const { data, error } = await supabase
    .from('todos')
    .select('*')
    .eq('user_id', user.id)
    .order('id', { ascending: true })

  if (error) throw error
  return data || []
}

export async function addTodo(title: string): Promise<void> {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('User not authenticated')
  const { error } = await supabase.from('todos').insert({ title, user_id: user.id })
  if (error) throw error
}

export async function deleteTodo(id: number): Promise<void> {
  const { error } = await supabase.from('todos').delete().eq('id', id)
  if (error) throw error
}