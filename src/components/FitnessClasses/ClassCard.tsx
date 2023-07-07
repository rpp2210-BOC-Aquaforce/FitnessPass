/* eslint-disable @next/next/no-img-element */
import { cn } from '@/lib/utils';
import { Class } from '@/lib/types';
import { parseLocalDate } from '@/components/Schedule/DateFunctions';
import Stars from '@/components/Ratings/Stars';

function TextDiv({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={cn('text-seafoam text-[10px] pt-1 font-black uppercase tracking-wide', className ?? '')}>
      {children}
    </div>
  );
}

export default function ClassCard(
  { fitnessClass, gotoDate }: { fitnessClass: Class, gotoDate?: null | ((date: Date) => void) },
) {
  if (!fitnessClass) {
    return null;
  }

  const onClick = () => {
    if (!gotoDate) {
      return;
    }
    gotoDate(parseLocalDate(fitnessClass.date));
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && gotoDate) {
      gotoDate(parseLocalDate(fitnessClass.date));
    }
  };

  return (
    <div className="flex items-start mt-4 bg-white w-full h-[100px]">
      <img
        className="h-full w-[100px] min-w-[100px] max-w-[100px] object-cover"
        src={fitnessClass.locations.photo_url ?? 'https://via.placeholder.com/117x104'}
        alt="Placeholder"
      />
      <div
        className={cn('flex flex-col justify-between ml-4 flex-grow', gotoDate ? 'pointer-cursor' : '')}
        onClick={onClick}
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
        <button type="button" className="text-center text-white text-xs font-black uppercase tracking-wide rounded-md bg-mint-orange px-2 py-1 mt-2">Edit</button>
        <button type="button" className="text-center text-white text-xs font-black uppercase tracking-wide rounded-md bg-red-300 px-2 py-1 mt-2">Remove</button>
      </div>
    </div>
  );
}
