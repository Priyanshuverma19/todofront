import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(
        `https://todobackend-2-vomv.onrender.com/api/users/login`, // Ensure this is correct
        formData
      )
      localStorage.setItem('user', JSON.stringify(response.data))
      navigate('/')
      toast.success('Logged in successfully')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed')
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-300 from-10% via-sky-500 via-30% to-emerald-300 to-90%'>
      <div className='max-w-md w-full space-y-8 p-8 bg-gradient-to-r from-indigo-100 from-10% via-sky-300 via-30% to-emerald-100 to-90% rounded-lg shadow'>
        <h2 className='text-3xl font-bold text-center'>Login</h2>
        <form onSubmit={handleSubmit} className='space-y-6'>
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Email
            </label>
            <input
              type='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
              required
              className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2'
            />
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Password
            </label>
            <input
              type='password'
              name='password'
              value={formData.password}
              onChange={handleChange}
              required
              className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2'
            />
          </div>
          <button
            type='submit'
            className='w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600'
          >
            Login
          </button>
        </form>
        <p className='text-center'>
          Don't have an account?{' '}
          <Link to='/register' className='text-blue-500 hover:text-blue-600'>
            Register
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login
