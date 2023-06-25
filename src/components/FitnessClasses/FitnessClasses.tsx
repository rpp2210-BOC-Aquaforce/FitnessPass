import { UserClasses } from '@/types';
import ClassCard from './ClassCard';

export default function FitnessClasses({ userClasses }: UserClasses) {
  return (
    <>
      {userClasses.map((userClass) => (
        <ClassCard key={userClass.id} userClass={userClass} />
      ))}
    </>
  );
}
