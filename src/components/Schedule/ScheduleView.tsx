'use client';

import { FitnessClasses } from '@/components/FitnessClasses';
import React, {
  useState, useEffect, useRef,
} from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperClass, { Virtual, Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import {
  format,
  addDays,
  isSameDay,
  differenceInWeeks,
  startOfWeek,
} from 'date-fns';
import { Class, UserClassFunction } from '@/lib/types';
import {
  parseLocalDate,
  getScheduledDates,
  getNextScheduledClass,
  WeekDays,
  getWeekTitle,
} from './DateFunctions';
import DatePicker from './DatePicker';

type ScheduleViewProps = {
  fitnessClasses: Class[];
  updateUserClass?: UserClassFunction;
  // setfitnessClasses: React.Dispatch<React.SetStateAction<UserClass[]>>;
}

const initialSlide = 26;
const totalSlides = 52;
const today = new Date();
const weeks = [...Array(totalSlides)];

interface SwiperRef {
  swiper: SwiperClass,
}

export default function ScheduleView({ fitnessClasses, updateUserClass }: ScheduleViewProps) {
  const [activeSlide, setActiveSlide] = useState<number>(initialSlide);
  const [activeDay, setActiveDay] = useState<Date>(today);
  const [viewAll, setViewAll] = useState<boolean>(true);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);
  const swiperRef = useRef<SwiperRef>(null);

  const gotoClassDate = React.useCallback((date: Date) => {
    if (!swiperRef.current) return;
    const startOfWeekDate = startOfWeek(date);
    const startOfWeekToday = startOfWeek(today);
    const offset = differenceInWeeks(startOfWeekDate, startOfWeekToday);
    const initialSlideIndex = initialSlide + offset;
    setActiveSlide(initialSlideIndex);
    swiperRef.current.swiper.slideTo(initialSlideIndex, 250);
    setActiveDay(date);
  }, []);

  useEffect(() => {
    const nextScheduledClass = getNextScheduledClass(fitnessClasses);
    gotoClassDate(nextScheduledClass);
  }, [fitnessClasses, viewAll, gotoClassDate]);

  const weekTitle = getWeekTitle(activeSlide, initialSlide);

  const classesForActiveDay = fitnessClasses.filter((userClass) => {
    const classDate = parseLocalDate(userClass.date);
    return isSameDay(activeDay, classDate);
  });

  const scheduledDates = getScheduledDates(fitnessClasses);

  const handleViewAllClick = async () => {
    setIsButtonDisabled(true);
    setViewAll((prev) => !prev);
    setTimeout(() => setIsButtonDisabled(false), 100);
  };

  return (
    <div className="flex flex-col items-start p-2 mt-2 bg-white shadow-md rounded-lg w-full min-h-[300px] h-full">
      <div className="flex w-full justify-between">
        <h2 className="text-sm font-bold mb-5 p-2 w-[100px]">{weekTitle}</h2>
        <DatePicker
          activeDay={activeDay}
          gotoClassDate={gotoClassDate}
        />
        <button
          type="button"
          className="text-sm font-semibold mb-5 p-2 w-[100px]"
          onClick={handleViewAllClick}
          disabled={isButtonDisabled}
        >
          {viewAll ? 'View by Date' : 'View All'}

        </button>
      </div>
      <Swiper
        modules={[Virtual, Navigation]}
        initialSlide={initialSlide}
        navigation
        slidesPerView={1}
        spaceBetween={1}
        loop={false}
        ref={swiperRef}
        virtual
        onSlideChange={(swiper) => {
          if (swiper.activeIndex === activeSlide) return;
          setActiveSlide(swiper.activeIndex);
          setActiveDay(addDays(today, (swiper.activeIndex - totalSlides / 2) * 7));
        }}
        className="w-full h-full"
      >
        {weeks.map((_, index) => {
          const startOfWeekDate = startOfWeek(addDays(today, (index - totalSlides / 2) * 7));
          return (
            <SwiperSlide key={`week-${format(startOfWeekDate, 'yyyy-MM-dd')}`} virtualIndex={index} className="flex w-full h-full">
              <WeekDays
                startOfWeekDate={startOfWeekDate}
                activeDay={activeDay}
                setActiveDay={setActiveDay}
                scheduledDates={scheduledDates}
              />
            </SwiperSlide>
          );
        })}
        {' '}
        <FitnessClasses
          classes={viewAll ? fitnessClasses : classesForActiveDay}
          gotoDate={gotoClassDate}
          updateUserClass={updateUserClass}
        />
      </Swiper>
    </div>
  );
}
