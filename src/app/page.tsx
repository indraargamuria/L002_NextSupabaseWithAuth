'use client'
import { useEffect, useState } from 'react'
import { getTodos, deleteTodo, addTodo } from '@/lib/todoService'
import { signOut } from '@/lib/authService'
import { useRouter } from 'next/navigation'
import { Todo } from '@/types/todo'

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [newTodo, setNewTodo] = useState('')
  const router = useRouter()

  useEffect(() => {
    getTodos().then(setTodos).catch((err) => {
      console.error(err)
      router.push('/login')
    })
  }, [])

  const handleAddTodo = async () => {
    if (!newTodo.trim()) return
    await addTodo(newTodo)
    const updatedTodos = await getTodos()
    setTodos(updatedTodos)
    setNewTodo('')
  }

  const handleLogout = async () => {
    await signOut()
    router.push('/login')
  }

  return (
    <main className="max-w-xl mx-auto mt-10">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Main Dashboard</h1>
        <button onClick={handleLogout} className="bg-red-600 px-4 py-1 rounded text-white hover:bg-red-700">
          Logout
        </button>
      </div>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={newTodo}
          onChange={e => setNewTodo(e.target.value)}
          placeholder="Add new todo"
          className="flex-grow p-2 rounded bg-zinc-700 placeholder-zinc-400"
        />
        <button
          onClick={handleAddTodo}
          className="bg-blue-600 px-4 py-2 rounded text-white hover:bg-blue-700"
        >
          Add
        </button>
      </div>

      <ul>
        {todos.map(todo => (
          <li key={todo.id} className="flex justify-between items-center p-2 bg-zinc-800 rounded mb-2">
            <span>{todo.title}</span>
            <button
              onClick={() =>
                deleteTodo(todo.id).then(() => setTodos(todos.filter(t => t.id !== todo.id)))
              }
              className="text-red-400 hover:text-red-600"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </main>
  )
}
