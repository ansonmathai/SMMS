import React, { useState, useEffect } from 'react';
import './DateTimeDisplay.css';

const DateTimeDisplay = () => {
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setDateTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="date-time-display">
      <div className="time">{dateTime.toLocaleTimeString()}</div>
      <div className="date-day-container">
        <div className="date">{dateTime.toLocaleDateString()}</div>
        <div className="day">{dateTime.toLocaleDateString('en-US', { weekday: 'long' })}</div>
      </div>
    </div>
  );
};

export default DateTimeDisplay;
