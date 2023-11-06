import { Routes, Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useState } from 'react'

//pages
import Register from './Pages/Register'
import Login from './Pages/Login'

function App() {

  return (
    <Routes>
      <Route path='/' element={<h1>home</h1>} />
      <Route path='/register' element={<Register/>} />
      <Route path='/login' element={<Login/>} />
    </Routes>
  )
}

export default App
