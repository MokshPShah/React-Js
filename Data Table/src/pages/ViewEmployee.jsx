import React, { useEffect, useState } from 'react'
import { FiEdit2, FiTrash2, FiSearch, FiFilter } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'

const ViewEmployee = () => {
  const [employees, setEmployees] = useState([])
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('')
  const [filter, setFilter] = useState('All')

  useEffect(() => {
    const storedData = localStorage.getItem('Employee_Data')
    if (storedData) {
      setEmployees(JSON.parse(storedData))
    }
  }, [])

  const deleteEmp = id => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      const updatedEmployees = employees.filter(e => e.id !== id)
      setEmployees(updatedEmployees)
      localStorage.setItem('Employee_Data', JSON.stringify(updatedEmployees))
    }
  }

  const handleEdit = employee => {
    navigate('/edit', { state: employee })
  }

  // Logic for filtering, searching, and sorting
  const processedEmployees = employees
    .filter((emp) => {
      const searchTerm = search.toLowerCase();
      return (
        emp.name.toLowerCase().includes(searchTerm) ||
        (emp.eid && emp.eid.toLowerCase().includes(searchTerm)) ||
        emp.designation.toLowerCase().includes(searchTerm) ||
        emp.department.toLowerCase().includes(searchTerm)
      )
    })
    .filter((emp) => (filter === 'All' ? true : emp.status === filter))
    .sort((a, b) => {
      if (sort === 'name-asc') return a.name.localeCompare(b.name)
      if (sort === 'name-desc') return b.name.localeCompare(a.name)
      if (sort === 'salary-low') return Number(a.salary) - Number(b.salary)
      if (sort === 'salary-high') return Number(b.salary) - Number(a.salary)
      return 0
    })

  const getStatusStyle = status => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-700 border-green-200'
      case 'Inactive':
        return 'bg-red-100 text-red-700 border-red-200'
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200'
    }
  }

  return (
    <div className='p-10 bg-gray-50 min-h-screen'>
      {/* Header Section */}
      <div className='flex justify-between items-center mb-6'>
        <h2 className='text-2xl font-bold text-gray-800 tracking-tight'>
          Employee Directory
        </h2>
        <button
          onClick={() => navigate('/add')}
          className='bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-lg shadow-md transition duration-200 font-medium cursor-pointer'
        >
          + Add New
        </button>
      </div>

      {/* Search and Filter Bar */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-6'>
        <div className='relative'>
          <FiSearch className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' />
          <input
            type='text'
            placeholder='Search by name and role...'
            className='w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className='flex items-center gap-2'>
          <select
            className='w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white'
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value='All'>All Status</option>
            <option value='Active'>Active</option>
            <option value='Inactive'>Inactive</option>
          </select>
        </div>

        <div>
          <select
            className='w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white'
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value=''>Sort By</option>
            <option value='name-asc'>Name (A-Z)</option>
            <option value='name-desc'>Name (Z-A)</option>
            <option value='salary-low'>Salary (Low to High)</option>
            <option value='salary-high'>Salary (High to Low)</option>
          </select>
        </div>
      </div>

      {/* Table Section */}
      <div className='overflow-x-auto rounded-xl border border-gray-200 shadow-lg bg-white'>
        <table className='min-w-full divide-y divide-gray-200'>
          <thead className='bg-gray-50'>
            <tr>
              <th className='px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider'>Sr. No.</th>
              <th className='px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider'>Profile</th>
              <th className='px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider'>Name</th>
              <th className='px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider'>Contact</th>
              <th className='px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider'>Department</th>
              <th className='px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider'>Role</th>
              <th className='px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider'>Salary</th>
              <th className='px-6 py-4 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider'>Status</th>
              <th className='px-6 py-4 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider'>Actions</th>
            </tr>
          </thead>

          <tbody className='divide-y divide-gray-200 bg-white'>
            {processedEmployees.length > 0 ? (
              processedEmployees.map((emp, index) => (
                <tr key={emp.id || index} className='hover:bg-gray-50 transition duration-150 ease-in-out'>
                  <td className='px-6 py-4 whitespace-nowrap text-gray-400 font-mono'>{index + 1}</td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    {emp.image ? (
                      <img src={emp.image} alt='Profile' className='h-10 w-10 rounded-full object-cover border border-gray-200 shadow-sm' />
                    ) : (
                      <div className='h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold text-xs border border-purple-200'>N/A</div>
                    )}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900'>{emp.name}</td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <div className='flex flex-col'>
                      <span className='text-sm text-gray-900'>{emp.email}</span>
                      <span className='text-xs text-gray-500'>{emp.phone}</span>
                    </div>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-600'>{emp.department}</td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-600'>{emp.designation}</td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-700'>
                    {emp.salary ? `₹${Number(emp.salary).toLocaleString()}` : '-'}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-center'>
                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full border ${getStatusStyle(emp.status)}`}>
                      {emp.status}
                    </span>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-center text-sm font-medium'>
                    <div className='flex justify-center space-x-3'>
                      <button onClick={() => handleEdit(emp)} className='text-purple-500 hover:text-purple-700 p-2 rounded-full transition duration-200'><FiEdit2 size={18} /></button>
                      <button onClick={() => deleteEmp(emp.id)} className='text-red-500 hover:text-red-700 p-2 rounded-full transition duration-200'><FiTrash2 size={18} /></button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan='9' className='text-center py-10 text-gray-500'>
                  <p className='text-lg font-medium'>No employees match your criteria.</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ViewEmployee