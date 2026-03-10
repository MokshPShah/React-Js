import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addProduct, updateProduct } from '../redux/inventorySlice'

const ProductForm = ({ existingProduct = null, onClose }) => {
  const dispatch = useDispatch()
  const { status } = useSelector(state => state.inventory)
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    stock: ''
  })

  useEffect(() => {
    if (existingProduct) {
      setFormData({
        name: existingProduct.name,
        category: existingProduct.category,
        price: existingProduct.price,
        stock: existingProduct.stock
      })
    } else {
      setFormData({
        name: '',
        category: '',
        price: '',
        stock: ''
      })
    }
  }, [existingProduct])

  const handleChange = e => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async e => {
    e.preventDefault()

    const productPayload = {
      ...formData,
      price: parseFloat(formData.price) || 0,
      stock: parseInt(formData.stock, 10) || 0
    }

    if (existingProduct) {
      await dispatch(
        updateProduct({ id: existingProduct.id, updatedData: productPayload })
      )
    } else {
      await dispatch(addProduct(productPayload))
    }

    if (onClose) onClose()
  }

  return (
    <div className='bg-white p-6 rounded-lg shadow-md max-w-md w-full border border-gray-200'>
      <h2 className='text-xl font-bold text-gray-800 mb-4'>
        {existingProduct ? 'Edit Product' : 'Add New Product'}
      </h2>

      <form onSubmit={handleSubmit} className='space-y-4'>
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1'>
            Product Name
          </label>
          <input
            type='text'
            name='name'
            value={formData.name}
            onChange={handleChange}
            required
            className='w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
            placeholder='e.g., Wireless Mouse'
          />
        </div>

        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1'>
            Category
          </label>
          <input
            type='text'
            name='category'
            value={formData.category}
            onChange={handleChange}
            required
            className='w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
            placeholder='e.g., Electronics'
          />
        </div>

        <div className='flex gap-4'>
          <div className='flex-1'>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Price ($)
            </label>
            <input
              type='number'
              name='price'
              value={formData.price}
              onChange={handleChange}
              required
              min='0'
              step='0.01'
              className='w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
              placeholder='0.00'
            />
          </div>

          <div className='flex-1'>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Stock Quantity
            </label>
            <input
              type='number'
              name='stock'
              value={formData.stock}
              onChange={handleChange}
              required
              min='0'
              step='1'
              className='w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
              placeholder='0'
            />
          </div>
        </div>

        <div className='flex justify-end gap-3 mt-6'>
          <button
            type='button'
            onClick={onClose}
            className='px-4 py-2 text-gray-700 bg-gray-100 rounded hover:bg-gray-200 transition-colors cursor-pointer'
          >
            Cancel
          </button>
          <button
            type='submit'
            disabled={status === 'loading'}
            className='px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 transition-colors disabled:opacity-50 cursor-pointer'
          >
            {status === 'loading' ? 'Saving...' : 'Save Product'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default ProductForm
