import React, { useState, useEffect } from 'react';
import './ClotheCard.css';

export const ClotheCard = () => {
  const [clothes, setClothesFromAPI] = useState([]);

  // Cargar las prendas desde el localStorage al montar el componente
  useEffect(() => {
    const storedClothes = JSON.parse(localStorage.getItem("clothes")); // Leer las prendas desde localStorage
    if (storedClothes && Array.isArray(storedClothes)) {
      setClothesFromAPI(storedClothes); // Actualizar el estado con las prendas
    } else {
      console.log("No hay prendas en el localStorage");
    }
  }, []); // El array vacío [] hace que se ejecute solo una vez al montar el componente

  // Función para eliminar una prenda
  const RemoveClothe = (id) => {
    const updatedClothes = clothes.filter(clothe => clothe.id !== id); // Filtramos la prenda eliminada
    setClothesFromAPI(updatedClothes); // Actualizamos el estado con la lista filtrada
    localStorage.setItem("clothes", JSON.stringify(updatedClothes)); // Guardamos las prendas actualizadas en localStorage
  };

  return (
    <div className='datos'>
      {clothes.length > 0 ? (
        clothes.map(clothe => (
          <div key={clothe.id} className='clothe-card'>
            <img
              src={clothe.img} 
              alt={clothe.name}
              className="clothe-image"
            />
            <h3>{clothe.name}</h3>
            <p>{clothe.tags && clothe.tags.map(tag => tag.name).join(', ')}</p>
            <button onClick={() => RemoveClothe(clothe.id)}>Eliminar</button>
          </div>
        ))
      ) : (
        <p>No hay prendas disponibles.</p> // Mensaje en caso de que no haya prendas
      )}
    </div>
  );
};
