import { useState, useEffect } from 'react'
import RecordList from './components/RecordList'
import RecordForm from './components/RecordForm'
import './App.css'

// --- Local Storage Key ---
const STORAGE_KEY = 'localbox_miner_records'

// --- Helper Functions for Local Storage ---
const getRecordsFromStorage = () => {
  const data = localStorage.getItem(STORAGE_KEY)
  return data ? JSON.parse(data) : []
}

const saveRecordsToStorage = records => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(records))
}

function App () {
  const [records, setRecords] = useState(getRecordsFromStorage)
  const [isEditing, setIsEditing] = useState(false)
  const [currentRecord, setCurrentRecord] = useState(null) 
  
  // Sync state to localStorage whenever 'records' changes
  useEffect(() => {
    saveRecordsToStorage(records)
  }, [records])

  // --- CRUD Operations ---

  const addRecord = newRecord => {
    const recordWithId = {
      ...newRecord,
      id: Date.now(), // Simple unique ID
      date: new Date().toLocaleDateString()
    }
    setRecords(prevRecords => [...prevRecords, recordWithId])
  }

  const updateRecord = updatedRecord => {
    setRecords(prevRecords =>
      prevRecords.map(record =>
        record.id === updatedRecord.id ? updatedRecord : record
      )
    )
    // Reset form after update
    setIsEditing(false)
    setCurrentRecord(null)
  }

  const deleteRecord = id => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      setRecords(prevRecords => prevRecords.filter(record => record.id !== id))
    }
  }

  const clearAllRecords = () => {
    if (
      window.confirm(
        'WARNING: This will permanently delete all records. Continue?'
      )
    ) {
      setRecords([])
    }
  }

  // --- Edit Mode Handlers ---

  const startEdit = id => {
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

  // --- Dashboard Summary Data ---
  const totalRecords = records.length
  const lastAddedRecord = records[records.length - 1]

  return (
    <div className='app-container'>
      <h1>LocalBox Miner ⛏️</h1>
      <p className='subtitle'>
        Offline Data Management Demo (React + LocalStorage)
      </p>

      <div className='dashboard-summary'>
        <div>
          <strong>Total Records:</strong> <span>{totalRecords}</span>
        </div>
        <div>
          <strong>Last Added:</strong>{' '}
          <span>{lastAddedRecord ? lastAddedRecord.name : 'N/A'}</span>
        </div>
      </div>

      <RecordForm
        isEditing={isEditing}
        currentRecord={currentRecord}
        addRecord={addRecord}
        updateRecord={updateRecord}
        cancelEdit={cancelEdit}
      />

      <RecordList
        records={records}
        startEdit={startEdit}
        deleteRecord={deleteRecord}
        clearAllRecords={clearAllRecords}
      />
    </div>
  )
}

export default App
