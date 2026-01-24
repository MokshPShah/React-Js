import { useState } from 'react'
import { CheckCircle, SendHorizontal, Trash2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { addTask, removeTask, toggleTask } from '../task/TaskSlice'
import toast, { Toaster } from 'react-hot-toast'

const TaskList = () => {
  const dispatch = useDispatch()
  const tasks = useSelector(state => state.tasks.tasks) || []
  const [task, setTask] = useState('')

  const handleSubmit = e => {
    e.preventDefault()
    if (!task.trim()) {
      toast.error('Please Enter a task')
      return
    }

    dispatch(
      addTask({
        id: Date.now(),
        text: task,
        completed: false
      })
    )
    setTask('')
    toast.success('Task added successfully')
  }

  const handleToggle = id => {
    dispatch(toggleTask(id))
    toast.success('Task Updated', {
      icon: <CheckCircle size={18} className='text-green-800' />
    })
  }

  const handleRemove = id => {
    dispatch(removeTask(id))
    toast.error('Task deleted permanently', {
      icon: <Trash2 size={18} className='text-red-300' />,
      style: { borderRadius: '10px', background: '#7f1d1d', color: '#fff' }
    })
  }

  const confirmDelete = id => {
    toast(
      t => (
        <div className='flex items-center gap-3'>
          <Trash2 size={18} className='text-red-500' />

          <span className='text-sm'>Delete this task?</span>

          <div className='flex gap-2 ml-2'>
            <button
              onClick={() => {
                handleRemove(id)
                toast.dismiss(t.id)
              }}
              className='px-2 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600'
            >
              Delete
            </button>

            <button
              onClick={() => toast.dismiss(t.id)}
              className='px-2 py-1 text-xs bg-gray-200 rounded hover:bg-gray-300'
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      {
        duration: 6000
      }
    )
  }

  return (
    <div className='w-full max-w-lg bg-white rounded-xl p-5 shadow-md'>

      {/* Toast Position */}
      <Toaster position='top-right' reverseOrder={false} />

      {/* Heading */}
      <div className='text-center mb-5 space-y-1'>
        <h1 className='text-xl md:text-3xl font-semibold text-orange-600 font-ubuntu'>
          Task Manager
        </h1>
        <p className='text-gray-400 font-medium'>Focus on what matters today</p>
      </div>

      {/* Input Form */}
      <form
        onSubmit={handleSubmit}
        className='group flex items-center justify-between w-full p-1 border border-orange-400 rounded-lg transition-all duration-300 focus-within:border-orange-500 focus-within:ring-1 focus-within:ring-orange-500 font-playwrite'
      >
        <input
          type='text'
          value={task}
          onChange={e => setTask(e.target.value)}
          className='w-full px-3 py-2 border-0 outline-none text-gray-700 bg-transparent placeholder:text-gray-400'
          placeholder='Write your tasks here...'
        />

        <button
          type='submit'
          aria-label='Add Task'
          title='Add Task'
          className='bg-orange-500 text-white py-3 px-4 rounded-lg hover:bg-orange-600 active:scale-95 cursor-pointer transition-all duration-300 flex items-center justify-center'
        >
          <SendHorizontal size={20} />
        </button>
      </form>

      {/* Tasks List */}
      <div className='space-y-3 my-3'>
        {tasks.map(t => (
          <div
            className='px-4 py-3 bg-orange-50 border border-orange-100 rounded-lg flex items-center justify-between group/item hover:border-orange-200 transition-colors'
            key={t.id}
          >
            <div className='flex items-center gap-3'>
              <input
                type='checkbox'
                onChange={() => handleToggle(t.id)}
                checked={t.completed}
                className='w-5 h-5 accent-green-500 cursor-pointer'
              />

              <span
                onClick={() => handleToggle(t.id)}
                className={`font-medium transition-all cursor-pointer ${
                  t.completed ? 'line-through text-gray-400' : 'text-gray-700'
                }`}
              >
                {t.text}
              </span>
            </div>

            <button
              className='text-red-400 hover:text-red-600 transition-colors duration-300 cursor-pointer'
              onClick={() => confirmDelete(t.id)}
              title='Delete Task'
            >
              <Trash2 size={18} />
            </button>
          </div>
        ))}

        {tasks.length === 0 && (
          <div className='text-center text-gray-400 mt-6 space-y-2'>
            <CheckCircle
              size={25}
              className='mx-auto text-orange-400 inline-flex me-2 mt-1'
            />
            <span className='capitalize'>no tasks yet, add one above</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default TaskList
