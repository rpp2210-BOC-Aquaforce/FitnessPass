'use client';

import { UserClass } from '@/lib/types';
import ClassCard from './ClassCard';

export default function FitnessClasses(
  { userClasses, gotoDate }: { userClasses: UserClass[], gotoDate?: (date: Date) => void},
) {
  return (
    <>
      {userClasses.map((userClass) => (
        <ClassCard key={userClass.id} userClass={userClass} gotoDate={gotoDate} />
      ))}
    </>
  );
}

FitnessClasses.defaultProps = {
  gotoDate: undefined,
};
