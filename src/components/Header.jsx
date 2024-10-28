import { Link, useNavigate } from 'react-router-dom'

function Header() {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user'))

  const onLogout = () => {
    localStorage.removeItem('user')
    navigate('/login')
  }

  return (
    <header className='bg-gray-800 py-4'>
      <div className='container mx-auto px-4 flex justify-between items-center'>
        <div className='text-white font-bold text-xl'>
          <Link to='/'>TodoApp</Link>
        </div>
        <nav>
          {user ? (
            <button
              className='text-white hover:text-gray-300'
              onClick={onLogout}
            >
              Logout
            </button>
          ) : (
            <div className='space-x-4'>
              <Link
                to='/login'
                className='text-white hover:text-gray-300'
              >
                Login
              </Link>
             
            </div>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Header
