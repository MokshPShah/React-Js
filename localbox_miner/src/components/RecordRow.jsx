import React from 'react'

const RecordRow = ({ record, startEdit, deleteRecord }) => {
  const { id, name, value, date } = record

  return (
    <>
      <td
        data-label='ID'
        className='px-4 py-3 text-center text-sm font-medium text-zinc-600'
      >
        {id}
      </td>
      <td
        data-label='Name'
        className='px-4 py-3 text-sm font-semibold text-zinc-800'
      >
        {name}
      </td>
      <td
        data-label='Value'
        className='px-4 py-3 text-sm font-medium text-amber-600'
      >
        {value}
      </td>
      <td data-label='Date Added' className='px-4 py-3 text-sm text-zinc-500'>
        {date}
      </td>
      <td data-label='Actions' className='px-4 py-3 text-center'>
        <div className='flex justify-center gap-2'>
          <button
            onClick={() => startEdit(id)}
            className='edit-button px-4 py-2 rounded-lg text-sm font-semibold bg-amber-100 text-amber-700 hover:bg-amber-200 transition duration-200'
          >
            Edit
          </button>
          <button
            onClick={() => deleteRecord(id)}
            className='delete-button px-4 py-2 rounded-lg text-sm font-semibold bg-red-100 text-red-600 hover:bg-red-200 transition duration-200'
          >
            Delete
          </button>
        </div>
      </td>
    </>
  )
}

export default RecordRow
