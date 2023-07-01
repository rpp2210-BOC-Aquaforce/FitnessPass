'use client';

import { Class } from '@/lib/types';
import ClassCard from './ClassCard';

export default function FitnessClasses(
  { classes, gotoDate = null }: { classes: Class[], gotoDate?: null | ((date: Date) => void) },
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
