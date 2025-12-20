import React, { useEffect, useState } from 'react'
import RecordList from './components/RecordList'
import RecordForm from './components/RecordForm'

const STORAGE_KEY = 'localbox_miner_records'

const getRecordsFormStorage = () => {
  const data = localStorage.getItem(STORAGE_KEY)

  return data ? JSON.parse(data) : []
}

const saveRecordsToStorage = records => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(records))
}

const App = () => {
  const [records, setRecords] = useState(getRecordsFormStorage)
  const [isEditing, setIsEditing] = useState(false)
  const [currentRecord, setCurrentRecord] = useState(null)

  useEffect(() => {
    saveRecordsToStorage(records)
  }, [records])

  const addRecord = newRecord => {
    const recordWithId = {
      ...newRecord,
      id: Date.now(),
      date: new Date().toISOString().split('T')[0]
    }

    setRecords(prevRecords => [...prevRecords, recordWithId])
  }

  const updateRecord = updatedRecord => {
    setRecords(prevRecords =>
      prevRecords.map(record =>
        record.id === updatedRecord.id ? updatedRecord : record
      )
    )

    setIsEditing(false)
    setCurrentRecord(null)
  }

  const deleteRecord = id => {
    if (confirm('Are you sure you want to delete this record?')) {
      setRecords(prevRecords => prevRecords.filter(record => record.id !== id))
    }
  }

  const clearAllRecords = id => {
    if (confirm('WARNING: this will delete all your records. Continue?')) {
      setRecords([])
    }
  }

  const edit = id => {
    const recordToEdit = records.find(record => record.id === id)

    if (recordToEdit) {
      setIsEditing(true)
      setCurrentRecord(recordToEdit)
    }
  }

  const cancelEdit = () => {
    setIsEditing(false)
    setCurrentRecord(null)
  }

  const totalRecords = records.length
  const lastAddedRecord = records[records.length - 1]

  return (
    <>
      <div className='min-h-screen bg-linear-to-bl from-amber-300 to-yellow-100 text-zinc-900 p-6 sm:p-12 font-sans'>
        <div className='max-w-4xl mx-auto space-y-8'>
          {/* Header Section */}
          <header className='text-center space-y-2'>
            <h1 className='text-4xl md:text-5xl font-black tracking-tight text-amber-900 animate-bounce'>
              LocalBox Miner
            </h1>
          </header>

          {/* Dashboard Summary */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-0 bg-white border border-zinc-200 rounded-2xl shadow-sm overflow-hidden'>
            <div className='flex flex-col items-center md:items-start p-6 border-b md:border-b-0 md:border-r border-zinc-100 bg-white'>
              <strong className='text-zinc-400 uppercase text-xs tracking-widest mb-1'>
                Total Records
              </strong>
              <span className='text-4xl font-bold text-amber-600'>
                {totalRecords}
              </span>
            </div>
            <div className='flex flex-col items-center md:items-start p-6 bg-zinc-50/50'>
              <strong className='text-zinc-400 uppercase text-xs tracking-widest mb-1'>
                Last Added
              </strong>
              <span className='text-xl font-semibold text-amber-700 truncate max-w-full'>
                {lastAddedRecord ? lastAddedRecord.name : 'N/A'}
              </span>
            </div>
          </div>

          {/* Form Container */}
          <section className='bg-white rounded-2xl p-8 border border-zinc-200 shadow-sm'>
            <RecordForm
              isEditing={isEditing}
              currentRecord={currentRecord}
              addRecord={addRecord}
              updateRecord={updateRecord}
              cancelEdit={cancelEdit}
            />
          </section>

          {/* List Container Placeholder */}
          <section className='bg-white rounded-2xl border border-zinc-200 shadow-sm overflow-hidden text-amber-600'>
            <RecordList
              records={records}
              startEdit={edit}
              deleteRecord={deleteRecord}
              clearAllRecords={clearAllRecords}
            />
          </section>
        </div>
      </div>
    </>
  )
}

export default App
