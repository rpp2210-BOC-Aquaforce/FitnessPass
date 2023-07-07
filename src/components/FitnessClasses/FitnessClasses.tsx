'use client';

import { Class, UpdateUserClassFunction } from '@/lib/types';
import ClassCard from './ClassCard';

export default function FitnessClasses(
  { classes, gotoDate = null, updateUserClass }: {
    classes: Class[],
    gotoDate?: null | ((date: Date) => void),
    updateUserClass?: UpdateUserClassFunction,
  },
) {
  return (
    <>
      {classes.map((fitnessClass) => (
        <ClassCard
          key={fitnessClass.class_id}
          fitnessClass={fitnessClass}
          updateUserClass={updateUserClass}
          gotoDate={gotoDate}
        />
      ))}
    </>
  );
}
