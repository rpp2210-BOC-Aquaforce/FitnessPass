'use client';

import { useState } from 'react';
import { ScheduleView, Favorites, Ratings } from '@/components';
import { FitnessClasses } from '@/components/FitnessClasses';
import {
  UserClassFunction,
  UpdateUserClassesFunction,
  UpdateClassesFunction,
  UserClassArgs,
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
  const [userClasses, setUserClasses] = useState(_userClasses);
  const [availableClasses, setAvailableClasses] = useState(_availableClasses);
  const favorites = userClasses?.filter((c) => c.favorite);
  const [favoriteClasses, setFavoriteClasses] = useState(favorites);

  const onFavoritesUpdate:
  UpdateUserClassesFunction = (args: UserClassArgs, updatedClasses: Class[]) => {
    setFavoriteClasses(updatedClasses);
    updateUserClass(args);
  };

  const onUserClassesUpdate:
   UpdateUserClassesFunction = (args: UserClassArgs, updatedClasses: Class[]) => {
     setUserClasses(updatedClasses);
     updateUserClass(args);
   };

  const onClassesUpdate: UpdateClassesFunction = (args: UserClassArgs, updatedClass: Class) => {
    const { create, _delete } = args;
    if (_delete) {
      setAvailableClasses((prev) => prev.filter((c) => c.class_id !== args.classId));
      setFavoriteClasses((prev) => prev.filter((c) => c.class_id !== args.classId));
    }

    if (create) {
      setAvailableClasses((prev) => [...prev, updatedClass]);
    }
    updateUserClass(args);
  };

  const pageComponents: { [key: string]: JSX.Element } = {
    favorites: (
      <Favorites
        userId={userId}
        onUpdate={onFavoritesUpdate}
        fitnessClasses={favoriteClasses || []}
      />),
    ratings: (
      <Ratings
        userId={userId}
        onUserClassesUpdate={onUserClassesUpdate}
        fitnessClasses={userClasses || []}
      />),
    classes: (
      <div className="flex flex-col items-start p-2 mt-2 bg-white shadow-md rounded-lg w-full min-h-[250px] h-full">
        <div className="flex w-full justify-between">
          <div className="w-full h-full">
            <FitnessClasses
              classes={availableClasses || []}
              onClassesUpdate={onClassesUpdate}
              onUserClassesUpdate={onUserClassesUpdate}
            />
          </div>
        </div>
      </div>
    ),
    default: (
      <ScheduleView
        fitnessClasses={userClasses || []}
        onClassesUpdate={onClassesUpdate}
        onUserClassesUpdate={onUserClassesUpdate}
      />
    ),
  };

  return pageComponents[page] || pageComponents.default;
}
