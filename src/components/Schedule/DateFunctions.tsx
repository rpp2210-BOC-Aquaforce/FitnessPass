'use client';

import { UserClass } from '@/lib/types';
import { SwiperSlide } from 'swiper/react';
import {
  format, addDays, isSameDay, startOfWeek,
} from 'date-fns';

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
type SetActiveDayFunction = React.Dispatch<React.SetStateAction<Date>>;

export const parseLocalDate = (dateString: string) => {
  const [year, month, day] = dateString.split('-').map(Number);
  // Note: JavaScript counts months from 0 (January is 0, February is 1, etc.)
  return new Date(year, month - 1, day);
};

export const getScheduledDates = (userClasses: UserClass[]) => {
  const scheduledDates = new Set();
  userClasses.forEach((userClass) => {
    const classDate = parseLocalDate(userClass.classes.date);
    scheduledDates.add(format(classDate, 'yyyy-MM-dd'));
  });
  return scheduledDates;
};

export const getNextScheduledClass = (userClasses: UserClass[]) => {
  const currentDate = new Date();
  for (let i = 0; i < userClasses.length; i += 1) {
    const classDate = parseLocalDate(userClasses[i].classes.date);
    if (classDate >= currentDate) {
      return classDate;
    }
  }
  return currentDate; // return current date if no future classes found
};

export const renderWeekDays = (
  startOfWeekDate: Date,
  activeDay: Date,
  setActiveDay: (date: Date) => void,
  scheduledDates: Set<string | unknown>,
) => days.map((day, index) => {
  const date = addDays(startOfWeekDate, index);
  const isActiveDay = isSameDay(activeDay, date);
  const isScheduled = scheduledDates.has(format(date, 'yyyy-MM-dd'));

  return (
    <button
      key={format(date, 'yyyy-MM-dd')}
      data-testid={`day-${day}`}
      type="button"
      className={`flex flex-col items-center w-auto p-1 rounded-lg min-w-[38px] min-h-[76px] ${isActiveDay ? 'bg-seafoam text-white' : 'bg-gray-200'}`}
      onClick={() => setActiveDay(date)}
    >
      <span className="flex text-sm font-semibold">{day}</span>
      <span
        className={`w-6 h-6 rounded-full flex items-center text-xs justify-center mt-2 ${
          isActiveDay ? 'bg-white text-seafoam' : 'bg-seafoam text-white'
        }`}
      >
        {date.getDate()}
      </span>
      {isScheduled && <span className="w-2 h-2 rounded-full bg-solid-orange mt-2" />}
    </button>
  );
});

export const renderWeekSlides = (
  numberOfWeeks: number,
  activeDay: Date,
  setActiveDay: SetActiveDayFunction,
  scheduledDates: Set<string | unknown>,
) => {
  const weeks = [...Array(numberOfWeeks)].map((_, index) => {
    const startOfWeekDate = startOfWeek(addDays(new Date(), (index - numberOfWeeks / 2) * 7));

    return (
      <SwiperSlide key={format(startOfWeekDate, 'yyyy-MM-dd')} className="flex w-full h-full">
        <div className="flex-shrink flex space-x-3 justify-center ">{renderWeekDays(startOfWeekDate, activeDay, setActiveDay, scheduledDates)}</div>
      </SwiperSlide>
    );
  });

  return weeks;
};

export const getWeekTitle = (activeSlide: number) => {
  const weekDifference = activeSlide - 26;
  const plural = Math.abs(weekDifference) === 1 ? '' : 's';
  if (weekDifference < 0) {
    return `${Math.abs(weekDifference)} Week${plural} Ago`;
  } if (weekDifference > 0) {
    return `In ${weekDifference} Week${plural}`;
  }
  return 'This Week';
};
