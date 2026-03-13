import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { uploadFile } from '../redux/slice/fileSlice'

const UploadFile = () => {
  const dispatch = useDispatch()
  const uploadStatus = useSelector(state => state.files.status)

  const [file, setFile] = useState(null)
  const [category, setCategory] = useState('Personal')
  const [description, setDescription] = useState('')

  const handleFileChange = e => {
    if (e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      alert("Please select a file first!");
      return;
    }

    if (file.size > 2097152) {
      alert("File is too large! Please upload a file smaller than 2MB.");
      return;
    }

    const metadata = { category, description };

    try {
      await dispatch(uploadFile({ file, metadata })).unwrap();
      setFile(null);
      setCategory('Personal');
      setDescription('');
      document.getElementById('file-upload').value = ''; 
      alert("Upload successful!");
    } catch (error) {
      console.error("Failed to upload file: ", error);
      alert("Upload failed. Check console for details.");
    }
  };

  return (
    <div className='max-w-md w-full mx-auto p-6 bg-white rounded-xl shadow-md border border-gray-100'>
      <h2 className='text-2xl font-bold text-gray-800 mb-6'>Upload Document</h2>

      <form onSubmit={handleUpload} className='space-y-4'>
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1'>
            Select File
          </label>
          <input
            id='file-upload'
            type='file'
            onChange={handleFileChange}
            className='block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100 cursor-pointer'
          />
        </div>

        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1'>
            Category
          </label>
          <select
            value={category}
            onChange={e => setCategory(e.target.value)}
            className='w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500'
          >
            <option value='Personal'>Personal</option>
            <option value='Academic'>Academic</option>
            <option value='Office'>Office</option>
            <option value='Certificates'>Certificates</option>
          </select>
        </div>

        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1'>
            Description (Optional)
          </label>
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder='Add a short description...'
            className='w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500'
            rows='3'
          ></textarea>
        </div>

        <button
          type='submit'
          disabled={uploadStatus === 'loading'}
          className={`w-full py-2 px-4 rounded-md text-white font-semibold transition-colors cursor-pointer
            ${
              uploadStatus === 'loading'
                ? 'bg-blue-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
        >
          {uploadStatus === 'loading' ? 'Uploading...' : 'Upload File'}
        </button>
      </form>
    </div>
  )
}

export default UploadFile
