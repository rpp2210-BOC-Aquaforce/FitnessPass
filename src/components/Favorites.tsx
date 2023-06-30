/* eslint-disable react/jsx-props-no-spreading */

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
// eslint-disable-next-line import/order, import/no-duplicates
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import Slider from 'react-slick';
import FavoriteEntry from './FavoriteEntry';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import supabase from '../lib/supabase';

export default function MyFavorites() {
  interface ClassListAgain {
    class_id: number;
    location_id: number;
    name: string;
    description: string;
    date: string;
    time: string;
    duration: number;
    instructor: string;
    total_rating: number;
    num_ratings: number;
    created_at: string;
  }

  interface ClassList {
    class_id: number,
    location_id: number,
    name: string,
    description: string,
    date: string,
    time: string,
    duration: number,
    instructor: string,
    total_rating: number,
    num_ratings: number,
    created_at: string,
 }

  const carouselSettings = {
    dots: false,
    arrows: true,
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 2,
    vertical: true,
    verticalSwiping: true,
  };

  const [classListAgain, setClassListAgain] = useState<ClassListAgain[]>([]);
  const [favorites, setFavorites] = useState<ClassList[]>([]);

  const removeFavorite = (classId: number) => {
    // eslint-disable-next-line max-len
    setFavorites((prevFavorites) => prevFavorites.filter((favorite) => favorite.class_id !== classId));
  };

  async function classInfoFavorites(id: number) {
    try {
      const { data: allClasses, error } = await supabase
        .from('classes')
        .select('*')
        .eq('class_id', id);
      if (error) {
        console.error('Supabase Error: ', error);
      } else {
        const classExists = favorites.some((classItem) => classItem.class_id === id);
        if (!classExists) {
          setFavorites((prevList) => [...prevList, ...allClasses]);
        }
      }
    } catch (err) {
      console.error('Unexpected error: ', err);
    }
  }

  useEffect(() => {
    async function getClassesAgain() {
      try {
        const { data: allClasses, error } = await supabase
          .from('user_classes')
          .select('*')
          .eq('user_id', 5)
          .eq('favorite', true);
        if (error) {
          console.error('Supabase Error: ', error);
        } else {
          setClassListAgain(allClasses);
          return allClasses;
        }
      } catch (err) {
        console.error('Unexpected error: ', err);
      }
      return null;
    }

    getClassesAgain();
  }, []);

  useEffect(() => {
    classListAgain.forEach((classItem) => {
      classInfoFavorites(classItem.class_id);
    });
  }, [classListAgain]);

  return (
    <div className="text-m">
      <div className="flex justify-end md:w-1/3 mt-5 text-seafoam">
        <Link href="/user/123/profile">
          My Profile
          <FontAwesomeIcon icon={faUser} className="pl-2 pr-3" />
        </Link>
      </div>
      <h1 className="relative mx-auto text-center text-2xl text-seafoam mb-8">My Favorites</h1>
      {favorites.length > 2

        ? (
          <Slider {...carouselSettings}>
            {favorites.map((favorite: ClassListAgain) => (
              <FavoriteEntry
                favorite={favorite}
                key={favorite.class_id}
                onRemove={removeFavorite}
              />
            ))}
          </Slider>
        )
        : favorites.map((favorite: ClassListAgain) => (
          <FavoriteEntry
            favorite={favorite}
            key={favorite.class_id}
            onRemove={removeFavorite}
          />
        ))}
    </div>
  );
}
