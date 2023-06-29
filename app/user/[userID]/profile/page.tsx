'use client';

import { redirect } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendar, faHeart, faDumbbell, faStar,
} from '@fortawesome/free-solid-svg-icons';

import Profile from '@/components/Profile';

export default function UserProfilePage() {
  useSession({
    required: true,
    onUnauthenticated() {
      redirect('/login');
    },
  });
  return (
    <div className="text-2xl">

      <Profile />

      <div className="relative sm:inset-10 flex sm:place-content-between md:w-1/3 w-full flex justify-center">
        <Link
          href="/user/123/schedule"
          className="text-white hover:text-orangeLight mr-1 md:mr-2 border rounded-full border-white py-1 px-2 md:py-1.5 md:px-3 bg-orange text-xs md:text-sm"
        >
          Schedule
          <FontAwesomeIcon icon={faCalendar} className="mr-1.5 md:mr-1 md:ml-0.5 pl-2" />

        </Link>
        <Link
          href="/user/123/classes"
          className="text-white hover:text-orangeLight mr-1 md:mr-2 border rounded-full border-white py-1 px-2 md:py-1.5 md:px-3 bg-orange text-xs md:text-sm"
        >
          Classes
          <FontAwesomeIcon icon={faDumbbell} className="mr-1.5 md:mr-1 md:ml-0.5 pl-2" />

        </Link>
        <Link
          href="/user/123/favorites"
          className="text-white hover:text-orangeLight mr-1 md:mr-2 border rounded-full border-white py-1 px-2 md:py-1.5 md:px-3 bg-orange text-xs md:text-sm"
        >
          Favorites
          <FontAwesomeIcon icon={faHeart} className="mr-1.5 md:mr-1 md:ml-0.5 pl-2" />

        </Link>
        <Link
          href="/user/123/ratings"
          className="text-white hover:text-orangeLight border rounded-full border-white py-1 px-2 md:py-1.5 md:px-3 bg-orange text-xs md:text-sm"
        >
          Ratings
          <FontAwesomeIcon icon={faStar} className="mr-1.5 md:mr-1 md:ml-0.5 pl-2" />

        </Link>
      </div>
    </div>
  );
}
