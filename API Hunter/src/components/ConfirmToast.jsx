import React from 'react'
import { HiCheck, HiX, HiExclamationCircle } from 'react-icons/hi'

const ConfirmToast = ({ closeToast, message, onConfirm }) => {
  const handleConfirm = () => {
    onConfirm()
    closeToast()
  }

  return (
    <div className='min-w-[250px] p-1'>
      <div className='flex items-start gap-3'>
        {/* Warning Icon Container */}
        <div className='flex-shrink-0'>
          <HiExclamationCircle className='w-6 h-6 text-amber-500' />
        </div>

        <div className='flex-1'>
          <p className='text-sm font-medium text-gray-900 leading-5'>
            {message || 'Are you sure you want to perform this action?'}
          </p>

          <div className='flex items-center gap-3 mt-3'>
            <button
              onClick={handleConfirm}
              className='inline-flex items-center gap-1.5 bg-indigo-600 text-white px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-indigo-700 active:scale-95 transition-all shadow-sm'
            >
              <HiCheck className='w-4 h-4' />
              Confirm
            </button>

            <button
              onClick={closeToast}
              className='inline-flex items-center gap-1.5 text-gray-500 hover:text-gray-700 px-2 py-1.5 rounded-lg text-xs font-medium hover:bg-gray-100 transition-all'
            >
              <HiX className='w-4 h-4' />
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConfirmToast
