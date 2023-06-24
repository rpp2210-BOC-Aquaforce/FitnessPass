'use client';

import React, {
  useState, useEffect, useRef, useCallback,
} from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import {
  format, addDays, startOfWeek, isSameDay, differenceInWeeks,
} from 'date-fns';
import { FitnessClasses } from '../FitnessClasses';
import { UserClass } from '../../types';
import { parseLocalDate } from '../../lib';

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const getScheduledDates = (userClasses: UserClass[]) => {
  const scheduledDates = new Set();
  userClasses.forEach((userClass) => {
    const classDate = parseLocalDate(userClass.classes.date);
    scheduledDates.add(format(classDate, 'yyyy-MM-dd'));
  });
  return scheduledDates;
};

const renderWeekDays = (
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
      type="button"
      className={`flex flex-col items-center w-auto p-1 rounded-lg ${isActiveDay ? 'bg-seafoam text-white' : 'bg-gray-200'}`}
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
      {isScheduled && <span className="w-2 h-2 rounded-full bg-orange-500 mt-2" />}
    </button>
  );
});

type SetActiveDayFunction = React.Dispatch<React.SetStateAction<Date>>;

const renderWeekSlides = (
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

const getNextScheduledClass = (userClasses: UserClass[]) => {
  const currentDate = new Date();
  for (let i = 0; i < userClasses.length; i += 1) {
    const classDate = parseLocalDate(userClasses[i].classes.date);
    if (classDate >= currentDate) {
      return classDate;
    }
  }
  return currentDate; // return current date if no future classes found
};

type ScheduleViewProps = {
  userClasses: UserClass[];
  // setUserClasses: React.Dispatch<React.SetStateAction<UserClass[]>>;
}

// export default function ScheduleView({ userClasses, setUserClasses }: ScheduleViewProps) {
export default function ScheduleView({ userClasses }: ScheduleViewProps) {
  const [activeSlide, setActiveSlide] = useState<number>(26);
  const [activeDay, setActiveDay] = useState<Date>(new Date());
  const [viewAll, setViewAll] = useState<boolean>(false);
  const swiperRef = useRef<any>(null);

  const gotoClassDate = useCallback((date: Date) => {
    const initialSlideIndex = 26 + differenceInWeeks(date, new Date()) + 1;
    setActiveSlide(initialSlideIndex);
    swiperRef.current.swiper.slideTo(initialSlideIndex, 250);
    setActiveDay(date);
  }, []);

  useEffect(() => {
    if (viewAll) {
      return;
    }
    const nextScheduledClass = getNextScheduledClass(userClasses);
    gotoClassDate(nextScheduledClass);
  }, [userClasses, viewAll, gotoClassDate]);

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

  const classesForActiveDay = userClasses.filter((userClass) => {
    const classDate = parseLocalDate(userClass.classes.date);
    return isSameDay(activeDay, classDate);
  });

  const scheduledDates = getScheduledDates(userClasses);

  return (
    <div className="flex flex-col items-start p-2 mt-2 bg-white shadow-md rounded-lg w-full min-h-[148px] h-full">
      <div className="flex w-full justify-between">
        <h2 className="text-sm font-bold mb-5 p-2">{weekTitle}</h2>
        <button
          type="button"
          className="text-sm font-semibold mb-5 p-2"
          onClick={() => setViewAll((prev) => !prev)}
        >
          {viewAll ? 'View by Date' : 'View All'}

        </button>
      </div>
      <Swiper
        initialSlide={26} // Start from the current week
        slidesPerView={1}
        spaceBetween={16}
        freeMode
        ref={swiperRef}
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
        {renderWeekSlides(52, activeDay, setActiveDay, scheduledDates)}
        {' '}
        {/* Display 52 weeks */}
        <FitnessClasses userClasses={viewAll ? userClasses : classesForActiveDay} />
      </Swiper>
    </div>
  );
}
