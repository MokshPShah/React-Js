import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFiles } from '../redux/slice/fileSlice';
import FileCard from './FileCard';

const FileList = () => {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.files);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchFiles());
    }
  }, [status, dispatch]);

  if (status === 'loading') {
    return <div className="text-center py-10 text-gray-500">Loading your documents...</div>;
  }

  if (status === 'failed') {
    return <div className="text-center py-10 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">Your Documents</h2>
      
      {items.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-300">
          <p className="text-gray-500">No documents uploaded yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map((file) => (
            <FileCard key={file.id} file={file} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FileList;