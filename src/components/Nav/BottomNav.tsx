'use client';

import React from 'react';
import {
  Home, Calendar, Book, Heart, Star,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { CustomSession } from '@/lib/types';

function BottomNav() {
  const { data: session } = useSession() as { data: CustomSession | null };
  const userId = session?.user?.id;
  const router = useRouter();

  if (!session) {
    return null;
  }

  const linkClass = 'flex flex-col items-center justify-center hover:bg-mint-orange p-auto w-full h-full';

  return (
    <div className="fixed bottom-0 h-[76px] w-full bg-solid-orange text-white flex justify-around items-center x-space-4 z-[999]">
      <Link href={`/user/${userId}/search`} className={linkClass}>
        <Home size={24} />
        <span className="mt-1 text-xs">Search</span>
      </Link>
      <button className={linkClass} type="button" onClick={() => router.replace(`/user/${userId}/schedule/${Date.now()}`)}>
        <Calendar size={24} />
        <span className="mt-1 text-xs">Schedule</span>
      </button>
      <button className={linkClass} type="button" onClick={() => router.replace(`/user/${userId}/classes/${Date.now()}`)}>
        <Book size={24} />
        <span className="mt-1 text-xs">Classes</span>
      </button>
      <button className={linkClass} type="button" onClick={() => router.replace(`/user/${userId}/favorites/${Date.now()}`)}>
        <Heart size={24} />
        <span className="mt-1 text-xs">Favorites</span>
      </button>
      <button className={linkClass} type="button" onClick={() => router.replace(`/user/${userId}/ratings/${Date.now()}`)}>
        <Star size={24} />
        <span className="mt-1 text-xs">Ratings</span>
      </button>
    </div>
  );
}

export default BottomNav;
