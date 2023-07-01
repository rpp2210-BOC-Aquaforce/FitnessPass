'use client';

import React from 'react';
import { UserClass } from '@/lib/types';
import {
  format, addDays, isSameDay,
} from 'date-fns';

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
// type SetActiveDayFunction = React.Dispatch<React.SetStateAction<Date>>;

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

export function WeekDays({
  startOfWeekDate,
  activeDay,
  setActiveDay,
  scheduledDates,
} : {
  startOfWeekDate: Date,
  activeDay: Date,
  setActiveDay: (date: Date) => void,
  scheduledDates: Set<string | unknown>
}) {
  return (
    <span className="flex flex-wrap justify-center">
      {days.map((day, index) => {
        const date = addDays(startOfWeekDate, index);
        const isActiveDay = isSameDay(activeDay, date);
        const isScheduled = scheduledDates.has(format(date, 'yyyy-MM-dd'));

        return (
          <button
            key={format(date, 'yyyy-MM-dd')}
            data-testid={`day-${day}`}
            type="button"
            className={`flex flex-col m-2 items-center w-auto p-1 rounded-lg min-w-[38px] min-h-[76px] ${isActiveDay ? 'bg-seafoam text-white' : 'bg-gray-200'}`}
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
      })}
    </span>
  );
}

export const getWeekTitle = (activeSlide: number, initialSlide = 26) => {
  const weekDifference = activeSlide - initialSlide;
  const plural = Math.abs(weekDifference) === 1 ? '' : 's';
  if (weekDifference < 0) {
    return `${Math.abs(weekDifference)} Week${plural} Ago`;
  } if (weekDifference > 0) {
    return `In ${weekDifference} Week${plural}`;
  }
  return 'This Week';
};
