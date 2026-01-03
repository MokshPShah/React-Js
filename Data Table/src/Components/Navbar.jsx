import { useState } from 'react'
import { FiUserPlus, FiUsers } from 'react-icons/fi'
import { LuLayoutPanelLeft } from 'react-icons/lu'
import { RxDashboard } from 'react-icons/rx'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const [open, setOpen] = useState(false)
  return (
    <nav className='flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative transition-all'>
      <Link to={'/'} className='flex items-center gap-2 text-2xl text-purple-700 font-bold'>
        <LuLayoutPanelLeft /> Employee Panel
      </Link>
      {/* Desktop Menu */}
      <div className='hidden sm:flex items-center gap-8'>
        <Link to={'/'} className="flex items-center gap-2 bg-purple-600 py-2 px-3 text-white rounded-xl">
          <RxDashboard /> Dashboard
        </Link>
        <Link to={'/view'} className="flex items-center gap-2 bg-purple-600 py-2 px-3 text-white rounded-xl">
          <FiUsers /> Employee
        </Link>
        <Link to={'/add'} className="flex items-center gap-2 bg-purple-600 py-2 px-3 text-white rounded-xl">
          <FiUserPlus />
          Add Employee
        </Link>
      </div>

      <button
        onClick={() => (open ? setOpen(false) : setOpen(true))}
        aria-label='Menu'
        className='sm:hidden'
      >
        {/* Menu Icon SVG */}
        <svg
          width='21'
          height='15'
          viewBox='0 0 21 15'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <rect width='21' height='1.5' rx='.75' fill='#426287' />
          <rect x='8' y='6' width='13' height='1.5' rx='.75' fill='#426287' />
          <rect x='6' y='13' width='15' height='1.5' rx='.75' fill='#426287' />
        </svg>
      </button>

      {/* Mobile Menu */}
      <div
        className={`${
          open ? 'flex' : 'hidden'
        } absolute top-15 left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-2 px-5 text-sm md:hidden`}
      >
        <Link to={'/'} className='block'>
          Home
        </Link>
        <Link to={'/add'} className='block'>
          Add Admin
        </Link>
        <Link to={'/view'} className='block'>
          View Admin
        </Link>
      </div>
    </nav>
  )
}

export default Navbar
