import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { Calendar } from '../components/Calendar'
import { NewOutfit } from '../components/NewOutfit'
import { Home } from '../components/Home'
import { Error } from '../components/Error'

export const MisRutas = () => {
  return (
    <div>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Navigate to='/home'/>}/>
                <Route path='/home' element={<Home/>}/>
                <Route path='/calendar' element={<Calendar/>}/>
                <Route path='/newoutfit' element={<NewOutfit/>}/>
                <Route path='*' element={<Error/>}/>
            </Routes>
        </BrowserRouter>
    </div>
  )
}