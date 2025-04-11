// app/page.tsx
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { Todo } from '@/types/todo'
import { addTodo, deleteTodo } from '@/lib/todoService'

export default async function Home() {
  const supabase = createServerComponentClient({ cookies })
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: todos } = await supabase
    .from('todos')
    .select('*')
    .eq('user_id', user.id)
    .order('id', { ascending: true })

  return (
    <main className="max-w-xl mx-auto mt-10">
      <button className='bg-blue-500'></button>
      <h1 className="text-2xl font-bold mb-4 text-red-500">Dashboard</h1>

      <form action="/add-todo" method="POST" className="mb-4 flex">
        <input name="title" placeholder="New todo" className="flex-1 p-2 rounded bg-zinc-800 text-white" />
        <button type="submit" className="ml-2 px-4 bg-green-600 rounded">Add</button>
      </form>

      <ul>
        {todos?.map(todo => (
          <li key={todo.id} className="flex justify-between items-center p-2 bg-zinc-800 rounded mb-2">
            <span>{todo.title}</span>
            <form method="POST" action={`/delete-todo?id=${todo.id}`}>
              <button className="text-red-400 hover:text-red-600">Delete</button>
            </form>
          </li>
        ))}
      </ul>
    </main>
  )
}
