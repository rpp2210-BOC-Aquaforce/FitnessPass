'use client';

import React from 'react';

type FavoriteEntryProps = {
  favorite: any;
};

export default function FavoriteEntry({ favorite }: FavoriteEntryProps) {
  return (
    <div className="text-2xl">
      <h1 className="relative sm:inset-x-20 inset-y-4 text-5xl">My Favorites</h1>
      <div className="relative sm:inset-10 inset-y-4 md:w-1/3 bg-white rounded-lg p-4 shadow">
        <div className="mb-4">
          <h2 className="text-xl font-bold">{favorite.name}</h2>
          <p className="text-gray-500">{favorite.description}</p>
        </div>
        <div className="text-gray-600">
          <p className="mb-2">
            Instructor:
            {' '}
            {favorite.instructor}

          </p>
          <p className="mb-2">
            Location:
            {' '}
            {favorite.location}
          </p>
          <p className="mb-2">
            Date:
            {' '}
            {favorite.date}
          </p>
          <p>
            Time:
            {' '}
            {favorite.time}
          </p>
        </div>
      </div>
    </div>
  );
}
