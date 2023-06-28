'use client';

import { useEffect, useState } from 'react';

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Geocode from 'react-geocode';
import supabase from '../../../../lib/supabase';

import List from '../../../../components/Search/ListView';
import Map from '../../../../components/Search/MapView';

type ValuePiece = Date | null;
type LatLngLiteral = google.maps.LatLngLiteral;

type CLASS = {
  class_id: number,
  date: string,
  duration: number,
  instructor: string,
  locations: {name: string, street: string, city: string, state: string, zip: string},
  name: string,
  time: string,
}

export default function Search() {
  const [searchByClass, setSearchByClass] = useState('');
  const [searchByLocation, setSearchByLocation] = useState('');
  const [selectedDate, setSelectedDate] = useState<ValuePiece|[ValuePiece, ValuePiece]>(new Date());

  const [showCalendar, setShowCalendar] = useState<boolean>(false);
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

  const handleDateChange = (date: ValuePiece|[ValuePiece, ValuePiece]) => {
    setSelectedDate(date);
    setShowCalendar(false);
  };

  const formattedDate = (date:any) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const search = async () => {
    const searchByDate = formattedDate(selectedDate);
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
          .eq('date', searchByDate);
        if (classes) {
          classes.forEach((Class) => {
            if (!searchByClass || (searchByClass && Class.name === searchByClass)) {
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

  return (
    <div className="text-black mt-10">
      <div className="flex">
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
          className="text-black text-center"
          value={selectedDate instanceof Date
            ? selectedDate.toISOString().split('T')[0]
            : ''}
          onFocus={() => setShowCalendar(true)}
          onChange={() => setShowCalendar(false)}
        />
        <button type="button" className="bg-blue-500 text-white" onClick={search}>GO</button>
      </div>
      <div>
        {showCalendar ? (
          <div>
            <Calendar
              className="fixed"
              calendarType="US"
              minDate={new Date()}
              value={selectedDate}
              onChange={handleDateChange}
            />
          </div>
        ) : ''}
      </div>
      <div>
        {searched && (
          list ? (
            <List classes={Classes} setList={setList} />
          ) : (
            <Map center={myLocation} classes={Classes} setList={setList} />
          )
        )}
      </div>
    </div>
  );
}
