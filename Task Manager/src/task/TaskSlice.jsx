import { createSlice } from '@reduxjs/toolkit'

const taskSlice = createSlice({
  name: 'Task Manager',
  initialState: {
    tasks: []
  },
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload)
    },
    toggleTask: (state, action) => {
      const Task = state.tasks.find(t => t.id === action.payload)
      if (Task) {
        Task.completed = !Task.completed
      }
    },
    removeTask: (state, action) => {
      state.tasks = state.tasks.filter(t => t.id !== action.payload)
    }
  }
})

export const { addTask, toggleTask, removeTask } = taskSlice.actions
export default taskSlice.reducer
