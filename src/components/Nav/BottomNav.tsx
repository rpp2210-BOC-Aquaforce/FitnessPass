'use client';

import React from 'react';
import {
  Home, Calendar, Book, Heart, Star,
} from 'lucide-react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { CustomSession } from '@/lib/types';

function BottomNav() {
  const { data: session } = useSession() as { data: CustomSession | null };
  const userId = session?.user?.id;
  const pathname = usePathname();

  if (!session) {
    return null;
  }

  const checkActive = (path: string) => {
    if (pathname?.endsWith(path)) {
      return 'bg-seafoam';
    }
    return '';
  };

  const linkClass = 'flex flex-col items-center justify-center hover:bg-mint-orange p-auto w-full h-full';

  return (
    <div className="fixed bottom-0 h-[76px] w-full bg-solid-orange text-white flex justify-around items-center x-space-4 z-[999]">
      <Link href={`/user/${userId}/search`} className={cn(linkClass, checkActive('search'))}>
        <Home size={24} />
        <span className="mt-1 text-xs">Search</span>
      </Link>
      <Link href={`/user/${userId}/schedule`} className={cn(linkClass, checkActive('schedule'))}>
        <Calendar size={24} />
        <span className="mt-1 text-xs">Schedule</span>
      </Link>
      <Link href={`/user/${userId}/classes`} className={cn(linkClass, checkActive('classes'))}>
        <Book size={24} />
        <span className="mt-1 text-xs">Classes</span>
      </Link>
      <Link href={`/user/${userId}/favorites`} className={cn(linkClass, checkActive('favorites'))}>
        <Heart size={24} />
        <span className="mt-1 text-xs">Favorites</span>
      </Link>
      <Link href={`/user/${userId}/ratings`} className={cn(linkClass, checkActive('ratings'))}>
        <Star size={24} />
        <span className="mt-1 text-xs">Ratings</span>
      </Link>
    </div>
  );
}

export default BottomNav;
