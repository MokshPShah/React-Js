import React, { useEffect, useState } from 'react'

const initialFormState = {
  name: '',
  value: ''
}

const RecordForm = ({
  isEditing,
  currentRecord,
  addRecord,
  updateRecord,
  cancelEdit
}) => {
  const [formData, setFormData] = useState(initialFormState)
  const [error, setError] = useState('')

  useEffect(() => {
    if (isEditing && currentRecord) {
      setFormData({
        name: currentRecord.name,
        value: currentRecord.value
      })
    } else {
      setFormData(initialFormState)
    }
    setError('')
  }, [isEditing, currentRecord])

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })

    if (error) setError('')
  }

  const handleSubmit = e => {
    e.preventDefault()

    if (!formData.name || !formData.value) {
      setError('Both Name and Value fields are required.')
      return
    }

    if (isEditing) {
      updateRecord({...currentRecord, ...formData})
    } else {
      addRecord(formData)
      setFormData(initialFormState)
    }
  }

  return (
    <>
      <div className='space-y-6'>
        <div className='flex items-center justify-between border-b border-zinc-100 pb-4'>
          <h3 className='text-xl font-bold text-amber-800 flex items-center gap-2'>
            {isEditing ? 'Edit Record' : 'Add New Record'}
          </h3>
          {isEditing && (
            <span className='text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-2 py-1 rounded-full border border-amber-100'>
              Editing Mode
            </span>
          )}
        </div>

        <form onSubmit={handleSubmit} className='space-y-4'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {/* Name Input */}
            <div className='space-y-1'>
              <label className='text-xs font-bold text-zinc-500 ml-1'>
                RECORD NAME
              </label>
              <input
                type='text'
                name='name'
                placeholder='e.g. Gold Ore'
                className='w-full bg-zinc-50 border border-zinc-300 rounded-xl px-4 py-3 text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white transition-all'
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            {/* Value Input */}
            <div className='space-y-1'>
              <label className='text-xs font-bold text-zinc-500 ml-1'>
                VALUE (NUMBER)
              </label>
              <input
                type='number'
                name='value'
                placeholder='0.00'
                className='w-full bg-zinc-50 border border-zinc-300 rounded-xl px-4 py-3 text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white transition-all'
                value={formData.value}
                onChange={handleChange}
              />
            </div>
          </div>

          {error && (
            <p className='text-red-600 text-sm font-semibold bg-red-50 p-3 rounded-lg border border-red-100 flex items-center gap-2'>
              <span>⚠️</span> {error}
            </p>
          )}

          <div className='flex flex-col sm:flex-row gap-3 pt-2'>
            <button
              type='submit'
              className={`flex-2 py-3.5 px-6 rounded-xl font-bold text-white transition-all active:scale-[0.98] shadow-md hover:shadow-lg cursor-pointer ${
                isEditing
                  ? 'bg-amber-500 hover:bg-amber-600 shadow-amber-200'
                  : 'bg-yellow-600 hover:bg-yellow-700 shadow-yellow-200'
              }`}
            >
              {isEditing ? 'Update Entry' : 'Mine Record'}
            </button>

            {isEditing && (
              <button
                type='button'
                onClick={cancelEdit}
                className='flex-1 px-6 py-3.5 rounded-xl font-bold bg-zinc-100 text-zinc-600 hover:bg-zinc-200 transition-all active:scale-[0.98]'
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
    </>
  )
}

export default RecordForm
