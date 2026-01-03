import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  FiUsers,
  FiUserCheck,
  FiUserX,
  FiBriefcase,
  FiTrendingUp,
  FiPhone,
  FiMail,
  FiDollarSign,
  FiEdit2,
  FiUserPlus
} from 'react-icons/fi'

const Dashboard = () => {
  const navigate = useNavigate()
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    inactive: 0,
    departments: 0
  })
  const [recentEmployees, setRecentEmployees] = useState([])

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('Employee_Data')) || []

    setStats({
      total: storedData.length,
      active: storedData.filter(e => e.status === 'Active').length,
      inactive: storedData.filter(e => e.status === 'Inactive').length,
      departments: new Set(storedData.map(e => e.department)).size
    })

    setRecentEmployees([...storedData].reverse().slice(0, 3))
  }, [])

  return (
    <div className='min-h-screen bg-gray-100 p-8'>
      <div className='mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4'>
        <div>
          <h1 className='text-3xl font-bold text-gray-800 tracking-tight'>
            Dashboard
          </h1>
          <p className='text-gray-500'>
            Overview of your organization's performance.
          </p>
        </div>
        <button
          onClick={() => navigate('/add')}
          className='bg-purple-600 hover:bg-purple-700 text-white px-6 py-2.5 rounded-lg shadow-lg shadow-purple-200 transition-all transform hover:-translate-y-0.5 font-medium flex items-center gap-2 cursor-pointer'
        >
          <FiUserPlus /> Add Employee
        </button>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12'>
        <StatCard
          title='Total Staff'
          value={stats.total}
          icon={<FiUsers size={24} />}
          color='blue'
        />
        <StatCard
          title='Active Members'
          value={stats.active}
          icon={<FiUserCheck size={24} />}
          color='green'
        />
        <StatCard
          title='Inactive / Leave'
          value={stats.inactive}
          icon={<FiUserX size={24} />}
          color='red'
        />
        <StatCard
          title='Departments'
          value={stats.departments}
          icon={<FiBriefcase size={24} />}
          color='purple'
        />
      </div>

      <div>
        <div className='flex justify-between items-center mb-6'>
          <h2 className='text-xl font-bold text-gray-800 flex items-center gap-2'>
            <FiTrendingUp className='text-indigo-500' /> Recently Joined
          </h2>
          <Link
            to='/view'
            className='text-sm font-semibold text-indigo-600 hover:text-indigo-800 hover:underline'
          >
            View All Employee &rarr;
          </Link>
        </div>

        {recentEmployees.length > 0 ? (
          <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8'>
            {recentEmployees.map(emp => (
              <div
                key={emp.id}
                className='bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden group'
              >
                <div className={`h-14`}>
                  <div className='absolute top-4 right-4'>
                    <span className='bg-white/20 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full border border-white/30'>
                      {emp.status}
                    </span>
                  </div>
                </div>

                <div className='px-6 pb-6 relative'>
                  <div className='-mt-12 mb-4 flex justify-between items-end'>
                    <div className='relative'>
                      {emp.image ? (
                        <img
                          src={emp.image}
                          alt={emp.name}
                          className='w-24 h-24 rounded-xl object-cover border-4 border-white shadow-md bg-white'
                        />
                      ) : (
                        <div className='w-24 h-24 rounded-xl bg-white flex items-center justify-center text-3xl font-bold text-indigo-600 border-4 border-white shadow-md'>
                          {emp.name?.charAt(0)}
                        </div>
                      )}
                    </div>

                    <span className='mb-1 text-xs font-mono text-gray-400'>
                      ID: #{emp.id?.toString().slice(-4)}
                    </span>
                  </div>

                  <div className='mb-6'>
                    <h3 className='text-xl font-bold text-gray-900 leading-tight'>
                      {emp.name}
                    </h3>
                    <p className='text-sm text-indigo-600 font-medium'>
                      {emp.designation}
                    </p>
                    <p className='text-xs text-gray-500 mt-1'>
                      {emp.department} Department
                    </p>
                  </div>

                  <div className='grid grid-cols-2 gap-4 text-sm text-gray-600 bg-gray-50 p-4 rounded-lg mb-4'>
                    <div className='flex items-center gap-2'>
                      <FiMail className='text-gray-400' />
                      <span className='truncate max-w-25' title={emp.email}>
                        {emp.email}
                      </span>
                    </div>
                    <div className='flex items-center gap-2'>
                      <FiPhone className='text-gray-400' />
                      <span>{emp.phone || 'N/A'}</span>
                    </div>
                    <div className='flex items-center gap-2 col-span-2'>
                      <FiDollarSign className='text-gray-400' />
                      <span className='font-semibold text-gray-800'>
                        {emp.salary
                          ? `₹${Number(emp.salary).toLocaleString()}/yr`
                          : 'Confidential'}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => navigate('/edit', { state: emp })}
                    className='w-full py-2 rounded-lg border border-indigo-100 text-indigo-600 font-medium hover:bg-indigo-50 transition flex items-center justify-center gap-2 group-hover:border-indigo-200 cursor-pointer'
                  >
                    <FiEdit2 size={16} /> Edit Profile
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className='bg-white border-2 border-dashed border-gray-300 rounded-xl p-12 text-center'>
            <FiUsers className='mx-auto h-12 w-12 text-gray-400' />
            <h3 className='mt-2 text-sm font-medium text-gray-900'>
              No employees
            </h3>
            <p className='mt-1 text-sm text-gray-500'>
              Get started by creating a new employee.
            </p>
            <div className='mt-6'>
              <button
                onClick={() => navigate('/add')}
                className='inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 cursor-pointer'
              >
                + Add Employee
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

const StatCard = ({ title, value, icon, color }) => {
  const colors = {
    blue: 'bg-blue-50 text-blue-600 border-blue-200',
    green: 'bg-green-50 text-green-600 border-green-200',
    red: 'bg-red-50 text-red-600 border-red-200',
    purple: 'bg-purple-50 text-purple-600 border-purple-200'
  }

  return (
    <div
      className={`bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4 transition hover:shadow-md`}
    >
      <div className={`p-4 rounded-full ${colors[color]}`}>{icon}</div>
      <div>
        <p className='text-sm font-medium text-gray-500'>{title}</p>
        <p className='text-2xl font-bold text-gray-800'>{value}</p>
      </div>
    </div>
  )
}

export default Dashboard
