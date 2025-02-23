import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { Calendar } from '../pages/calendar/Calendar'
import { NewOutfit } from '../pages/outfit/NewOutfit'
import { Home } from '../pages/home/page/Home'
import { Error } from '../core/pagesCore/Error'
import { Footer } from '../pages/footer/Footer'
import { Login } from '../pages/login/Login'
import { Register } from '../pages/register/Register'

export const MisRutas = () => {
  return (
    <div>
        <BrowserRouter>
        
          <Routes>
              <Route path='/' element={<Navigate to='/login'/>}/>
              <Route path='/home' element={<Home/>}/>
              <Route path='/calendar' element={<Calendar/>}/>
              <Route path='/newoutfit' element={<NewOutfit/>}/>
              <Route path='/login' element={<Login/>}/>
              <Route path='/register' element={<Register/>}/>
              <Route path='*' element={<Error/>}/>
          </Routes>
        
        <Footer/>
        </BrowserRouter>
    </div>
  )
}