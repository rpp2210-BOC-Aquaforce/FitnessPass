'use client';

import React from 'react';

type FavoriteEntryProps = {
  favorite: any;
  onRemove: (id: number) => void;
};

export default function FavoriteEntry({ favorite, onRemove }: FavoriteEntryProps) {
  const handleRemove = () => {
    onRemove(favorite.class_id);
  };

  return (
    <div className="w-full flex justify-center">
      <div className="w-5/6 bg-white p-4 mb-4 text-xs justify-center h-25 mb-5 h-full rounded-lg shadow">
        <div className="flex mb-4">
          <div className="w-1/3 p-2 h-full flex items-start">
            <img
              src="https://images.pexels.com/photos/1954524/pexels-photo-1954524.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="gym"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="w-2/3">
            <div className="flex flex-wrap">
              <p className="font-bold text-seafoam mr-4">Class Name:</p>
              <p className="text-orange">{favorite.name}</p>
            </div>
            <div className="flex flex-wrap">
              <p className="font-bold text-seafoam mr-4">Class Description:</p>
              <p className="text-orange">{favorite.description}</p>
            </div>
            <div className="flex flex-wrap">
              <p className="font-bold text-seafoam mr-4">Class Date:</p>
              <p className="text-orange">{favorite.date}</p>
            </div>
            <div className="flex flex-wrap">
              <p className="font-bold text-seafoam mr-4 mb-2">Time:</p>
              <p className="text-orange">{favorite.time}</p>
            </div>
            <div className="flex flex-wrap">
              <p className="font-bold text-seafoam mr-4 mb-2">Instructor:</p>
              <p className="text-orange">{favorite.instructor}</p>
            </div>
            <button
              type="button"
              className="rounded-lg border border-black py-2 px-4 text-white hover:text-orangeLight border rounded-full border-white bg-orange"
              onClick={handleRemove}
            >
              Remove
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
