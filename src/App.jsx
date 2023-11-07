import { Routes, Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useState } from 'react'

//pages
import Register from './Pages/Register'
import Login from './Pages/Login'
import { Navbar } from 'react-bootstrap'
import MyNavbar from './components/MyNavbar'
import List from './Pages/List'
import Homepage from './components/Homepage'

function App() {

  return (
    <div>
      <MyNavbar />
      <Routes>
        <Route path='/' element={<Homepage/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/book/list' element={<List />} />
      </Routes>
    </div>
  )
}

export default App
