import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteProduct } from '../redux/inventorySlice'

const InventoryTable = ({ onEdit }) => {
  const dispatch = useDispatch()
  const { items, status, error } = useSelector(state => state.inventory)

  const LOW_STOCK_THRESHOLD = 10

  if (status === 'loading' && items.length === 0) {
    return <div className='text-center p-4'>Loading inventory...</div>
  }

  if (status === 'failed') {
    return <div className='text-red-500 text-center p-4'>Error: {error}</div>
  }

  return (
    <>
      <div className='overflow-x-auto bg-white rounded-lg shadow mt-6'>
        <table className='min-w-full text-left text-sm text-gray-600'>
          <thead className='bg-gray-100 text-gray-800 uppercase font-semibold'>
            <tr>
              <th className='px-6 py-4'>Product Name</th>
              <th className='px-6 py-4'>Category</th>
              <th className='px-6 py-4'>Price</th>
              <th className='px-6 py-4'>Stock</th>
              <th className='px-6 py-4'>Actions</th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-200'>
            {items.map(product => (
              <tr
                key={product.id}
                className={
                  product.stock < LOW_STOCK_THRESHOLD
                    ? 'bg-red-50'
                    : 'hover:bg-gray-50'
                }
              >
                <td className='px-6 py-4 font-medium text-gray-900'>
                  {product.name}
                </td>
                <td className='px-6 py-4'>{product.category}</td>
                <td className='px-6 py-4'>
                  ${Number(product.price).toFixed(2)}
                </td>
                <td className='px-6 py-4'>
                  <span
                    className={`px-2 py-1 rounded text-xs font-bold ${
                      product.stock < LOW_STOCK_THRESHOLD
                        ? 'bg-red-200 text-red-800'
                        : 'bg-green-100 text-green-800'
                    }`}
                  >
                    {product.stock}
                  </span>
                </td>
                <td className='px-6 py-4 space-x-3'>
                  <button
                    onClick={() => onEdit(product)}
                    className='text-blue-600 hover:text-blue-800 font-semibold cursor-pointer'
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => dispatch(deleteProduct(product.id))}
                    className='text-red-600 hover:text-red-800 font-semibold cursor-pointer'
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr>
                <td colSpan='5' className='px-6 py-8 text-center text-gray-500'>
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default InventoryTable
