/* eslint-disable @next/next/no-img-element */
import { UserClass, ReactChildren } from '@/lib/types';
import { parseLocalDate } from '@/components/Schedule/DateFunctions';

function TextDiv({ children }: ReactChildren) {
  return <div className="text-seafoam text-[10px] pt-1 font-black uppercase tracking-wide">{children}</div>;
}

export default function ClassCard(
  { userClass, gotoDate }: { userClass: UserClass, gotoDate?: (date: Date) => void },
) {
  const { classes } = userClass;

  if (!classes) {
    return null;
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && gotoDate) {
      gotoDate(parseLocalDate(classes.date));
    }
  };

  return (
    <div className="flex items-start mt-4 bg-white w-full h-[104px]">
      <img
        className="h-full w-[116.60px] object-cover"
        src={classes.locations.photo_url ?? 'https://via.placeholder.com/117x104'}
        alt="Placeholder"
      />
      <div
        className="flex flex-col justify-between ml-4 flex-grow pointer-cursor"
        onClick={() => gotoDate && gotoDate(parseLocalDate(classes.date))}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="button"
      >
        <TextDiv>{classes.name}</TextDiv>
        <TextDiv>
          {classes.time}
          {' '}
          (
          {classes.duration}
          {' '}
          min)
        </TextDiv>
        <TextDiv>{classes.locations.name}</TextDiv>
        <TextDiv>
          Ratings:
          {' '}
          {classes.total_rating}
        </TextDiv>
      </div>
      <div className="flex flex-col justify-between items-end ml-4">
        <div className="flex space-x-2">
          <div className="w-2 h-2 bg-gray-400" />
          <div className="w-2 h-2 bg-gray-400" />
          <div className="w-2 h-2 bg-gray-400" />
          <div className="w-2 h-2 bg-gray-400" />
        </div>
        <button type="button" className="text-center text-white text-xs font-black uppercase tracking-wide rounded-md bg-mint-orange px-2 py-1 mt-2">Edit</button>
        <button type="button" className="text-center text-white text-xs font-black uppercase tracking-wide rounded-md bg-red-300 px-2 py-1 mt-2">Remove</button>
      </div>
    </div>
  );
}

ClassCard.defaultProps = {
  gotoDate: undefined,
};
