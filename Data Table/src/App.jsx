import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import AddEmployee from './pages/AddEmployee'
import ViewEmployee from './pages/ViewEmployee'
import Navbar from './Components/Navbar'
import EditEmployee from './pages/EditEmployee'

function App () {
  return (
    <>
      <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/add' element={<AddEmployee />} />
          <Route path='/view' element={<ViewEmployee />} />
          <Route path='/edit' element={<EditEmployee />} />
        </Routes>
    </>
  )
}

export default App
