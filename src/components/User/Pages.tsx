'use client';

import { ScheduleView, Favorites, Ratings } from '@/components';
import { FitnessClasses } from '@/components/FitnessClasses';
import {
  UserClassFunction,
  Class,
} from '@/lib/types';

type UserPagesProps = {
  page: string;
  userClasses: Class[];
  availableClasses: Class[];
  userId: string;
  updateUserClass: UserClassFunction;
};

export default function Pages({
  page,
  userClasses: _userClasses,
  availableClasses: _availableClasses,
  userId,
  updateUserClass,
} : UserPagesProps) {
  const favorites = _userClasses?.filter((c) => c.favorite);

  const pageComponents: { [key: string]: JSX.Element } = {
    favorites: (
      <Favorites
        userId={userId}
        updateUserClass={updateUserClass}
        fitnessClasses={favorites || []}
      />),
    ratings: (
      <Ratings
        userId={userId}
        updateUserClass={updateUserClass}
        fitnessClasses={_userClasses || []}
      />),
    classes: (
      <div className="flex flex-col items-start p-2 mt-2 bg-white shadow-md rounded-lg w-full min-h-[250px] h-full">
        <div className="flex w-full justify-between">
          <div className="w-full h-full">
            <FitnessClasses
              classes={_availableClasses || []}
              updateUserClass={updateUserClass}
            />
          </div>
        </div>
      </div>
    ),
    default: (
      <ScheduleView
        fitnessClasses={_userClasses || []}
        updateUserClass={updateUserClass}
      />
    ),
  };

  return pageComponents[page] || pageComponents.default;
}
