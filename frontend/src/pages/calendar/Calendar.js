import React, { useState } from 'react';
import './Calendar.css';  

export const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth()); 
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear()); 

  const monthNames = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

  const daysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate(); 
  };

  const nextMonth = () => {
    setCurrentMonth((prevMonth) => (prevMonth === 11 ? 0 : prevMonth + 1));
    if (currentMonth === 11) {
      setCurrentYear((prevYear) => prevYear + 1);
    }
  };

  const prevMonth = () => {
    setCurrentMonth((prevMonth) => (prevMonth === 0 ? 11 : prevMonth - 1));
    if (currentMonth === 0) {
      setCurrentYear((prevYear) => prevYear - 1); 
    }
  };

  return (
    <div className="calendar-container">
      <h2 className="calendar-header">Calendario</h2>
    
      <div className="calendar-navigation">
        <button onClick={prevMonth} className="nav-button">
          Anterior
        </button>
        <span className="month-label">{`${monthNames[currentMonth]} ${currentYear}`}</span>
        <button onClick={nextMonth} className="nav-button">
          Siguiente
        </button>
      </div>

      <div className="days-container">
        {[...Array(daysInMonth(currentMonth, currentYear))].map((_, index) => {
          const day = index + 1;
          return (
            <div
              key={day}
              className={`day-box ${day % 7 === 0 || (day + 1) % 7 === 0 ? 'weekend' : ''}`}
            >
              {day}
            </div>
          );
        })}
      </div>
    </div>
  );
};

