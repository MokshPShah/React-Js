import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts, deleteProduct, updateProduct } from '../features/productSlice'
import { toast } from 'react-toastify'
import { FiEdit2, FiTrash2, FiSave, FiX } from 'react-icons/fi'
import ConfirmToast from './ConfirmToast'

const ViewProduct = () => {
  const dispatch = useDispatch()
  const { items, loading, error } = useSelector((state) => state.products)
  
  const [editId, setEditId] = useState(null)
  const [editFormData, setEditFormData] = useState({
    name: '',
    price: '',
    category: ''
  })

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])


  const handleDelete = (id) => {
    const confirmDelete = async () => {
      try {
        await dispatch(deleteProduct(id)).unwrap()
        toast.success("Product deleted successfully!", { autoClose: 2000 })
      } catch (err) {
        toast.error("Failed to delete product")
      }
    }

    toast(<ConfirmToast message="Delete this product?" onConfirm={confirmDelete} />, {
      position: "top-center",
      autoClose: false,
      closeOnClick: false,
      closeButton: false,
      draggable: false,
    })
  }


  const handleEditClick = (product) => {
    setEditId(product.id)
    setEditFormData(product)
  }

  const handleUpdate = async () => {
    try {
      await dispatch(updateProduct(editFormData)).unwrap()
      toast.success("Product updated successfully!")
      setEditId(null)
    } catch (err) {
      toast.error("Failed to update product")
    }
  }

  const getCategoryColor = (category) => {
    const colors = [
      'bg-blue-50 text-blue-600',
      'bg-purple-50 text-purple-600',
      'bg-orange-50 text-orange-600',
      'bg-emerald-50 text-emerald-600'
    ]
    return colors[category.length % colors.length] || colors[0]
  }

  if (loading) return <div className="flex justify-center p-10"><div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div></div>
  if (error) return <p className="text-center mt-10 text-red-500">Error: {error}</p>

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6'>
      
      {items.map((product) => (
        <div 
          key={product.id} 
          className='bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 p-6 flex flex-col justify-between border border-gray-100 relative'
        >
          {editId === product.id ? (
            <div className='flex flex-col gap-3'>
               <div className='flex justify-between items-center mb-2'>
                  <span className='text-xs font-bold text-gray-400 uppercase'>Editing</span>
                  <button onClick={() => setEditId(null)} className='text-gray-400 hover:text-gray-600'><FiX /></button>
               </div>
              <input 
                name="name" 
                value={editFormData.name} 
                onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })} 
                className="border border-gray-200 bg-gray-50 p-2 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none" 
                placeholder="Name"
              />
              <input 
                name="price" 
                type="number"
                value={editFormData.price} 
                onChange={(e) => setEditFormData({ ...editFormData, price: e.target.value })} 
                className="border border-gray-200 bg-gray-50 p-2 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none" 
                placeholder="Price"
              />
              <input 
                name="category" 
                value={editFormData.category} 
                onChange={(e) => setEditFormData({ ...editFormData, category: e.target.value })} 
                className="border border-gray-200 bg-gray-50 p-2 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none" 
                placeholder="Category"
              />
              <button 
                onClick={handleUpdate}
                className='mt-2 w-full bg-black text-white py-2 rounded-lg text-sm font-medium hover:bg-gray-800 flex items-center justify-center gap-2'
              >
                <FiSave /> Save Changes
              </button>
            </div>
          ) : (
            <>
              <div>
                <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-4 ${getCategoryColor(product.category)}`}>
                  {product.category}
                </span>

                <h3 className='text-lg font-bold text-gray-800 leading-tight mb-2 line-clamp-2'>
                  {product.name}
                </h3>

                <div className='text-3xl font-extrabold text-gray-900 mb-6'>
                  ${Number(product.price).toFixed(2)}
                </div>
              </div>

              <div className='border-t border-gray-100 pt-4 flex items-center justify-between mt-auto'>
                <button 
                  onClick={() => handleEditClick(product)}
                  className='flex items-center gap-2 text-gray-400 hover:text-blue-600 font-medium text-sm transition-colors group'
                >
                  <FiEdit2 className='w-4 h-4' /> 
                  <span className='group-hover:translate-x-0.5 transition-transform'>Edit</span>
                </button>
                
                <button 
                  onClick={() => handleDelete(product.id)}
                  className='flex items-center gap-2 text-gray-400 hover:text-red-500 font-medium text-sm transition-colors group'
                >
                  <FiTrash2 className='w-4 h-4' /> 
                  <span className='group-hover:translate-x-0.5 transition-transform'>Delete</span>
                </button>
              </div>
            </>
          )}
        </div>
      ))}


    </div>
  )
}

export default ViewProduct