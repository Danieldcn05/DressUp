import React, { useState, useEffect, useRef } from "react";
import "./Carousel.css";

const Carousel = ({ items, onItemSelected }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const prevIndexRef = useRef();

  useEffect(() => {
    prevIndexRef.current = currentIndex;
  });

  const prevIndex = prevIndexRef.current;

  useEffect(() => {
    if (onItemSelected && items.length > 0 && prevIndex !== currentIndex) {
      onItemSelected(items[currentIndex].id);
    }
  }, [currentIndex, items, onItemSelected, prevIndex]);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? items.length - 1 : prevIndex - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === items.length - 1 ? 0 : prevIndex + 1));
  };

  if (items.length === 0) {
    return <div>No items available</div>;
  }

  //console.log("Current image URL:", items[currentIndex].img); // Log para verificar la URL de la imagen

  return (

    <div className="carousel-container">

      <button className="arrow prev" onClick={prevSlide}>&#10094;</button>
      <div className="carousel-slide">
        <img src={items[currentIndex].img} alt={items[currentIndex].name} onError={(e) => { e.target.src = 'https://picsum.photos/id/237/200/300'; }} />
      </div>
      <button className="arrow next" onClick={nextSlide}>&#10095;</button>
    </div>

  );
};

export default Carousel;