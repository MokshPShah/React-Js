import React, { useEffect, useState } from 'react'
import { FiEdit2, FiTrash2 } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'

const ViewEmployee = () => {
  const [employees, setEmployees] = useState([])
  const navigate = useNavigate()

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

  const handleEdit = (employee) => {
    navigate('/edit', { state: employee }) 
  }

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
            {employees.length > 0 ? (
              employees.map((emp, index) => (
                <tr
                  key={emp.id || index}
                  className='hover:bg-gray-50 transition duration-150 ease-in-out'
                >
                  <td className='px-6 py-4 whitespace-nowrap text-gray-400 font-mono'>
                    {index + 1}
                  </td>

                  <td className='px-6 py-4 whitespace-nowrap'>
                    {emp.image ? (
                      <img 
                        src={emp.image} 
                        alt="Profile" 
                        className='h-10 w-10 rounded-full object-cover border border-gray-200 shadow-sm' 
                      />
                    ) : (
                      <div className='h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold text-xs border border-purple-200'>
                        N/A
                      </div>
                    )}
                  </td>

                  <td className='px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900'>
                    {emp.name}
                  </td>

                  <td className='px-6 py-4 whitespace-nowrap'>
                    <div className='flex flex-col gap-2'>
                      <a href={`mailto:${emp.email}`} className='text-sm text-gray-900'>{emp.email}</a>
                      <a href={`tel:${emp.phone}`} className='text-sm text-gray-700'>{emp.phone}</a>
                    </div>
                  </td>

                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-600'>
                    {emp.department}
                  </td>

                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-600'>
                    {emp.designation}
                  </td>

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
                      
                      <button 
                        onClick={() => handleEdit(emp)}
                        className='text-purple-500 hover:text-purple-700 hover:bg-purple-50 p-2 rounded-full transition duration-200 cursor-pointer'
                        title="Edit"
                      >
                        <FiEdit2 size={18} />
                      </button>

                      <button 
                        onClick={() => deleteEmp(emp.id)}
                        className='text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-full transition duration-200 cursor-pointer'
                        title="Delete"
                      >
                        <FiTrash2 size={18} />
                      </button>

                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="text-center py-10 text-gray-500">
                  <div className="flex flex-col items-center justify-center">
                    <p className="text-lg font-medium">No employees found.</p>
                    <p className="text-sm">Click "+ Add New" to create an entry.</p>
                  </div>
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