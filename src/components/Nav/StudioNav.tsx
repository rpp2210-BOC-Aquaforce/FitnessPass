'use client';

import React from 'react';
import {
  Plus, MapPin, Book, BarChart,
} from 'lucide-react';
import Link from 'next/link';

function StudioBottomNav({ studioId }: { studioId: string }) {
  const linkClass = 'flex flex-col items-center justify-center hover:bg-mint-orange p-auto w-full h-full';

  return (
    <div className="fixed bottom-0 h-[76px] w-full bg-solid-orange text-white flex justify-around items-center x-space-4 z-[999]">
      <Link href={`/studio/${studioId}/add-location`} className={linkClass}>
        <div className="flex items-center">
          <Plus size={14} />
          <MapPin size={24} />
        </div>
        <span className="mt-1 text-xs">Add Location</span>
      </Link>
      <Link href={`/studio/${studioId}/addclass`} className={linkClass}>
        <div className="flex items-center">
          <Plus size={14} />
          <Book size={24} />
        </div>
        <span className="mt-1 text-xs">Add Class</span>
      </Link>
      <Link href={`/studio/${studioId}/metrics`} className={linkClass}>
        <BarChart size={24} />
        <span className="mt-1 text-xs">Metrics</span>
      </Link>
      <Link href={`/studio/${studioId}/view-classes`} className={linkClass}>
        <div className="flex items-center">
          <Book size={24} />
        </div>
        <span className="mt-1 text-xs">Classes</span>
      </Link>
      <Link href={`/studio/${studioId}/view-locations`} className={linkClass}>
        <div className="flex items-center">
          <MapPin size={24} />
        </div>
        <span className="mt-1 text-xs">Locations</span>
      </Link>
    </div>
  );
}

export default StudioBottomNav;
