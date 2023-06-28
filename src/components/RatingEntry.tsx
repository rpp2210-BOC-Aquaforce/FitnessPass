'use client';

import React from 'react';
import supabase from '../lib/supabase';

type RatingEntryProps = {
  rating: any;
};

export default function RatingEntry({ rating }: RatingEntryProps) {
  async function updateRating(element: number) {
    try {
      const { error } = await supabase
        .from('user_classes')
        .update({ class_rating: element })
        .eq('class_id', 4);
      console.log('were here');
      if (error) {
        console.error('Supabase Error: ', error);
      }
    } catch (err) {
      console.error('Unexpected error: ', err);
    }
  }

  function displayRadioValue() {
    const elements = document.getElementsByName('rating') as NodeListOf<HTMLInputElement>;
    for (let i = 0; i < elements.length; i += 1) {
      if (elements[i].checked) {
        const ratingValue = parseInt(elements[i].value, 10);
        updateRating(ratingValue);
      }
    }
  }

  return (
    <div>
      <div className="w-full flex justify-center">
        <div id="white background" className="w-5/6 bg-white p-4 mb-4 text-xs justify-center h-25 mb-5 h-full rounded-lg">
          <div className="flex">
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
                <p className="text-orange">{rating.name}</p>
              </div>
              <div className="flex flex-wrap">
                <p className="font-bold text-seafoam mr-4">Class Description:</p>
                <p className="text-orange">{rating.description}</p>
              </div>
              <div className="flex flex-wrap">
                <p className="font-bold text-seafoam mr-4">Class Date:</p>
                <p className="text-orange">{rating.date}</p>
              </div>
              <div className="flex flex-wrap">
                <p className="font-bold text-seafoam mr-4 mb-2">Instructor:</p>
                <p className="text-orange">{rating.instructor}</p>
              </div>
            </div>
          </div>
          <form className="inline-flex">
            <div className="flex mb-4">
              {[1, 2, 3, 4, 5].map((value) => (
                <label htmlFor={`rating-${value}`} key={value} className="flex items-center mr-4 text-seafoam">
                  {value}
                  <input
                    name="rating"
                    id={`rating-${value}`}
                    type="radio"
                    value={value}
                    className="ml-1 text-seafoam"
                  />
                </label>
              ))}
            </div>
            <button
              type="button"
              className="ml-5 rounded-lg border border-black py-2 px-4 text-white hover:text-orangeLight border rounded-full border-white bg-orange"
              onClick={displayRadioValue}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
