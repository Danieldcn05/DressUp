import React, { useState, useEffect, useRef } from "react";
import "./Carousel.css";

const Carousel = ({ items, onItemSelected, filter }) => {
  const filteredItems = items.filter(item => item.tag === filter);
  const [currentIndex, setCurrentIndex] = useState(0);
  const prevIndexRef = useRef();

  useEffect(() => {
    prevIndexRef.current = currentIndex;
  });

  const prevIndex = prevIndexRef.current;

  useEffect(() => {
    if (onItemSelected && filteredItems.length > 0 && prevIndex !== currentIndex) {
      onItemSelected(filteredItems[currentIndex].id, filter);
    }
  }, [currentIndex, filteredItems, onItemSelected, filter, prevIndex]);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? filteredItems.length - 1 : prevIndex - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === filteredItems.length - 1 ? 0 : prevIndex + 1));
  };

  if (filteredItems.length === 0) {
    return <div>No items available</div>;
  }

  return (
    <div className="carousel-container">
      <button className="arrow prev" onClick={prevSlide}>&#10094;</button>
      <div className="carousel-slide">
        <img src={filteredItems[currentIndex].image} alt={filteredItems[currentIndex].name} />
        
      </div>
      <button className="arrow next" onClick={nextSlide}>&#10095;</button>
    </div>
  );
};

export default Carousel;