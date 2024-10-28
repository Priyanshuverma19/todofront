import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
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
    if (formData.password !== formData.password2) {
      toast.error('Passwords do not match')
      return
    }

    try {
      const response = await axios.post(
        `http://localhost:5000/api/users/register`, // Ensure this is correct
        {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }
      )
      localStorage.setItem('user', JSON.stringify(response.data))
      navigate('/')
      toast.success('Registered successfully')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed')
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-300 from-10% via-sky-500 via-30% to-emerald-300 to-90%'>
      <div className='max-w-md w-full space-y-8 p-8 bg-gradient-to-r from-indigo-100 from-10% via-sky-300 via-30% to-emerald-100 to-90% rounded-lg shadow'>
        <h2 className='text-3xl font-bold text-center'>Register</h2>
        <form onSubmit={handleSubmit} className='space-y-6'>
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Name
            </label>
            <input
              type='text'
              name='name'
              value={formData.name}
              onChange={handleChange}
              required
              className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2'
            />
          </div>
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
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Confirm Password
            </label>
            <input
              type='password'
              name='password2'
              value={formData.password2}
              onChange={handleChange}
              required
              className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2'
            />
          </div>
          <button
            type='submit'
            className='w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600'
          >
            Register
          </button>
        </form>
        <p className='text-center'>
          Already have an account?{' '}
          <Link to='/login' className='text-blue-500 hover:text-blue-600'>
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Register
