'use client';

import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { format, addDays, startOfWeek } from 'date-fns';

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const renderWeekDays = (startOfWeekDate: Date) => days.map((day, index) => {
  const date = addDays(startOfWeekDate, index);
  const isToday = new Date().setHours(0, 0, 0, 0) === date.getTime();

  return (
    <div
      key={format(date, 'yyyy-MM-dd')}
      className={`flex flex-col items-center p-3 rounded-lg ${isToday ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
    >
      <span className="text-sm font-semibold">{day}</span>
      <span
        className={`w-6 h-6 rounded-full flex items-center justify-center mt-2 ${isToday ? 'bg-white text-blue-500' : 'bg-blue-500 text-white'}`}
      >
        {date.getDate()}
      </span>
    </div>
  );
});

const renderWeekSlides = (numberOfWeeks: number) => [...Array(numberOfWeeks)].map((_, index) => {
  const startOfWeekDate = startOfWeek(addDays(new Date(), (index - numberOfWeeks / 2) * 7));

  return (
    <SwiperSlide key={format(startOfWeekDate, 'yyyy-MM-dd')} className="w-full h-auto">
      <div className="flex space-x-3 justify-center">{renderWeekDays(startOfWeekDate)}</div>
    </SwiperSlide>
  );
});

export default function Schedule() {
  const [activeSlide, setActiveSlide] = useState(26); // Set the initial slide to the current week

  return (
    <div className="flex flex-col items-start p-5 bg-white shadow-md rounded-lg w-full ">
      <h2 className="text-xl font-bold mb-5">Week View</h2>
      <Swiper
        initialSlide={26} // Start from the current week
        slidesPerView={1}
        spaceBetween={16}
        freeMode
        pagination={{
          clickable: true,
        }}
        onSlideChange={(swiper) => setActiveSlide(swiper.activeIndex)}
        className="w-full h-auto"
      >
        {renderWeekSlides(52)}
        {' '}
        {/* Display 52 weeks */}
      </Swiper>
    </div>
  );
}
