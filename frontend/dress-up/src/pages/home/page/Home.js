import React from 'react'
import { FaUser } from "react-icons/fa";
import { FaCalendar } from "react-icons/fa";
import { GoHeartFill } from "react-icons/go";

export const Home = () => {
  return (
    <div className='home'>
        <header>
            <FaUser/>
            <h1>Carmen</h1>
            <FaCalendar/>
            <p>185 prendas</p>
            <p>23 Outfits</p>
        </header>
        <section>
            <div className='buscador'>
              <input type='text' placeholder='Buscar...'/>
              <GoHeartFill/>
            </div>
            <div className='filtro'>

            </div>
        </section>
    </div>
  )
}

