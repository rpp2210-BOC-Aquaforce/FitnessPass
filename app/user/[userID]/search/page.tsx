'use client';

import { useEffect, useState } from 'react';

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

type ValuePiece = Date | null;

export default function Search() {
  const [searchByClass, setSearchByClass] = useState('');
  const [searchByLocation, setSearchByLocation] = useState('');
  const [selectedDate, setSelectedDate] = useState<ValuePiece|[ValuePiece, ValuePiece]>(new Date());

  const [showCalendar, setShowCalendar] = useState<boolean>(false);

  useEffect(() => {
    console.log('searchByClass', searchByClass);
    console.log('searchByLocation', searchByLocation);
    console.log('showCalendar', showCalendar);
  }, []);

  const handleDateChange = (date: ValuePiece|[ValuePiece, ValuePiece]) => {
    setSelectedDate(date);
    setShowCalendar(false);
  };

  const search = () => {
    console.log('searchByClass', searchByClass);
    console.log('searchByLocation', searchByLocation);
  };

  return (
    <div className="text-black">
      <div className="flex">
        <input
          placeholder="Yoga, Pilates, Zumba..."
          onChange={(e) => setSearchByClass(e.target.value)}
          onFocus={() => setShowCalendar(false)}
        />
        <input
          placeholder={searchByLocation}
          value={searchByLocation}
          onChange={(e) => setSearchByLocation(e.target.value)}
          onFocus={() => setShowCalendar(false)}
        />
      </div>
      <div className="flex">
        <input
          className="text-black text-center"
          value={selectedDate instanceof Date
            ? selectedDate.toISOString().split('T')[0]
            : ''}
          onFocus={() => setShowCalendar(true)}
          onChange={() => setShowCalendar(false)}
        />
        <button type="button" className="bg-blue-500 text-white" onClick={search}>GO</button>
      </div>
      {showCalendar ? (
        <div>
          <Calendar
            className="fixed"
            calendarType="US"
            minDate={new Date()}
            value={selectedDate}
            onChange={handleDateChange}
          />
        </div>
      ) : ''}
    </div>
  );
}
