'use client';

import React, { useState, useEffect } from 'react';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import supabase from '../lib/supabase';

type RatingEntryProps = {
  rating: any;
  classRating: any;

};

export default function RatingEntry({ rating, classRating }: RatingEntryProps) {
  const [ratingValues, setRatingValues] = useState(0);
  // on initial render, should select from user_classes and render star rating
  async function updateRating(element: number, classId: number) {
    try {
      const { error } = await supabase
        .from('user_classes')
        .update({ class_rating: element })
        .eq('class_id', classId);
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
        updateRating(ratingValue, rating.class_id);
      }
    }
  }

  const handleRatingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const ratingValue = parseInt(event.target.value, 10);
    setRatingValues(ratingValue);
    updateRating(ratingValue, rating.class_id);
  };

  useEffect(() => {
    // eslint-disable-next-line max-len
    const currentStarRating = classRating.find((item: { class_id: any; }) => item.class_id === rating.class_id);
    if (currentStarRating) {
      setRatingValues(currentStarRating.rating);
    } else {
      setRatingValues(0);
    }
  }, []);

  const generateStarIcons = () => {
    const stars = [];
    for (let i = 1; i <= 5; i += 1) {
      const starClass = i <= ratingValues ? 'text-yellow-500' : 'text-gray-300';
      stars.push(
        <FontAwesomeIcon key={i} icon={faStar} className={`text-m ${starClass}`} />,
      );
    }
    return stars;
  };

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
              <div className="flex flex-wrap">
                <p className="font-bold text-seafoam mr-4 mb-2">Current Rating:</p>
                {/* <p className="text-orange">{ratingValues}</p> */}
                <div className="star-rating">{generateStarIcons()}</div>
              </div>
              <p className="font-bold text-orange mb-4">Update or submit your rating below:</p>
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
                    checked={value === ratingValues}
                    onChange={handleRatingChange}

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
