import React, { useState, useEffect } from 'react';
import './Calendar.css';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { NavLink } from 'react-router-dom';
import OutfitList from './outfitList/OutfitList';
import { fetcher } from '../fetcher/fetcher.js';
import { IoAddOutline } from "react-icons/io5";
import CalendarOutfitModal from './calendar_outfit_modal/CalendarOutfitModal';


export const Calendar = () => {

  const [key, setKey] = useState(0);
  const [selectedOutfitId, setSelectedOutfitId] = useState(null);

  const reloadComponent = () => {

    setKey(prevKey => prevKey + 1);
  };

  const monthData = [
    { name: "Enero", days: 31 },
    { name: "Febrero", days: 28 },
    { name: "Marzo", days: 31 },
    { name: "Abril", days: 30 },
    { name: "Mayo", days: 31 },
    { name: "Junio", days: 30 },
    { name: "Julio", days: 31 },
    { name: "Agosto", days: 31 },
    { name: "Septiembre", days: 30 },
    { name: "Octubre", days: 31 },
    { name: "Noviembre", days: 30 },
    { name: "Diciembre", days: 31 }
  ];

  const d = new Date();
  const [currentMonth, setCurrentMonth] = useState(d.getMonth());
  const [currentYear, setCurrentYear] = useState(d.getFullYear());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [dates, setDates] = useState([]);
  const [isOutfitModalOpen, setIsOutfitModalOpen] = useState(false); // Estado para el modal de outfit


  // Fetch de outfits
  const fetchOutfitDates = async () => {
    try {
      const response = await fetcher("outfit_planner/", "GET");
      if (!response.ok) {
        throw new Error("Error al obtener los outfits");
      }
      let data = await response.json();

 
      setDates(data);


    } catch (error) {
      console.error("Error al obtener los outfits:", error);
    }
  };

  useEffect(() => {
    fetchOutfitDates();
  }, [key]);


  const handlePreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const openModal = (day) => {
    setSelectedDate(`${day} de ${monthData[currentMonth].name} ${currentYear}`);
    setIsModalOpen(true);
  };

  const closeModal = async () => {
    await fetchOutfitDates(); // Espera a que fetchOutfitDates termine
    reloadComponent(); // Luego recarga el componente

    setIsModalOpen(false);
    setSelectedDate(null);
  };

  const openOutfitModal = (date) => {
    const outfit = dates.find(dateObj => dateObj.date === date);
    setSelectedDate(date);
    setSelectedOutfitId(outfit ? outfit.id : null); // Establece el ID del outfit seleccionado
    setIsOutfitModalOpen(true);
  };

  const closeOutfitModal = () => {
    setIsOutfitModalOpen(false);
    setSelectedDate(null);
    setSelectedOutfitId(null); 
  };

  const mes = monthData[currentMonth].name;
  const days = monthData[currentMonth].days;

  return (
    <div key={key} className="calendar-container">
      <NavLink to="/home" className="back-link">
        <IoIosArrowBack className='back' />
      </NavLink>

      <div className='title-cont'>
        <IoIosArrowBack onClick={handlePreviousMonth} className='button previous' />
        <h1 className='title'>{mes + ' ' + currentYear}</h1>
        <IoIosArrowForward onClick={handleNextMonth} className='button next' />
      </div>

      <ul className='calendar-grid'>
        {Array.from({ length: days }, (_, i) => (
          <React.Fragment key={i + 1}>
            <li>
              <time dateTime={`${currentYear}-${currentMonth + 1}-${i + 1}`}>{i + 1}</time>
              {dates.some(date => date.date === `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(i + 1).padStart(2, '0')}`)
                ? <div className="has-outfit" onClick={() => openOutfitModal(`${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(i + 1).padStart(2, '0')}`)}>
                    {dates.find(date => date.date === `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(i + 1).padStart(2, '0')}`).outfit}
                  </div>
                : <IoAddOutline className='add-outfit-icon' onClick={() => openModal(i + 1)} />}

            </li>
          </React.Fragment>
        ))}
      </ul>

      {isModalOpen && (
        <OutfitList
          isOpen={isModalOpen}
          onClose={closeModal}
          selectedDate={selectedDate}
          date={`${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(selectedDate.split(' ')[0]).padStart(2, '0')}`}
        />
      )}

      {isOutfitModalOpen && (
        <CalendarOutfitModal
          isOpen={isOutfitModalOpen}
          onClose={closeOutfitModal}
          id={selectedOutfitId}
        />
      )}
    </div>
  );
};