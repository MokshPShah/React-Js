import React from 'react'

const RecordList = ({ records, startEdit, deleteRecord, clearAllRecords }) => {
  if (records.length === 0) {
    return (
      <div className='flex flex-col items-center justify-center py-16 px-6 text-center'>
        <div className='w-16 h-16 mb-4 rounded-full bg-amber-100 flex items-center justify-center text-2xl'>
          ⛏️
        </div>

        <h3 className='text-lg font-bold text-amber-800'>No Records Found</h3>

        <p className='mt-1 text-sm text-zinc-500 max-w-sm'>
          Start mining data by adding your first record above.
        </p>
      </div>
    )
  }

  return (
    <>
      <div className='overflow-hidden'>
        <div className='overflow-x-auto'>
          <table className='min-w-full text-sm'>
            {/* Table Head */}
            <thead className='bg-amber-50 border-b border-amber-100'>
              <tr>
                <th className='px-5 py-4 text-left text-xs font-black uppercase tracking-wider text-amber-900'>
                  #
                </th>
                <th className='px-5 py-4 text-left text-xs font-black uppercase tracking-wider text-amber-900'>
                  Name
                </th>
                <th className='px-5 py-4 text-left text-xs font-black uppercase tracking-wider text-amber-900'>
                  Value
                </th>
                <th className='px-5 py-4 text-left text-xs font-black uppercase tracking-wider text-amber-900'>
                  Date Added
                </th>
                <th className='px-5 py-4 text-right text-xs font-black uppercase tracking-wider text-amber-900'>
                  Actions
                </th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className='divide-y divide-zinc-100 bg-white'>
              {records.map((record, index) => (
                <tr
                  key={record.id}
                  className='group hover:bg-amber-50/60 transition-colors'
                >
                  <td className='px-5 py-4 font-semibold text-zinc-400'>
                    {index + 1}
                  </td>

                  <td className='px-5 py-4 font-semibold text-zinc-800'>
                    {record.name}
                  </td>

                  <td className='px-5 py-4 font-bold text-amber-600'>
                    {record.value}
                  </td>

                  <td className='px-5 py-4 text-zinc-500'>
                    {new Date(record.date).toLocaleDateString('en-GB')}
                  </td>

                  <td className='px-5 py-4 text-right space-x-2 opacity-90 group-hover:opacity-100 transition'>
                    <button
                      onClick={() => startEdit(record.id)}
                      className='px-3 py-1.5 rounded-lg text-xs font-bold bg-blue-100 text-blue-700 hover:bg-blue-200 active:scale-95 transition cursor-pointer'
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteRecord(record.id)}
                      className='px-3 py-1.5 rounded-lg text-xs font-bold bg-red-100 text-red-600 hover:bg-red-200 active:scale-95 transition cursor-pointer'
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer Actions */}
        <div className='flex justify-end px-5 py-4 border-t border-zinc-100 bg-zinc-50/50'>
          <button
            onClick={clearAllRecords}
            className='px-4 py-2 rounded-xl text-sm font-bold text-red-600 bg-red-50 hover:bg-red-100 border border-red-100 transition active:scale-[0.97] cursor-pointer'
          >
            Clear All Records
          </button>
        </div>
      </div>
    </>
  )
}

export default RecordList
