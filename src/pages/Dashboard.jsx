import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import TodoItem from '../components/TodoItem'
import { toast } from 'react-toastify'

function Dashboard() {
  const [todos, setTodos] = useState([])
  const [newTodo, setNewTodo] = useState('')
  const [editingTodo, setEditingTodo] = useState(null)
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user'))

  useEffect(() => {
    if (!user) {
      navigate('/login')
      return
    }
    fetchTodos()
  }, [user, navigate])

  const fetchTodos = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/todos`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      setTodos(Array.isArray(response.data) ? response.data : [])
    } catch (error) {
      toast.error('Failed to fetch todos')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!newTodo.trim()) return

    if (editingTodo) {
      // Update existing todo
      try {
        const response = await axios.put(
          `http://localhost:5000/api/todos/${editingTodo._id}`,
          { text: newTodo },
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        )
        setTodos(
          todos.map((todo) =>
            todo._id === editingTodo._id ? response.data : todo
          )
        )
        setNewTodo('')
        setEditingTodo(null)
        toast.success('Todo updated successfully')
      } catch (error) {
        toast.error('Failed to update todo')
      }
    } else {
      // Create new todo
      try {
        const response = await axios.post(
          `http://localhost:5000/api/todos`,
          { text: newTodo },
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        )
        setTodos([...todos, response.data])
        setNewTodo('')
        toast.success('Todo added successfully')
      } catch (error) {
        toast.error('Failed to add todo')
      }
    }
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/todos/${id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      setTodos(todos.filter((todo) => todo._id !== id))
      toast.success('Todo deleted successfully')
    } catch (error) {
      toast.error('Failed to delete todo')
    }
  }

  const handleToggle = async (id) => {
    try {
      const todo = todos.find((t) => t._id === id)
      const response = await axios.put(
        `http://localhost:5000/api/todos/${id}`,
        {
          completed: !todo.completed,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      setTodos(
        todos.map((todo) =>
          todo._id === id ? { ...todo, completed: response.data.completed } : todo
        )
      )
    } catch (error) {
      toast.error('Failed to update todo')
    }
  }

  const handleEdit = (todo) => {
    setEditingTodo(todo)
    setNewTodo(todo.text)
  }

  const handleCancel = () => {
    setEditingTodo(null)
    setNewTodo('')
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-300 from-10% via-sky-500 via-30% to-emerald-300 to-90% '>
      <div className='max-w-2xl w-full space-y-8 p-8 bg-white rounded-lg shadow bg-gradient-to-r from-indigo-100 from-10% via-sky-300 via-30% to-emerald-100 to-90% -mt-9'>
      <h1 className='text-3xl font-bold mb-8'>Your Todos</h1>
      
      <form onSubmit={handleSubmit} className='mb-8'>
        <div className='flex gap-2'>
          <input
            type='text'
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder={editingTodo ? 'Edit todo' : 'Add a new todo'}
            className='flex-1 p-2 border rounded'
          />
          <button
            type='submit'
            className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'
          >
            {editingTodo ? 'Update' : 'Add Todo'}
          </button>
          {editingTodo && (
            <button
              type='button'
              onClick={handleCancel}
              className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600'
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className='space-y-4 overflow-y-auto max-h-[60vh]'>
        {todos.map((todo) => (
          <TodoItem
            key={todo._id}
            todo={todo}
            onDelete={handleDelete}
            onToggle={handleToggle}
            onEdit={handleEdit}
          />
        ))}
      </div>
    </div>
    </div>
  )
}

export default Dashboard
