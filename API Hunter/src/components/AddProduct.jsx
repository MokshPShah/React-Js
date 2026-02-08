import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addProduct } from '../features/productSlice'
import { BsCashStack } from 'react-icons/bs'
import { MdOutlineCategory } from 'react-icons/md'
import { SiSubtitleedit } from 'react-icons/si'
import { toast } from 'react-toastify'

const AddProduct = () => {
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    productName: '',
    price: '',
    category: ''
  })

  const handleFormData = e => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async e => {
    e.preventDefault()

    if (!formData.productName || !formData.price || !formData.category) {
      toast.error('Please fill in all fields!')
      return
    }

    const newProduct = {
      id: Date.now().toString(),
      name: formData.productName,
      price: Number(formData.price),
      category: formData.category
    }

    try {
      await dispatch(addProduct(newProduct)).unwrap()

      toast.success('Product added successfully')

      setFormData({
        productName: '',
        price: '',
        category: ''
      })
    } catch (error) {
      toast.error(`Failed to add product: ${error.message}`)
    }
  }

  return (
    <>
      <div className='bg-white p-6 rounded-md shadow w-full mx-5'>
        <h3 className='text-2xl lg:text-4xl font-bold capitalize'>
          add product
        </h3>

        <form onSubmit={handleSubmit}>
          <div className='grid grid-cols-1 lg:grid-cols-5 mt-6 gap-5'>
            {/* Product Name Input */}
            <div
              className={`group border border-gray-200 px-3 py-4 rounded-md duration-300
                    flex items-center gap-2 lg:col-span-2
                    ${
                      formData.productName
                        ? 'bg-white ring ring-emerald-400'
                        : 'bg-gray-200'
                    }
                    focus-within:bg-white focus-within:border-emerald-600 focus-within:ring-2 focus-within:ring-emerald-600`}
            >
              <SiSubtitleedit />
              <input
                type='text'
                name='productName'
                value={formData.productName}
                onChange={handleFormData}
                placeholder='Enter the product name'
                className='w-full border-0 outline-0 bg-transparent'
              />
            </div>

            {/* Price Input */}
            <div
              className={`group border border-gray-200 px-3 py-4 rounded-md duration-300
                    flex items-center gap-2
                    ${
                      formData.price
                        ? 'bg-white ring ring-emerald-400'
                        : 'bg-gray-200'
                    }
                    focus-within:bg-white focus-within:border-emerald-600 focus-within:ring-2 focus-within:ring-emerald-600`}
            >
              <BsCashStack />
              <input
                type='number'
                name='price'
                value={formData.price}
                onChange={handleFormData}
                placeholder='Enter price'
                className='w-full border-0 outline-0 bg-transparent'
              />
            </div>

            {/* Category Input */}
            <div
              className={`group border border-gray-200 px-3 py-4 rounded-md duration-300
                    flex items-center gap-2
                    ${
                      formData.category
                        ? 'bg-white ring ring-emerald-400'
                        : 'bg-gray-200'
                    }
                    focus-within:bg-white focus-within:border-emerald-600 focus-within:ring-2 focus-within:ring-emerald-600`}
            >
              <MdOutlineCategory />
              <input
                type='text'
                name='category'
                value={formData.category}
                onChange={handleFormData}
                placeholder='Enter category'
                className='w-full border-0 outline-0 bg-transparent'
              />
            </div>

            {/* Submit Button */}
            <button
              type='submit'
              className='bg-emerald-700 hover:bg-emerald-600 text-white px-2 py-3 rounded-md cursor-pointer transition-colors shadow-sm'
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default AddProduct
