'use client';

import { FitnessClasses } from '@/components/FitnessClasses';
import React, {
  useState, useEffect, useRef, useCallback,
} from 'react';
import { Swiper } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import {
  addDays, isSameDay, differenceInWeeks,
} from 'date-fns';
import { UserClass } from '@/lib/types';
import {
  parseLocalDate,
  getScheduledDates,
  getNextScheduledClass,
  renderWeekSlides,
  getWeekTitle,
} from './DateFunctions';

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
    if (!swiperRef.current) return;
    const initialSlideIndex = 26 + differenceInWeeks(date, new Date());
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

  const weekTitle = getWeekTitle(activeSlide);

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
          console.log('activeSlide:', activeSlide);
          console.log('swiper.activeIndex:', swiper.activeIndex);
          setActiveSlide(swiper.activeIndex);
          setActiveDay(addDays(new Date(), swiper.activeIndex - 26));
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
