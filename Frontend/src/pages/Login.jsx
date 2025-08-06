import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    try {
      const res = await axios.post('http://localhost:8000/api/login', { email, password })
      localStorage.setItem('token', res.data.token)
      navigate('/todos')
    } catch (err) {
      setError('Login failed')
    }
  }

  return (
    <div className='login-container'>
      <h1 className='title'>Login</h1>
      <form className='login-form' onSubmit={handleLogin}>
        <input
          type='email'
          placeholder='Email'
          value={email}
          required
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type='password'
          placeholder='Password'
          value={password}
          required
          onChange={e => setPassword(e.target.value)}
        />
        <button type='submit'>Login</button>
      </form>
      {error && <p className='error'>{error}</p>}
      <p style={{textAlign:'center',marginTop:'1rem'}}>
        Don't have an account? <a href="/register">Register</a>
      </p>
    </div>
  )
}

export default Login