'use client';

import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import {
  format, addDays, startOfWeek, isSameDay,
} from 'date-fns';
import ClassCard from './ClassCard';

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const renderWeekDays = (
  startOfWeekDate: Date,
  activeDay: Date,
  setActiveDay: (date: Date) => void,
) => days.map((day, index) => {
  const date = addDays(startOfWeekDate, index);
  const isActiveDay = isSameDay(activeDay, date);

  return (
    <button
      key={format(date, 'yyyy-MM-dd')}
      type="button"
      className={`flex flex-col items-center w-full p-2 rounded-lg ${isActiveDay ? 'bg-seafoam text-white' : 'bg-gray-200'}`}
      onClick={() => setActiveDay(date)}
    >
      <span className="text-sm font-semibold">{day}</span>
      <span
        className={`w-6 h-6 rounded-full flex items-center text-xs justify-center mt-2 ${
          isActiveDay ? 'bg-white text-seafoam' : 'bg-seafoam text-white'
        }`}
      >
        {date.getDate()}
      </span>
    </button>
  );
});

type SetActiveDayFunction = React.Dispatch<React.SetStateAction<Date>>;

const renderWeekSlides = (
  numberOfWeeks: number,
  activeDay: Date,
  setActiveDay: SetActiveDayFunction,
) => {
  const weeks = [...Array(numberOfWeeks)].map((_, index) => {
    const startOfWeekDate = startOfWeek(addDays(new Date(), (index - numberOfWeeks / 2) * 7));

    return (
      <SwiperSlide key={format(startOfWeekDate, 'yyyy-MM-dd')} className="w-full h-auto">
        <div className="flex space-x-3 justify-center">{renderWeekDays(startOfWeekDate, activeDay, setActiveDay)}</div>
      </SwiperSlide>
    );
  });

  return weeks;
};

export default function Schedule() {
  const [activeSlide, setActiveSlide] = useState(26);
  const [activeDay, setActiveDay] = useState(new Date());

  const weekDifference = activeSlide - 26;
  const plural = activeSlide === 27 || activeSlide === 25 ? '' : 's';
  let weekTitle;
  if (weekDifference < 0) {
    weekTitle = `${Math.abs(weekDifference)} Week${plural} Ago`;
  } else if (weekDifference > 0) {
    weekTitle = `In ${weekDifference} Week${plural}`;
  } else {
    weekTitle = 'This Week';
  }

  return (
    <div className="flex flex-col items-start p-2 mt-2 bg-white shadow-md rounded-lg w-full ">
      <div className="flex w-full justify-between">
        <h2 className="text-sm font-bold mb-5 p-2">{weekTitle}</h2>
        <span className="text-sm font-semibold mb-5 p-2">View Calendar</span>
      </div>
      <Swiper
        initialSlide={26} // Start from the current week
        slidesPerView={1}
        spaceBetween={16}
        freeMode
        pagination={{
          clickable: true,
        }}
        onSlideChange={(swiper) => {
          const direction = swiper.activeIndex > activeSlide ? 7 : -7;
          setActiveSlide(swiper.activeIndex);
          setActiveDay(addDays(activeDay, direction));
        }}
        className="w-full h-full"
      >
        {renderWeekSlides(52, activeDay, setActiveDay)}
        {' '}
        {/* Display 52 weeks */}
        <ClassCard />
      </Swiper>
    </div>
  );
}
