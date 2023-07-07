'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Heart } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { cn } from '@/lib/utils';
import { Class, UpdateUserClassFunction, CustomSession } from '@/lib/types';
import { parseLocalDate } from '@/components/Schedule/DateFunctions';
import Stars from '@/components/Ratings/Stars';

function TextDiv({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={cn('text-seafoam text-[10px] pt-1 font-black uppercase tracking-wide', className ?? '')}>
      {children}
    </div>
  );
}

export default function ClassCard({ fitnessClass, gotoDate, updateUserClass }: {
  fitnessClass: Class,
  gotoDate?: null | ((date: Date) => void),
  updateUserClass?: UpdateUserClassFunction,
}) {
  const { data: session } = useSession() as { data: CustomSession | null };
  const userId = session?.user?.id;
  const isUserClass = fitnessClass.userId === userId;
  const [isFavorite, setIsFavorite] = useState(fitnessClass.favorite);

  if (!fitnessClass) {
    return null;
  }

  const onDetailsClick = () => {
    if (!gotoDate) {
      return;
    }
    gotoDate(parseLocalDate(fitnessClass.date));
  };

  const onFavoriteClick = () => {
    if (!updateUserClass) {
      return;
    }

    setIsFavorite((prev) => !prev);
    updateUserClass({
      classId: fitnessClass.class_id,
      userId,
      key: 'favorite',
      value: !fitnessClass.favorite,
    });
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && gotoDate) {
      gotoDate(parseLocalDate(fitnessClass.date));
    }
  };

  return (
    <div className="flex items-start mt-4 bg-white w-full h-[125px]">
      <Image
        className="h-full w-[100px] min-w-[100px] max-w-[100px] object-cover"
        width={100}
        height={100}
        src={fitnessClass.locations.photo_url ?? 'https://via.placeholder.com/117x104'}
        alt="Placeholder"
      />
      <div
        className={cn('flex flex-col justify-between ml-4 flex-grow', gotoDate ? 'pointer-cursor' : '')}
        onClick={onDetailsClick}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="button"
      >
        <TextDiv>{fitnessClass.name}</TextDiv>
        <TextDiv>
          {fitnessClass.time}
          {' '}
          (
          {fitnessClass.duration}
          {' '}
          min)
        </TextDiv>
        <TextDiv>{fitnessClass.locations.name}</TextDiv>
        <div className="flex flex-wrap mt-2">
          <Stars ratingValues={fitnessClass?.classRating || 0} />
        </div>
      </div>
      <div className="flex flex-col justify-between items-end ml-4">
        <button
          type="button"
          onClick={isUserClass ? onFavoriteClick : undefined}
          className="flex flex-wrap text-center text-white text-xs font-black uppercase tracking-wide rounded-md bg-mint-seafoam px-2 py-1 mt-2"
        >
          { isUserClass && (
          <Heart
            className={cn(
              'inline-block mr-1 h-[36px]',
              isFavorite ?? fitnessClass?.favorite ? 'text-red-300 fill-current' : 'text-white',
            )}
          />
          ) }
          { isUserClass ? '' : 'Add' }
        </button>
        { isUserClass && (
          <button
            type="button"
            className="text-center text-white text-xs font-black uppercase tracking-wide rounded-md bg-red-300 px-2 py-1 mt-2"
          >
            Remove
          </button>
        )}
      </div>
    </div>
  );
}
