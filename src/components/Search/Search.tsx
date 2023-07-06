/* eslint-disable camelcase */

'use client';

import React, { useEffect, useState } from 'react';
import Geocode from 'react-geocode';
import supabase from '@/lib/supabase';

import List from '@/components/Search/ListView';
import Map from '@/components/Search/MapView';
import { MapPin } from 'lucide-react';
import DatePicker from '../Schedule/DatePicker';

type LatLngLiteral = google.maps.LatLngLiteral;

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
  locations:
  {name: string, street: string, city: string, state: string, zip: string, photo_url: string},
}

export default function Search({ user_id, onSearch }
  :{user_id: any, onSearch: ()=>void}) {
  const [searchByClass, setSearchByClass] = useState('');
  const [searchByLocation, setSearchByLocation] = useState('');
  const [activeDay, setActiveDay] = useState<Date>(new Date());

  const [myLocation, setMyLocation] = useState<LatLngLiteral>();

  const [list, setList] = useState(false);
  const [searched, setSearched] = useState(false);
  const [Classes, setClasses] = useState<CLASS[]>([]);

  const apiKey: string | undefined = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string;

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        setMyLocation({
          lat: coords.latitude,
          lng: coords.longitude,
        });
        Geocode.setApiKey(apiKey);
        Geocode.fromLatLng(`${coords.latitude}`, `${coords.longitude}`)
          .then(
            (response: { results: { address_components: any; }[]; }) => {
              const address = response.results[0].address_components;
              for (let i = 0; i < address.length; i += 1) {
                for (let j = 0; j < address[i].types.length; j += 1) {
                  switch (address[i].types[j]) {
                    case 'sublocality':
                      setSearchByLocation(address[i].long_name);
                      break;
                    default:
                      break;
                  }
                }
              }
            },
          )
          .catch((error: string) => error);
      });
    }
  }, []);

  const gotoClassDate = (date: Date) => {
    setActiveDay(date);
  };

  const formattedDate = (date:any) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const search = async () => {
    const searchByDate = formattedDate(activeDay);
    setClasses([]);
    setSearched(true);
    setList(true);

    const zipRegex = /^[0-9]{5}(?:-[0-9]{4})?$/;
    let column = '';
    if (zipRegex.test(searchByLocation)) {
      column = 'zip';
    } else {
      column = 'city';
    }
    try {
      const { data: locations, error } = await supabase
        .from('locations')
        .select('*')
        .ilike(column, searchByLocation);
      if (error) {
        return error;
      }
      locations.forEach(async (location) => {
        const { data: classes } = await supabase
          .from('classes')
          .select('*, locations(*)')
          .eq('location_id', location.location_id)
          .eq('date', searchByDate)
          .order('time', { ascending: false });
        if (classes) {
          classes.forEach((Class) => {
            if (!searchByClass
            || (searchByClass && Class.name.toLowerCase().includes(searchByClass.toLowerCase()))) {
              setClasses((prevClasses) => [...prevClasses, Class]);
            }
          });
        }
      });
    } catch (err) {
      console.error('Unexpected error: ', err);
    }
    return null;
  };

  // for testing suite
  onSearch();
  //

  let classLabel: JSX.Element | null = null;
  if (searched && Classes.length <= 1) {
    classLabel = (
      <div>
        {Classes.length}
        {' '}
        class
      </div>
    );
  } else {
    classLabel = (
      <div>
        {Classes.length}
        {' '}
        classes
      </div>
    );
  }

  return (
    <div className="text-black mt-10">
      <div className="flex">
        <DatePicker
          activeDay={activeDay}
          gotoClassDate={gotoClassDate}
        />
        <input
          data-testid="search-input"
          className="w-[140px] text-center font-normal text-xs rounded-s-md"
          placeholder="Yoga, Pilates, Zumba..."
          onChange={(e) => setSearchByClass(e.target.value)}
        />
        <div className="flex items-center text-white font-normal bg-seafoam"><MapPin className="h-5 w-5" /></div>
        <input
          className="w-[100px] text-center font-normal text-xs"
          placeholder={searchByLocation}
          value={searchByLocation}
          onChange={(e) => setSearchByLocation(e.target.value)}
        />
        <button type="button" className="w-[30px] text-white justify-center font-normal text-xs bg-seafoam rounded-e-md" data-testid="search-button" onClick={search}>GO</button>
      </div>
      <div data-testid="search-result-item">
        <div className="text-orange mt-2 px-2 py-1 font-black">
          {classLabel}
        </div>
        {searched && (
          list ? (
            <div>
              <button type="button" className="text-center text-white text-xs font-black uppercase tracking-wide rounded-md bg-seafoam px-2 py-1 mt-2 mb-2" onClick={() => setList(false)}>Map</button>
              <List user_id={user_id} classes={Classes} />
            </div>
          ) : (
            <div>
              <button type="button" className="text-center text-white text-xs font-black uppercase tracking-wide rounded-md bg-seafoam px-2 py-1 mt-2 mb-2" onClick={() => setList(true)}>List</button>
              <Map user_id={user_id} center={myLocation} classes={Classes} />
            </div>
          )
        )}
      </div>
    </div>
  );
}
