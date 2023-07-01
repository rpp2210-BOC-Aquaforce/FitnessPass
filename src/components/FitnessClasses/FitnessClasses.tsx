'use client';

import { Class } from '@/lib/types';
import ClassCard from './ClassCard';

export default function FitnessClasses(
  { classes, gotoDate }: { classes: Class[], gotoDate?: (date: Date) => void},
) {
  return (
    <>
      {classes.map((fitnessClass) => (
        <ClassCard
          key={fitnessClass.class_id}
          fitnessClass={fitnessClass}
          gotoDate={gotoDate}
        />
      ))}
    </>
  );
}

FitnessClasses.defaultProps = {
  gotoDate: undefined,
};
