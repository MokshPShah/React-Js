import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AddEmployee = () => {
  const navigate = useNavigate()

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

  const handleChange = e => {
    setEmp({
      ...emp,
      [e.target.name]: e.target.value
    })
  }

  const handleImage = e => {
    const file = e.target.files[0]
    if (file) {
      const maxSize = 2 * 1024 * 1024
      if (file.size > maxSize) {
        alert('The image size is too big. Please upload image with max size 2MB')
        e.target.value = null
        return
      }
      
      const reader = new FileReader()
      reader.onloadend = () => {
        setEmp({ ...emp, image: reader.result })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = e => {
    e.preventDefault()

    const empData = JSON.parse(localStorage.getItem('Employee_Data')) || []
    const newEmployee = { ...emp, id: Date.now() } 

    localStorage.setItem(
      'Employee_Data',
      JSON.stringify([...empData, newEmployee])
    )

    navigate('/view')
  }

  return (
    <div className='flex min-h-screen items-center justify-center bg-gray-100 p-6'>
      <div className='w-full max-w-2xl rounded-xl bg-white p-8 shadow-lg'>
        <div className='mb-8 border-b border-gray-200 pb-4'>
          <h2 className='text-2xl font-bold text-gray-800'>Add New Employee</h2>
          <p className='mt-1 text-sm text-gray-500'>
            Create a new employee account.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
            
            <div>
              <label className='mb-1 block text-sm font-semibold text-gray-700'>
                Full Name
              </label>
              <input
                type='text'
                name='name'
                required
                className='w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-700 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500'
                placeholder='Moksh Shah'
                onChange={handleChange}
              />
            </div>

            <div>
              <label className='mb-1 block text-sm font-semibold text-gray-700'>
                Email
              </label>
              <input
                type='email'
                name='email'
                required
                className='w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-700 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500'
                placeholder='moksh@gmail.com'
                onChange={handleChange}
              />
            </div>

            <div>
              <label className='mb-1 block text-sm font-semibold text-gray-700'>
                Phone
              </label>
              <input
                type='tel'
                name='phone'
                required
                maxLength={12}
                minLength={12}
                className='w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-700 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500'
                placeholder='+91 94287 29857'
                onChange={handleChange}
              />
            </div>

            <div>
              <label className='mb-1 block text-sm font-semibold text-gray-700'>
                Department
              </label>
              <input
                type='text'
                name='department'
                required
                className='w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-700 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500'
                placeholder='e.g. Marketing'
                onChange={handleChange}
              />
            </div>

            <div>
              <label className='mb-1 block text-sm font-semibold text-gray-700'>
                Designation
              </label>
              <input
                type='text'
                name='designation'
                required
                className='w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-700 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500'
                placeholder='Senior Manager'
                onChange={handleChange}
              />
            </div>

            {/* Salary */}
            <div>
              <label className='mb-1 block text-sm font-semibold text-gray-700'>
                Salary
              </label>
              <input
                type='number'
                name='salary'
                required
                className='w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-700 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500'
                placeholder='50000'
                onChange={handleChange}
              />
            </div>

            {/* Status */}
            <div>
              <label className='mb-1 block text-sm font-semibold text-gray-700'>
                Status
              </label>
              <select
                name='status'
                onChange={handleChange}
                value={emp.status}
                className='w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-700 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500'
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            <div>
              <label className='mb-1 block text-sm font-semibold text-gray-700'>
                Image
              </label>
              <input
                type='file'
                name='image'
                accept="image/*" // Added accept to limit file picker to images
                className='w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-700'
                onChange={handleImage}
              />
            </div>
          </div>

          <div className='mt-8 flex justify-end space-x-4'>
            <button
              type='button'
              onClick={() => navigate('/view')} 
              className='rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-gray-100 cursor-pointer'
            >
              Cancel
            </button>
            <button
              type='submit'
              className='rounded-lg bg-purple-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-4 focus:ring-purple-300 cursor-pointer'
            >
              Add Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddEmployee