import { useEffect, useState } from 'react'
import axios from 'axios'

function Todos() {
  const [todos, setTodos] = useState([])
  const [loading, setLoading] = useState(true)
  const token = localStorage.getItem('token')

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/todos', {
          headers: { Authorization: `Bearer ${token}` }
        })
        setTodos(res.data)
      } catch (err) {
        setTodos([])
      }
      setLoading(false)
    }
    fetchTodos()
  }, [token])

  return (
    <div className='login-container'>
      <h1 className='title'>My Todos</h1>
      {loading ? <p>Loading...</p> : (
        <ul>
          {todos.map(todo => (
            <li key={todo.id}>{todo.name} {todo.completed ? '✅' : ''}</li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Todos