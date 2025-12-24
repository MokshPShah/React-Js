import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

const EditEmployee = () => {
  const navigate = useNavigate()
  const location = useLocation()
  
  // Initialize state (will be populated in useEffect)
  const [emp, setEmp] = useState({
    id: '',
    name: '',
    email: '',
    phone: '',
    department: '',
    designation: '',
    salary: '',
    status: 'Active',
    image: ''
  })

  // 1. Load Data on Mount
  useEffect(() => {
    // Check if we have data passed from the View page
    if (location.state) {
      setEmp(location.state)
    } else {
      // If someone tries to open /edit directly without clicking the button, go back
      alert('No employee selected to edit')
      navigate('/view')
    }
  }, [location.state, navigate])

  const handleChange = e => {
    setEmp({ ...emp, [e.target.name]: e.target.value })
  }

  const handleImage = e => {
    const file = e.target.files[0]
    if (file) {
      const maxSize = 2 * 1024 * 1024
      if (file.size > maxSize) {
        alert('Image size is too big. Max size 2MB')
        return
      }
      const reader = new FileReader()
      reader.onloadend = () => {
        setEmp({ ...emp, image: reader.result })
      }
      reader.readAsDataURL(file)
    }
  }

  // 2. Handle Update Logic
  const handleUpdate = e => {
    e.preventDefault()

    // Get current list
    const allEmployees = JSON.parse(localStorage.getItem('Employee_Data')) || []

    // Map through list: find the one with matching ID and replace it, keep others same
    const updatedList = allEmployees.map(item => 
      item.id === emp.id ? emp : item
    )

    // Save back to storage
    localStorage.setItem('Employee_Data', JSON.stringify(updatedList))
    
    alert('Employee updated successfully!')
    navigate('/view')
  }

  return (
    <div className='flex min-h-screen items-center justify-center bg-gray-100 p-6'>
      <div className='w-full max-w-2xl rounded-xl bg-white p-8 shadow-lg'>
        <div className='mb-8 border-b border-gray-200 pb-4'>
          <h2 className='text-2xl font-bold text-gray-800'>Edit Employee</h2>
          <p className='mt-1 text-sm text-gray-500'>
            Update the details for <span className="font-semibold">{emp.name}</span>
          </p>
        </div>

        <form onSubmit={handleUpdate}>
          <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
            
            {/* Full Name */}
            <div>
              <label className='mb-1 block text-sm font-semibold text-gray-700'>Full Name</label>
              <input
                type='text'
                name='name'
                value={emp.name} // Added value binding
                required
                className='w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-700 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500'
                onChange={handleChange}
              />
            </div>

            {/* Email */}
            <div>
              <label className='mb-1 block text-sm font-semibold text-gray-700'>Email</label>
              <input
                type='email'
                name='email'
                value={emp.email}
                required
                className='w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-700 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500'
                onChange={handleChange}
              />
            </div>

            {/* Phone */}
            <div>
              <label className='mb-1 block text-sm font-semibold text-gray-700'>Phone</label>
              <input
                type='tel'
                name='phone'
                value={emp.phone}
                required
                className='w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-700 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500'
                onChange={handleChange}
              />
            </div>

            {/* Department */}
            <div>
              <label className='mb-1 block text-sm font-semibold text-gray-700'>Department</label>
              <input
                type='text'
                name='department'
                value={emp.department}
                required
                className='w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-700 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500'
                onChange={handleChange}
              />
            </div>

            {/* Designation */}
            <div>
              <label className='mb-1 block text-sm font-semibold text-gray-700'>Designation</label>
              <input
                type='text'
                name='designation'
                value={emp.designation}
                required
                className='w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-700 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500'
                onChange={handleChange}
              />
            </div>

            {/* Salary */}
            <div>
              <label className='mb-1 block text-sm font-semibold text-gray-700'>Salary</label>
              <input
                type='number'
                name='salary'
                value={emp.salary}
                required
                className='w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-700 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500'
                onChange={handleChange}
              />
            </div>

            {/* Status */}
            <div>
              <label className='mb-1 block text-sm font-semibold text-gray-700'>Status</label>
              <select
                name='status'
                value={emp.status}
                onChange={handleChange}
                className='w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-700 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500'
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            {/* Image Upload & Preview */}
            <div>
              <label className='mb-1 block text-sm font-semibold text-gray-700'>Image</label>
              <input
                type='file'
                name='image'
                accept="image/*"
                className='w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-700 mb-2'
                onChange={handleImage}
              />
              {emp.image && (
                 <img src={emp.image} alt="Preview" className="h-16 w-16 rounded-full object-cover border" />
              )}
            </div>
          </div>

          <div className='mt-8 flex justify-end space-x-4'>
            <button
              type='button'
              onClick={() => navigate('/view')}
              className='rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer'
            >
              Cancel
            </button>
            <button
              type='submit'
              className='rounded-lg bg-purple-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-purple-700 cursor-pointer'
            >
              Update Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditEmployee