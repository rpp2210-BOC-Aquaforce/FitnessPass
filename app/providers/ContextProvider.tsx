'use client';

/* eslint-disable no-console */
import React, {
  createContext, useState, useEffect, useMemo,
} from 'react';
import { Class } from '@/lib/types';

export const ClassesContext = createContext({
  userClasses: [] as Class[],
  setUserClasses: (classes: Class[]) => {
    // default value
    console.log('setUserClasses', classes);
  },
  availableClasses: [] as Class[],
  setAvailableClasses: (classes: Class[]) => {
    // default value
    console.log('setAvailableClasses', classes);
  },
  favoriteClasses: [] as Class[],
  setFavoriteClasses: (classes: Class[]) => {
    // default value
    console.log('setFavoriteClasses', classes);
  },
});

export default function ClassesProvider({ children } : { children: React.ReactNode }) {
  const [userClasses, setUserClasses] = useState<Class[]>([]);
  const [availableClasses, setAvailableClasses] = useState<Class[]>([]);
  const [favoriteClasses, setFavoriteClasses] = useState<Class[]>([]);

  useEffect(() => {
    console.log('userClasses', userClasses);
    setFavoriteClasses(userClasses?.filter((c) => c.favorite));
  }, [userClasses]);

  const value = useMemo(() => ({
    userClasses,
    setUserClasses,
    availableClasses,
    setAvailableClasses,
    favoriteClasses,
    setFavoriteClasses,
  }), [
    userClasses,
    setUserClasses,
    availableClasses,
    setAvailableClasses,
    favoriteClasses,
    setFavoriteClasses,
  ]);

  return (
    <ClassesContext.Provider value={value}>
      {children}
    </ClassesContext.Provider>
  );
}
