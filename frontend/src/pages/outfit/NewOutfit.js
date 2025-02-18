import React, { useState, useEffect } from 'react';
import './NewOutfit.css';
import Carousel from './carousel/Carousel';

const clothes = [
  { id: 1, name: "Camisa Roja", image: "https://picsum.photos/id/237/200/300", tag: "Parte de arriba" },
  { id: 2, name: "Pantalón Negro", image: "https://picsum.photos/id/238/200/300", tag: "Parte de abajo" },
  { id: 3, name: "Chaqueta Azul", image: "https://picsum.photos/id/239/200/300", tag: "Parte de arriba" },
  { id: 4, name: "Zapatos Blancos", image: "https://picsum.photos/id/232/200/300", tag: "Zapatillas" },
  { id: 5, name: "Sudadera Gris", image: "https://picsum.photos/id/240/200/300", tag: "Parte de arriba" },
  { id: 6, name: "Pantalón de Chándal", image: "https://picsum.photos/id/241/200/300", tag: "Parte de abajo" },
  { id: 7, name: "Blusa Verde", image: "https://picsum.photos/id/242/200/300", tag: "Parte de arriba" },
  { id: 8, name: "Falda Roja", image: "https://picsum.photos/id/243/200/300", tag: "Parte de abajo" },
  { id: 9, name: "Bota Negra", image: "https://picsum.photos/id/244/200/300", tag: "Zapatillas" },
  { id: 10, name: "Sombrero de Paja", image: "https://picsum.photos/id/199/200/300", tag: "Complemento" },
  { id: 11, name: "Camiseta Blanca", image: "https://picsum.photos/id/200/200/300", tag: "Parte de arriba" },
  { id: 12, name: "Pantalón Vaquero", image: "https://picsum.photos/id/247/200/300", tag: "Parte de abajo" },
  { id: 13, name: "Gafas de Sol", image: "https://picsum.photos/id/248/200/300", tag: "Complemento" },
  { id: 14, name: "Botines Marrones", image: "https://picsum.photos/id/249/200/300", tag: "Zapatillas" },
  { id: 15, name: "Chaqueta de Cuero", image: "https://picsum.photos/id/250/200/300", tag: "Parte de arriba" },
  { id: 16, name: "Mochila de Cuero", image: "https://picsum.photos/id/251/200/300", tag: "Complemento" },
  { id: 17, name: "Camisa de Rayas", image: "https://picsum.photos/id/252/200/300", tag: "Parte de arriba" },
  { id: 18, name: "Pantalón Corto", image: "https://picsum.photos/id/253/200/300", tag: "Parte de abajo" },
  { id: 19, name: "Zapatillas Deportivas", image: "https://picsum.photos/id/254/200/300", tag: "Zapatillas" },
  { id: 20, name: "Bufanda de Lana", image: "https://picsum.photos/id/255/200/300", tag: "Complemento" },
]

export const NewOutfit = () => {
  const [selectedItems, setSelectedItems] = useState({
    "Parte de arriba": null,
    "Parte de abajo": null,
    "Zapatillas": null,
    "Complemento": null
  });

  const handleItemSelected = (id, tag) => {
    setSelectedItems(prevSelectedItems => ({
      ...prevSelectedItems,
      [tag]: id
    }));
  };

  useEffect(() => {
    console.log("Selected items:", selectedItems);
  }, [selectedItems]);

  return (
    <>
      <div className="carousel-cont">
        <Carousel items={clothes} onItemSelected={(id) => handleItemSelected(id, "Parte de arriba")} filter={"Parte de arriba"} />
        <Carousel items={clothes} onItemSelected={(id) => handleItemSelected(id, "Parte de abajo")} filter={"Parte de abajo"} />
        <Carousel items={clothes} onItemSelected={(id) => handleItemSelected(id, "Zapatillas")} filter={"Zapatillas"}/>
        <Carousel items={clothes} onItemSelected={(id) => handleItemSelected(id, "Complemento")} filter={"Complemento"}/>
      </div>
    </>
  )
}