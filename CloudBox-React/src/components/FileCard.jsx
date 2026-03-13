import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { deleteFile, updateFileMetadata } from '../redux/slice/fileSlice'

const convertFileToBase64 = file => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
  })
}

const FileCard = ({ file }) => {
  const dispatch = useDispatch()
  const [isEditing, setIsEditing] = useState(false)
  const [newFile, setNewFile] = useState(null)
  const [editData, setEditData] = useState({
    name: file.name,
    category: file.category || 'Personal',
    description: file.description || ''
  })

  const formatBytes = (bytes, decimals = 2) => {
    if (!+bytes) return '0 Bytes'
    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
  }

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${file.name}"?`)) {
      dispatch(deleteFile(file.id))
    }
  }

  const handleFileChange = e => {
    if (e.target.files[0]) {
      setNewFile(e.target.files[0])
      setEditData(prev => ({ ...prev, name: e.target.files[0].name }))
    }
  }

  const handleSave = async () => {
    let updatedData = { ...editData }

    if (newFile) {
      if (newFile.size > 2097152) {
        alert('New file is too large!')
        return
      }

      try {
        const base64Data = await convertFileToBase64(newFile)
        updatedData = {
          ...updatedData,
          name: newFile.name,
          type: newFile.type,
          size: newFile.size,
          url: base64Data
        }
      } catch (error) {
        console.error('Failed to process new file: ', error)
        alert('Error processing new file.')
        return
      }
    }

    dispatch(
      updateFileMetadata({
        id: file.id,
        updatedData
      })
    )
    setIsEditing(false)
    setNewFile(null)
  }

  const handleCancel = () => {
    setEditData({
      name: file.name,
      category: file.category || 'Personal',
      description: file.description || ''
    })
    setNewFile(null)
    setIsEditing(false)
  }

  const isImage = file.type.startsWith('image/')
  const originalPreview = isImage ? (
    <img
      src={file.url}
      alt={file.name}
      className='w-full h-full object-cover'
    />
  ) : (
    <div className='text-gray-400 flex flex-col items-center'>
      <svg
        className='w-12 h-12 mb-2'
        fill='none'
        stroke='currentColor'
        viewBox='0 0 24 24'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth='2'
          d='M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z'
        ></path>
      </svg>
      <span className='text-xs font-semibold uppercase'>
        {file.type.split('/')[1] || 'FILE'}
      </span>
    </div>
  )

  return (
    <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow flex flex-col h-full'>
      <div
        className={`h-32 bg-gray-100 rounded-lg mb-4 flex items-center justify-center overflow-hidden relative ${
          isEditing ? 'border-2 border-dashed border-blue-300' : ''
        }`}
      >
        {isEditing && (
          <div className='absolute inset-0 bg-blue-50/70 flex items-center justify-center'>
            <input
              type='file'
              onChange={handleFileChange}
              className='absolute inset-0 w-full h-full opacity-0 cursor-pointer'
              id={`file-edit-${file.id}`}
            />
            <div className='text-center p-2 text-blue-700'>
              <svg
                className='w-8 h-8 mx-auto mb-1'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12'
                ></path>
              </svg>
              <p className='text-xs font-semibold'>
                {newFile ? 'New file selected' : 'Click to change file'}
              </p>
            </div>
          </div>
        )}
        {newFile && newFile.type.startsWith('image/') ? (
          <img
            src={URL.createObjectURL(newFile)}
            alt='new preview'
            className='w-full h-full object-cover'
          />
        ) : (
          originalPreview
        )}
      </div>
      <div className='flex-grow'>
        {isEditing ? (
          <div className='space-y-2 mt-1'>
            <input
              type='text'
              value={editData.name}
              onChange={e => setEditData({ ...editData, name: e.target.value })}
              className='w-full text-sm border border-blue-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500'
              placeholder='File Name'
            />
            <select
              value={editData.category}
              onChange={e =>
                setEditData({ ...editData, category: e.target.value })
              }
              className='w-full text-sm border border-blue-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500'
            >
              <option value='Personal'>Personal</option>
              <option value='Academic'>Academic</option>
              <option value='Office'>Office</option>
              <option value='Certificates'>Certificates</option>
            </select>
            <textarea
              value={editData.description}
              onChange={e =>
                setEditData({ ...editData, description: e.target.value })
              }
              className='w-full text-sm border border-blue-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500'
              placeholder='Description'
              rows='2'
            />
            <p className='text-xs text-gray-500'>
              Old Size: {formatBytes(file.size)}
            </p>
            {newFile && (
              <p className='text-xs text-gray-600 font-medium'>
                New Size: {formatBytes(newFile.size)}
              </p>
            )}
          </div>
        ) : (
          <>
            <h3
              className='font-semibold text-gray-800 truncate'
              title={file.name}
            >
              {file.name}
            </h3>
            <span className='inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full mt-1 mb-2'>
              {file.category}
            </span>
            <p className='text-xs text-gray-500 mb-1'>
              Size: {formatBytes(file.size)}
            </p>
            <p className='text-xs text-gray-500 truncate'>{file.description}</p>
          </>
        )}
      </div>
      <div className='mt-4 flex space-x-2 pt-3 border-t border-gray-100'>
        {isEditing ? (
          <>
            <button
              onClick={handleSave}
              className='flex-1 py-1.5 bg-green-500 hover:bg-green-600 text-white text-sm font-medium rounded transition-colors'
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className='flex-1 py-1.5 bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm font-medium rounded transition-colors'
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setIsEditing(true)}
              className='flex-1 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-600 text-sm font-medium rounded transition-colors cursor-pointer'
            >
              Edit
            </button>
            <a
              href={file.url}
              download={file.name}
              className='flex-1 text-center py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded transition-colors cursor-pointer'
            >
              Download
            </a>
            <button
              onClick={handleDelete}
              className='flex-1 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 text-sm font-medium rounded transition-colors cursor-pointer'
            >
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default FileCard
