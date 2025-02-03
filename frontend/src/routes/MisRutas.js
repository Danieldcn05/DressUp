import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { Calendar } from '../pages/calendar/Calendar'
import { NewOutfit } from '../pages/outfit/NewOutfit'
import { Home } from '../pages/home/page/Home'
import { Error } from '../core/pagesCore/Error'

export const MisRutas = () => {
  return (
    <div>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Navigate to='/Home'/>}/>
                <Route path='/home' element={<Home/>}/>
                <Route path='/calendar' element={<Calendar/>}/>
                <Route path='/newoutfit' element={<NewOutfit/>}/>
                <Route path='*' element={<Error/>}/>
            </Routes>
        </BrowserRouter>
    </div>
  )
}