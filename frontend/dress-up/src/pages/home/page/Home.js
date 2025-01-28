import React from 'react'
import { FaUser } from "react-icons/fa"
import { FaCalendar } from "react-icons/fa"
import { GoHeartFill } from "react-icons/go"
import './Home.css'

export const Home = () => {
  return (
    <div className='home'>
        <header>
          <div className='user'>
            <FaUser className='userIcon'/>
            <h1>Carmen</h1>
            <FaCalendar className='calendarIcon'/>
          </div>
          <div className='info'>
            <p>185 prendas</p>
            <p>23 Outfits</p>
          </div>
        </header>
        <section>
            <div className='search'>
              <input type='text' placeholder='Buscar...'/>
              <GoHeartFill className='heartIcon'/>
            </div>
            <div className='filtro'>

            </div>
        </section>
    </div>
  )
}

