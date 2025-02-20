import React, { useState, useEffect, useRef } from "react";
import "./Carousel.css";

const Carousel = ({ items, onItemSelected, filter, selectedItemId }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const prevIndexRef = useRef();
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    if (filter) {
      setFilteredItems(items.filter(item => item.tags.includes(filter)));
    } else {
      setFilteredItems(items);
    }
  }, [items, filter]);

  useEffect(() => {
    prevIndexRef.current = currentIndex;
  });

  const prevIndex = prevIndexRef.current;

  useEffect(() => {
    if (onItemSelected && filteredItems.length > 0 && prevIndex !== currentIndex) {
      onItemSelected(filteredItems[currentIndex].id);
    }
  }, [currentIndex, filteredItems, onItemSelected, prevIndex]);

  useEffect(() => {
    if (selectedItemId) {
      const newIndex = filteredItems.findIndex(item => item.id === selectedItemId);
      if (newIndex !== -1) {
        setCurrentIndex(newIndex);
      }
    }
  }, [selectedItemId, filteredItems]);

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
        <img className="carousel-img" src={filteredItems[currentIndex].img} alt={filteredItems[currentIndex].name} onError={(e) => { e.target.src = 'https://picsum.photos/id/237/200/300'; }} />
      </div>
      <button className="arrow next" onClick={nextSlide}>&#10095;</button>
    </div>
  );
};

export default Carousel;