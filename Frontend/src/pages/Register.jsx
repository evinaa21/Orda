import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [password_confirmation, setPasswordConfirmation] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleRegister = async (e) => {
    e.preventDefault()
    setError('')
    try {
      await axios.post('http://localhost:8000/api/register', {
        name,
        email,
        password,
        password_confirmation
      })
      navigate('/')
    } catch (err) {
      setError('Registration failed')
    }
  }

  return (
    <div className='login-container'>
      <h1 className='title'>Register</h1>
      <form className='login-form' onSubmit={handleRegister}>
        <input
          type='text'
          placeholder='Name'
          value={name}
          required
          onChange={e => setName(e.target.value)}
        />
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
        <input
          type='password'
          placeholder='Confirm Password'
          value={password_confirmation}
          required
          onChange={e => setPasswordConfirmation(e.target.value)}
        />
        <button type='submit'>Register</button>
      </form>
      {error && <p className='error'>{error}</p>}
      <p style={{textAlign:'center',marginTop:'1rem'}}>
        Already have an account? <a href="/">Login</a>
      </p>
    </div>
  )
}

export default Register