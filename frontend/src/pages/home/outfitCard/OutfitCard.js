import React, { useEffect, useState } from 'react';
import './OutfitCard.css'
import { IoTrash } from "react-icons/io5";
import { fetcher } from '../../fetcher/fetcher.js';

export const OutfitCard = ({ outfit, fetchOutfits }) => {

    const [prendas, setPrendas] = useState([]);

    const deleteOutfits = async () => {
        const response = await fetcher(`outfit/delete/${outfit.id}`, 'DELETE');
        console.log(response);
        fetchOutfits();
    }

    const getPrendas = async () => {

        for (let i = 0; i < outfit.Garments.length; i++) {
            const response = await fetcher('clothes/' + outfit.Garments[i] + "/", 'GET');
            const data = await response.json();
            console.log(data);
            setPrendas(prev => [...prev, data]);
        }

        
    }

    useEffect(() => {
        getPrendas();
    }, []);

    return (
        <div className='outfit-card'>
            {prendas.map((prenda, index) => (
                <img key={index} src={prenda.img} alt={prenda.name} className='prenda-img'/>
            ))}
            
            <IoTrash className='trash' onClick={deleteOutfits}/>
        </div>
    )
}