'use client';

import Link from 'next/link';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faHeart, faDumbbell } from '@fortawesome/free-solid-svg-icons';
import Ratings from '../../../../components/Ratings';

export default function RatingsPage() {
  return (
    <div>
      <Ratings />
      <div className="relative sm:inset-10 flex sm:place-content-between md:w-1/3 w-full flex justify-center">
        <Link
          href="/user/123/schedule"
          className="text-white hover:text-orangeLight mr-1 md:mr-4 border rounded-full border-white py-1 px-2 md:py-1.5 md:px-3 bg-orange text-sm md:text-base"
        >
          My Schedule
          <FontAwesomeIcon icon={faCalendar} className="mr-1 ml-1.5 md:mr-1 md:ml-2" />
        </Link>
        <Link
          href="/user/123/classes"
          className="text-white hover:text-orangeLight mr-1 md:mr-4 border rounded-full border-white py-1 px-2 md:py-1.5 md:px-3 bg-orange text-sm md:text-base"
        >
          Classes
          <FontAwesomeIcon icon={faDumbbell} className="mr-1 ml-1.5 md:mr-1 md:ml-2" />
        </Link>
        <Link
          href="/user/123/favorites"
          className="text-white hover:text-orangeLight border rounded-full border-white py-1 px-2 md:py-1.5 md:px-3 bg-orange text-sm md:text-base"
        >
          My Favorites
          <FontAwesomeIcon icon={faHeart} className="mr-1 ml-1.5 md:mr-1 md:ml-2" />
        </Link>
      </div>
    </div>
  );
}
