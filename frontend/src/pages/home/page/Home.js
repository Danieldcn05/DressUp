import React, { useState } from 'react'
import { FaUser } from "react-icons/fa"
import { FaCalendar } from "react-icons/fa"
import { GoHeartFill } from "react-icons/go"
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { IoShirtSharp } from "react-icons/io5";
import { PiPantsFill } from "react-icons/pi";
import { GiConverseShoe } from "react-icons/gi";
import { FaRedhat } from "react-icons/fa";
import { RiHandbagFill } from "react-icons/ri";
import { IoAddOutline } from "react-icons/io5";
import { ClotheCard } from '../clotheCard/ClotheCard';
import { OutfitCard } from '../outfitCard/OutfitCard';
import './Home.css'



export const Home = () => {

  const allClothes = 
  [
    { 'id': 1, 'nombre': 'Prenda 1', 'tag': 'T-shirt' },
    { 'id': 2, 'nombre': 'Prenda 2', 'tag': 'Shoe' },
    { 'id': 3, 'nombre': 'Prenda 3', 'tag': 'T-shirt' },
    { 'id': 4, 'nombre': 'Prenda 4', 'tag': 'Hat' },
    { 'id': 5, 'nombre': 'Prenda 5', 'tag': 'Pant' }
  ];

  const [clothes, setClothes] = useState(allClothes);
  const [showClothes, setShowClothes] = useState(true);
  const [selectedTag, setSelectedTag] = useState(null);

  const filtrarPrendas = (tag) => {
    if (selectedTag === tag) {
      setClothes(allClothes);
      setSelectedTag(null);
    } else {
      const prendas_filtradas = allClothes.filter(clothe => clothe.tag === tag);
      setClothes(prendas_filtradas);
      setSelectedTag(tag);
    }
  }

  return (
    <div className='home'>
        <header>
          <div className='user'>
            <FaUser className='userIcon'/>
            <h1>Carmen</h1>
            <FaCalendar className='calendarIcon'/>
          </div>
          <div className='info'>
            <p className={showClothes ? 'selected' : ''} onClick={() => setShowClothes(true)}>185 prendas</p>
            <p className={!showClothes ? 'selected' : ''} onClick={() => setShowClothes(false)}>23 Outfits</p>
          </div>
        </header>
        <section>
            <div className='search'>
              <input type='text' placeholder='Buscar...'/>
              <GoHeartFill className='heartIcon'/>
            </div>
            <div className='filtro'>
              <FaArrowLeft className='flechaIcon'/>
              <IoShirtSharp className='filtroIcon' onClick={() => filtrarPrendas('T-shirt')}/>
              <PiPantsFill className='filtroIcon' onClick={() => filtrarPrendas('Pant')}/>
              <GiConverseShoe className='filtroIcon' onClick={() => filtrarPrendas('Shoe')}/>
              <FaRedhat className='filtroIcon' onClick={() => filtrarPrendas('Hat')}/>
              <RiHandbagFill className='filtroIcon' onClick={() => filtrarPrendas('Bag')}/>
              <FaArrowRight className='flechaIcon'/>
            </div>
            {showClothes 
            ? <ClotheCard clothes={clothes}/> : <OutfitCard/>
            }
        </section>
        <div className='add'>
          <IoAddOutline className='addIcon'/>
        </div>
    </div>
  )
}

