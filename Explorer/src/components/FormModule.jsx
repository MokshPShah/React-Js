import { useState } from "react"

export default function FormModule () {
  const [formData, setFormData] = useState({ name: '', role: 'Student' })

  const handleSubmit = e => {
    e.preventDefault()
    console.log('✅ Form Submitted with Data:', formData)
    alert(`Form Submitted! Check Console for data object.`)
  }

  const handleChange = e => {
    const { name, value } = e.target
    console.log(`📝 Form Change [${name}]: ${value}`)
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <div className='p-6 bg-white rounded-xl shadow-sm border border-slate-200'>
      <div className='grid md:grid-cols-2 gap-8'>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <label className='block text-sm font-medium text-slate-700 mb-1'>
              Full Name
            </label>
            <input
              name='name'
              value={formData.name}
              onChange={handleChange}
              className='w-full p-2 border border-slate-300 rounded-md'
              required
            />
          </div>
          <div>
            <label className='block text-sm font-medium text-slate-700 mb-1'>
              Role
            </label>
            <select
              name='role'
              value={formData.role}
              onChange={handleChange}
              className='w-full p-2 border border-slate-300 rounded-md'
            >
              <option>Student</option>
              <option>Developer</option>
              <option>Instructor</option>
            </select>
          </div>
          <button
            type='submit'
            className='w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-md font-medium transition-colors cursor-pointer'
          >
            Submit Form (Log to Console)
          </button>
        </form>

        <div className='bg-slate-900 text-green-400 p-4 rounded-lg font-mono text-sm'>
          <p className='text-slate-400 mb-2 border-b border-slate-700 pb-2'>
            // Live State
          </p>
          <pre>{JSON.stringify(formData, null, 2)}</pre>
        </div>
      </div>
    </div>
  )
}