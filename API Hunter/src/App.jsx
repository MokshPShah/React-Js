import React from 'react'
import AddProduct from './components/AddProduct'
import ViewProduct from './components/viewProduct'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  return (
    <>
      <div className='min-h-screen bg-gray-100 flex flex-col items-center py-10'>
        <ToastContainer position='top-right' autoClose={3000} />

        <div className='w-full max-w-6xl px-4'>
          <h1 className='text-4xl font-bold text-center text-gray-800 mb-10'>
            Product Dashboard
          </h1>

          {/* Add Product Section */}
          <div className='mb-10 flex justify-center'>
            <AddProduct />
          </div>

          {/* View Product Section */}
          <div className='border-t border-gray-300 pt-10'>
            <h2 className='text-3xl font-bold text-gray-700 mb-6 text-center'>
              Current Inventory
            </h2>
            <ViewProduct />
          </div>
        </div>
      </div>
    </>
  )
}

export default App
