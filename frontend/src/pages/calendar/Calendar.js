import React, { useState } from 'react';
import './Calendar.css';
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { NavLink } from 'react-router-dom';

export const Calendar = () => {
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

  const mes = monthData[currentMonth].name;
  const days = monthData[currentMonth].days;

  return (
    <div className="calendar-container">
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
          <li key={i + 1}><time dateTime={`${currentYear}-${currentMonth + 1}-${i + 1}`}>{i + 1}</time></li>
        ))}
      </ul>

      <div className="calendar-navigation">

      </div>
    </div>
  );
};