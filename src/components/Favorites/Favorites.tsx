'use client';

import React, { useState } from 'react';
import { Class, UserClassFunction } from '@/lib/types';
import FavoriteEntry from './FavoriteEntry';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function Favorites({ userId, updateUserClass, fitnessClasses } :
  {
    userId: string,
    updateUserClass: UserClassFunction,
    fitnessClasses: Class[] }) {
  const [favorites, setFavorites] = useState<Class[]>(fitnessClasses);

  const removeFavorite = (classId: number) => {
    setFavorites((prevFavorites) => (
      prevFavorites.filter((favorite) => favorite.class_id !== classId)
    ));
    updateUserClass({
      userId,
      classId,
      key: 'favorite',
      value: false,
    });
  };

  return (
    <div className="text-m">
      <h1 className="relative mx-auto text-center text-2xl text-seafoam mb-8">My Favorites</h1>

      {favorites.map((fitnessClass: Class) => (
        <FavoriteEntry
          fitnessClass={fitnessClass}
          key={fitnessClass.class_id}
          onRemove={removeFavorite}
        />
      ))}

    </div>
  );
}
