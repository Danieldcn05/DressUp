import React, { useEffect, useState } from 'react';
import { FaUser, FaCalendar, FaArrowLeft, FaArrowRight, FaRedhat } from "react-icons/fa";
import { GoHeartFill } from "react-icons/go";
import { IoShirtSharp, IoAddOutline } from "react-icons/io5";
import { PiPantsFill } from "react-icons/pi";
import { GiConverseShoe } from "react-icons/gi";
import { RiHandbagFill } from "react-icons/ri";
import { NavLink } from 'react-router-dom';
import { ClotheCard } from '../clotheCard/ClotheCard';
import { OutfitCard } from '../outfitCard/OutfitCard';
import { Modal } from '../../modal/Modal';
import { GuardarEnStorage } from '../utils/guardarEnStorage';
import './Home.css';
import '../../modal/Modal.css';
import { fetcher } from '../../fetcher/fetcher.js';

export const Home = () => {
    const [clothes, setClothes] = useState([]);
    const [showClothes, setShowClothes] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    const fetchClothes = async () => {
      try {
          const response = await fetcher("clothes/", "GET"); // Usamos fetcher para obtener las prendas
          
          if (!response.ok) {
              throw new Error("Error al obtener las prendas");
          }

          const data = await response.json();
          setClothes(data);
      } catch (error) {
          console.error("Error al obtener las prendas:", error);
      } finally {
          setLoading(false); // Al terminar la carga, cambiamos el estado de loading
      }
  };

    useEffect(() => {
        fetchClothes();
    }, []);

    const addClothe = (newClothe) => {
        setClothes(prevClothes => {
            const lastId = prevClothes.length > 0 ? prevClothes[prevClothes.length - 1].id : 0;
            const updatedClothe = { ...newClothe, id: lastId + 1 };
            GuardarEnStorage("clothes", updatedClothe);
            return [...prevClothes, updatedClothe];
        });
    };

    return (
        <div className='home'>
            <header>
                <div className='user'>
                    <FaUser className='userIcon'/>
                    <h1>Carmen</h1>
                    <NavLink to="/calendar"><FaCalendar className='calendarIcon'/></NavLink>
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
                    <IoShirtSharp className='filtroIcon'/>
                    <PiPantsFill className='filtroIcon'/>
                    <GiConverseShoe className='filtroIcon'/>
                    <FaRedhat className='filtroIcon'/>
                    <RiHandbagFill className='filtroIcon'/>
                    <FaArrowRight className='flechaIcon'/>
                </div>
                {showClothes 
                    ? <ClotheCard clothes={clothes} setClothes={setClothes}/> 
                    : <OutfitCard/>
                }
            </section>
            <div className='add'>
                {!showClothes 
                    ? <NavLink to="/newoutfit"><IoAddOutline className='addIcon'/></NavLink> 
                    : <IoAddOutline className='addIcon' onClick={() => setIsModalOpen(true)}/>
                }
                {isModalOpen && (<Modal setIsModalOpen={setIsModalOpen} addClothe={addClothe}/>)}
            </div>
        </div>
    );
};
