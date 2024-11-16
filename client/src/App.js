import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Chat from './Pages/Chat'
import { Login } from './Pages/Login'
import Signup from './Pages/Signup'
import ProtectedRoutes from './utils/ProtectedRoutes'
 
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ProtectedRoutes />}>
          <Route path='/' element={<Home />} />
          <Route path='/chat/:id' element={<Chat />} />
        </Route>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App