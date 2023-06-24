'use client';

import React from 'react';

type FavoriteEntryProps = {
  favorite: any;
};

export default function FavoriteEntry({ favorite }: FavoriteEntryProps) {
  console.log('favvv', favorite);
  return (
    <div className="text-2xl">
      <h1 className="relative sm:inset-x-20 inset-y-4 text-5xl">My Favorites</h1>
      <div className="relative sm:inset-10 inset-y-4 md:w-1/3 bg-white">
        <div className="inline-block">
          {favorite.name}
        </div>
        <br />
        <div className="inline-block">
          {favorite.description}
        </div>
        <br />
        <div className="inline-block">
          {favorite.instructor}
        </div>
        <br />
      </div>
    </div>
  );
}
