/* eslint-disable @next/next/no-img-element */
/* eslint-disable camelcase */

'use client';

import { ReactChildren } from '@/lib/types';

import ClassSignUp from '@/components/ClassSignUp';

type CLASS = {
  class_id: number;
  location_id: number;
  name: string;
  description: string;
  date: string;
  time: string;
  duration: number;
  tags: string; // Assuming tags is an array of strings
  instructor: string;
  total_rating: number;
  num_ratings: number;
  created_at: Date;
  locations:
  {name: string, street: string, city: string, state: string, zip: string, photo_url:string },
}

function TextDiv({ children }: ReactChildren) {
  return <div className="text-seafoam text-[10px] pt-1 font-black uppercase tracking-wide">{children}</div>;
}

export default function List(
  { classes, setList } : {classes: CLASS[], setList: React.Dispatch<React.SetStateAction<boolean>>},
) {
  if (classes.length === 0) return <div>0 result</div>;
  return (
    <div>
      <div className="text-mint-orange mt-2">
        {classes.length}
        {' '}
        results
      </div>
      <button type="button" className="text-center text-white text-xs font-black uppercase tracking-wide rounded-md bg-green-400 px-2 py-1 mt-2" onClick={() => setList(false)}>Map</button>
      <div>
        {classes.map(({
          class_id, name, time, duration, total_rating, locations,
        }) => (
          <div key={class_id} className="flex items-start mt-4 bg-white w-full">
            <img
              className="h-full w-[116.60px] object-cover"
              src={locations.photo_url ?? 'https://via.placeholder.com/117x104'}
              alt="Placeholder"
            />
            <div className="flex flex-col justify-between ml-4 flex-grow">
              <TextDiv>{name}</TextDiv>
              <TextDiv>
                {time}
                {' '}
                (
                {duration}
                {' '}
                min)
              </TextDiv>
              <TextDiv>{locations.name}</TextDiv>
              <TextDiv>
                {locations.street}
                {', '}
                {locations.city}
                {', '}
                {locations.state}
                {locations.zip}
              </TextDiv>
              <TextDiv>
                Ratings:
                {' '}
                {total_rating}
              </TextDiv>
            </div>
            <div className="flex flex-col justify-between items-end ml-4">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-gray-400" />
                <div className="w-2 h-2 bg-gray-400" />
                <div className="w-2 h-2 bg-gray-400" />
                <div className="w-2 h-2 bg-gray-400" />
              </div>
              <ClassSignUp user_id={1} class_id={class_id} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
