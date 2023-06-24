/* eslint-disable no-nested-ternary */
/* eslint-disable no-shadow */
/* eslint-disable no-await-in-loop */
/* eslint-disable camelcase */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-plusplus */
/* eslint-disable default-case */
/* eslint-disable no-case-declarations */

'use client';

import { SetStateAction, useEffect, useState } from 'react';

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Geocode from 'react-geocode';
import Moment from 'moment';
import supabase from '../../../lib/supabase';
import { Map, List } from '../../../components/index';

type LatLngLiteral = google.maps.LatLngLiteral;

export default function Search() {
  const [searchByClass, setSearchByClass] = useState('');
  const [searchByLocation, setSearchByLocation] = useState('');
  const [date, setDate] = useState(new Date());

  const [showCalendar, setShowCalendar] = useState(false);
  const [map, setMap] = useState(false);
  const [searched, setSearched] = useState(false);

  const [myLocation, setMyLocation] = useState<LatLngLiteral>();
  const [Classes, setClasses] = useState([]);

  useEffect(() => {
    if ('geolocation' in navigator) {
      // Retrieve latitude & longitude coordinates from `navigator.geolocation` Web API
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        setMyLocation({
          lat: coords.latitude,
          lng: coords.longitude,
        });

        Geocode.setApiKey('AIzaSyAxLZBfmUBWLcaK0WibtdtCWlmPvuB0Aws');
        Geocode.fromLatLng(coords.latitude, coords.longitude)
          .then(
            (response) => {
              const address = response.results[0].address_components;
              for (let i = 0; i < address.length; i++) {
                for (let j = 0; j < address[i].types.length; j++) {
                  switch (address[i].types[j]) {
                    case 'sublocality':
                      const City = address[i].long_name;
                      setSearchByLocation(City);
                      break;
                  }
                }
              }
            },
            (error) => {
              console.error(error);
            },
          );
      });
    }
  }, []);

  const handleDate = (value: SetStateAction<Date>) => {
    setDate(value);
    setShowCalendar(false);
  };

  const search = async () => {
    const searchByDate = Moment(date).format('YYYY-MM-DD');

    setClasses([]);
    setSearched(true);
    const zipRegex = /^[0-9]{5}(?:-[0-9]{4})?$/;
    if (zipRegex.test(searchByLocation)) {
      const { data: locations, error } = await supabase
        .from('locations')
        .select('*')
        .ilike('zip', searchByLocation);
      if (error) {
        console.error('supabase error', error);
      } else {
        locations.forEach(async ({ location_id }) => {
          const { data: classes, error } = await supabase
            .from('classes')
            .select('*, locations(*)')
            .eq('location_id', location_id)
            .eq('date', searchByDate);
          if (error) {
            console.error('supabase error', error);
          } else {
            classes.forEach((Class) => {
              if (!searchByClass || (searchByClass && Class.name === searchByClass)) {
                setClasses((Classes) => [...Classes, classes]);
              }
            });
          }
        });
      }
    } else {
      const { data: locations, error } = await supabase
        .from('locations')
        .select('*')
        .ilike('city', searchByLocation);
      if (error) {
        console.error('supabase error', error);
      } else {
        locations.forEach(async ({ location_id }) => {
          const { data: classes, error } = await supabase
            .from('classes')
            .select('*, locations(*)')
            .eq('location_id', location_id)
            .eq('date', searchByDate);
          if (error) {
            console.error('supabase error', error);
          } else {
            classes.forEach((Class) => {
              if (!searchByClass || (searchByClass && Class.name === searchByClass)) {
                setClasses((Classes) => [...Classes, Class]);
              }
            });
          }
        });
      }
    }
  };

  return (
    <div>
      <div className="text-black">
        <div className="flex ">
          <input
            placeholder="Yoga, Pilates, Zumba..."
            onChange={(e) => setSearchByClass(e.target.value)}
            onFocus={() => setShowCalendar(false)}
          />
          <input
            placeholder={searchByLocation}
            value={searchByLocation}
            onChange={(e) => setSearchByLocation(e.target.value)}
            onFocus={() => setShowCalendar(false)}
          />
        </div>
        <div className="flex">
          <input
            value={date.toLocaleDateString()}
            onFocus={() => setShowCalendar(true)}
            onChange={() => { setShowCalendar(false); }}
            className="text-black text-center"
          />
          <button type="button" className="bg-blue-500 text-white" onClick={search}>GO</button>
        </div>
        {showCalendar ? <div><Calendar calendarType="US" minDate={new Date()} value={date} onChange={handleDate} /></div> : ''}
      </div>
      <div>
        {searched && map ? <Map center={myLocation} classes={Classes} setMap={setMap} />
          : searched && !map ? <List classes={Classes} setMap={setMap} />
            : ''}
      </div>
    </div>
  );
}
