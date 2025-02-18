import React, { useEffect, useState } from 'react';
import { FaUser, FaCalendar } from "react-icons/fa";
import { IoAddOutline } from "react-icons/io5";
import { NavLink } from 'react-router-dom';
import { ClotheCard } from '../clotheCard/ClotheCard';
import { OutfitCard } from '../outfitCard/OutfitCard';
import { Modal } from '../../modal/Modal';
import { GuardarEnStorage } from '../utils/guardarEnStorage';
import './Home.css';
import '../../modal/Modal.css';
import { fetcher } from '../../fetcher/fetcher.js';
import { Searcher } from '../searcher/Searcher';

export const Home = () => {
    const [clothes, setClothes] = useState([]);
    const [showClothes, setShowClothes] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    const tagsClothes = [
        { value: "t-shirt", label: "T-shirt" },
        { value: "pant", label: "Pant" },
        { value: "hat", label: "Hat" },
        { value: "shoe", label: "Shoe" },
        { value: "bag", label: "Bag" },
        { value: "dress", label: "Dress" }
    ];
    
    const tagsOutfits = [
        { value: "winter", label: "Winter" },
        { value: "summer", label: "Summer" },
        { value: "casual", label: "Casual" },
        { value: "formal", label: "Formal" },
        { value: "beach", label: "Beach" }
    ];

    const fetchClothes = async () => {
        try {
            const response = await fetcher("clothes/", "GET");
            if (!response.ok) {
                throw new Error("Error al obtener las prendas");
            }
            const data = await response.json();
            console.log(data); // Verifica la respuesta del servidor
            setClothes(data);
        } catch (error) {
            console.error("Error al obtener las prendas:", error);
        } finally {
            setLoading(false);
        }
    };
    

    useEffect(() => {
        // Intentar cargar prendas desde el localStorage primero
        const savedClothes = JSON.parse(localStorage.getItem("clothes"));
        if (savedClothes) {
            setClothes(savedClothes);
        } else {
            fetchClothes(); // Si no hay prendas guardadas, hacer la petición al servidor
        }
    }, []);
    

    const addClothe = (newClothe) => {
        setClothes(prevClothes => {
            const lastId = prevClothes.length > 0 ? prevClothes[prevClothes.length - 1].id : 0;
            const updatedClothe = { ...newClothe, id: lastId + 1 };
            // Guardar todas las prendas actualizadas en el localStorage
            localStorage.setItem("clothes", JSON.stringify([...prevClothes, updatedClothe]));
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
                {showClothes 
                    ? <Searcher tagsCategory={tagsClothes} /> 
                    : <Searcher tagsCategory={tagsOutfits} />
                }
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
