'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendar, faHeart, faDumbbell, faStar,
} from '@fortawesome/free-solid-svg-icons';
import { Session } from 'next-auth';

interface CustomSession extends Session {
  user: {
    id: string;
    name?: string;
    email?: string;
    image?: string;
    studio_user?: boolean;
  } & Session['user'];
}

export default function UserNav() {
  const { data: session } = useSession() as { data: CustomSession | null };
  const userId = session?.user?.id;

  if (!session) {
    return null;
  }

  return (
    <nav className="relative sm:inset-10 flex sm:place-content-between md:w-1/3 w-full flex justify-center mt-4">
      <Link
        href={`/user/${userId}/schedule`}
        className="text-white hover:text-orangeLight mr-1 md:mr-2 rounded-full py-1 px-2 md:py-1.5 md:px-3 bg-orange text-xs md:text-sm"
      >
        Schedule
        <FontAwesomeIcon icon={faCalendar} className="mr-1.5 md:mr-1 md:ml-0.5 pl-2 w-3 h-3" />

      </Link>
      <Link
        href={`/user/${userId}/classes`}
        className="text-white hover:text-orangeLight mr-1 md:mr-2 rounded-full py-1 px-2 md:py-1.5 md:px-3 bg-orange text-xs md:text-sm"
      >
        Classes
        <FontAwesomeIcon icon={faDumbbell} className="mr-1.5 md:mr-1 md:ml-0.5 pl-2 w-3 h-3" />

      </Link>
      <Link
        href={`/user/${userId}/favorites`}
        className="text-white hover:text-orangeLight mr-1 md:mr-2 rounded-full py-1 px-2 md:py-1.5 md:px-3 bg-orange text-xs md:text-sm"
      >
        Favorites
        <FontAwesomeIcon icon={faHeart} className="mr-1.5 md:mr-1 md:ml-0.5 pl-2 w-3 h-3" />

      </Link>
      <Link
        href={`/user/${userId}/ratings`}
        className="text-white hover:text-orangeLight rounded-full py-1 px-2 md:py-1.5 md:px-3 bg-orange text-xs md:text-sm"
      >
        Ratings
        <FontAwesomeIcon icon={faStar} className="mr-1.5 md:mr-1 md:ml-0.5 pl-2 w-3 h-3" />

      </Link>
    </nav>
  );
}
