'use client';

import { FitnessClasses } from '@/components/FitnessClasses';
import React, {
  useState, useEffect, useRef,
} from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Virtual, Navigation } from 'swiper';
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
import { UserClass } from '@/lib/types';
import {
  parseLocalDate,
  getScheduledDates,
  getNextScheduledClass,
  // renderWeekSlides,
  WeekDays,
  getWeekTitle,
} from './DateFunctions';

type ScheduleViewProps = {
  userClasses: UserClass[];
  // setUserClasses: React.Dispatch<React.SetStateAction<UserClass[]>>;
}

const initialSlide = 26;
const totalSlides = 52;
const today = new Date();
const weeks = [...Array(totalSlides)];
// export default function ScheduleView({ userClasses, setUserClasses }: ScheduleViewProps) {
export default function ScheduleView({ userClasses }: ScheduleViewProps) {
  const [activeSlide, setActiveSlide] = useState<number>(initialSlide);
  const [activeDay, setActiveDay] = useState<Date>(today);
  const [viewAll, setViewAll] = useState<boolean>(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);
  const swiperRef = useRef<any>(null);

  useEffect(() => {
    if (viewAll) {
      return;
    }
    const gotoClassDate = (date: Date) => {
      if (!swiperRef.current) return;
      const initialSlideIndex = initialSlide + differenceInWeeks(date, today);
      setActiveSlide(initialSlideIndex);
      swiperRef.current.swiper.slideTo(initialSlideIndex, 250);
      setActiveDay(date);
    };
    const nextScheduledClass = getNextScheduledClass(userClasses);
    gotoClassDate(nextScheduledClass);
  }, [userClasses, viewAll]);

  const weekTitle = getWeekTitle(activeSlide, initialSlide);

  const classesForActiveDay = userClasses.filter((userClass) => {
    const classDate = parseLocalDate(userClass.classes.date);
    return isSameDay(activeDay, classDate);
  });

  const scheduledDates = getScheduledDates(userClasses);

  const handleViewAllClick = async () => {
    setIsButtonDisabled(true);
    setViewAll((prev) => !prev);
    setTimeout(() => setIsButtonDisabled(false), 100);
  };

  return (
    <div className="flex flex-col items-start p-2 mt-2 bg-white shadow-md rounded-lg w-full min-h-[250px] h-full">
      <div className="flex w-full justify-between">
        <h2 className="text-sm font-bold mb-5 p-2">{weekTitle}</h2>
        <button
          type="button"
          className="text-sm font-semibold mb-5 p-2"
          onClick={handleViewAllClick}
          disabled={isButtonDisabled}
        >
          {viewAll ? 'View by Date' : 'View All'}

        </button>
      </div>
      <Swiper
        modules={[Virtual, Navigation]}
        initialSlide={initialSlide} // Start from the current week
        navigation
        slidesPerView={1}
        spaceBetween={1}
        loop={false}
        ref={swiperRef}
        virtual
        onSlideChange={(swiper) => {
          // console.log('activeSlide:', activeSlide);
          // console.log('swiper.activeIndex:', swiper.activeIndex);
          if (swiper.activeIndex === activeSlide) return;
          setActiveSlide(swiper.activeIndex);
          setActiveDay(addDays(today, swiper.activeIndex - initialSlide));
        }}
        className="w-full h-full"
      >
        {/* {renderWeekSlides(totalSlides, activeDay, setActiveDay, scheduledDates)} */}
        {weeks.map((_, index) => {
          const startOfWeekDate = startOfWeek(addDays(new Date(), (index - totalSlides / 2) * 7));
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
        <FitnessClasses userClasses={viewAll ? userClasses : classesForActiveDay} />
      </Swiper>
    </div>
  );
}
