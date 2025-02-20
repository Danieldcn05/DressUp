import React, { useState, useEffect } from 'react';
import { fetcher } from '../../fetcher/fetcher';
import { OutfitCard } from "../../home/outfitCard/OutfitCard";

const CalendarOutfitModal = ({ isOpen, onClose, id }) => {
  const [outfitData, setOutfitData] = useState(null);

  useEffect(() => {
    if (isOpen && id) {
      const getOutfitPlanner = async () => {
        try {
          const response = await fetcher(`outfit_planner/${id}/`, "GET");
          const data = await response.json();
          try {
            
            const response = await fetcher(`outfit/${data.outfit}/`, "GET");
            const dataOutfit = await response.json();
              
              setOutfitData(dataOutfit);
              
          } catch (error) {
            console.error("Error fetching outfit data:", error);
          }
        } catch (error) {
          console.error("Error fetching outfit data:", error);
        }
      };

      getOutfitPlanner();

      
    }
  }, [isOpen, id]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>X</button>
        <h2>Outfit</h2>
        {outfitData ? (
          <div>
        <OutfitCard outfit={outfitData} />
          </div>
        ) : (
          <p>Cargando...</p>
        )}
      </div>
    </div>
  );
};

export default CalendarOutfitModal;