import React from 'react';
import './ClotheCard.css';

export const ClotheCard = ({ clothes, setClothes }) => {

  const RemoveClothe = async (id) => {
    try {
      const response = await fetch(`https://localhost:8000/clothes/delete/${id}/`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, 
        },
      });

      if (response.ok) {
        setClothes(prevClothes => prevClothes.filter(clothe => clothe.id !== id)); 
      } else {
        console.error("Error al eliminar la prenda:", await response.text());
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  return (
    <div className='datos'>
      {clothes.map(clothe => (
        <article key={clothe.id}>
          <img src={`http://127.0.0.1:8000${clothe.img}`} alt={clothe.nombre} className="clothe-image" />
          <h3>{clothe.name}</h3>
          <p>{clothe.tags.map(tag => tag.name).join(', ')}</p> 
          <button onClick={() => RemoveClothe(clothe.id)}>Eliminar</button>
        </article>
      ))}
    </div>
  );
};
