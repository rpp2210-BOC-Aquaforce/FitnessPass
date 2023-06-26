'use client';

import { useEffect, useState } from 'react';

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Geocode from 'react-geocode';
import moment from 'moment';
import supabase from '../../../../lib/supabase';

import Map from '../../../../components/Map';
import List from '../../../../components/List';

type LatLngLiteral = google.maps.LatLngLiteral;
type ValuePiece = Date | null;

export default function Search() {
  type CLASS = {
    class_id: number,
    date: string,
    duration: number,
    instructor: string,
    locations: {name: string, street: string, city: string, state: string, zip: string},
    name: string,
    time: string,
  }

  const [searchByClass, setSearchByClass] = useState('');
  const [searchByLocation, setSearchByLocation] = useState('');
  const [selectedDate, setSelectedDate] = useState<ValuePiece|[ValuePiece, ValuePiece]>(new Date());

  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  const [list, setList] = useState(false);
  const [searched, setSearched] = useState(false);

  const [myLocation, setMyLocation] = useState<LatLngLiteral>();
  const [Classes, setClasses] = useState<CLASS[]>([]);

  const apiKey: string | undefined = process.env.GOOGLE_MAPS_API_KEY as string;

  useEffect(() => {
    if ('geolocation' in navigator) {
      // Retrieve latitude & longitude coordinates from `navigator.geolocation` Web API
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        setMyLocation({
          lat: coords.latitude,
          lng: coords.longitude,
        });

        Geocode.setApiKey(apiKey);
        Geocode.fromLatLng(`${coords.latitude}`, `${coords.longitude}`)
          .then(
            (response) => {
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
          .catch((error) => error);
      });
    }
  }, []);

  const handleDateChange = (date: ValuePiece|[ValuePiece, ValuePiece]) => {
    setSelectedDate(date);
    setShowCalendar(false);
  };

  const convertToMoment = (date: Date | Date[] | ValuePiece | [ValuePiece, ValuePiece]):
  moment.Moment | null => {
    if (date instanceof Date) {
      return moment(date);
    }
    if (Array.isArray(date) && date.length > 0 && date[0] instanceof Date) {
      return moment(date[0]);
    }
    if (date instanceof Object && 'value' in date && date.value instanceof Date) {
      return moment(date.value);
    }
    return null;
  };

  const search = async () => {
    const searchByDate = convertToMoment(selectedDate)?.format('YYYY-MM-DD');

    setClasses([]);
    setSearched(true);
    setList(true);
    const zipRegex = /^[0-9]{5}(?:-[0-9]{4})?$/;
    if (zipRegex.test(searchByLocation)) {
      try {
        const { data: locations, error } = await supabase
          .from('locations')
          .select('*')
          .ilike('zip', searchByLocation);
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
            classes.forEach(({ Class }: {Class: CLASS}) => {
              if (!searchByClass || (searchByClass && Class.name === searchByClass)) {
                setClasses((prevClasses) => [...prevClasses, Class]);
              }
            });
          }
        });
      } catch (err) {
        return null;
      }
      return null;
    }
    try {
      const { data: locations, error } = await supabase
        .from('locations')
        .select('*')
        .ilike('city', searchByLocation);
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
            value={selectedDate ? convertToMoment(selectedDate)?.format('YYYY-MM-DD') : ''}
            onFocus={() => setShowCalendar(true)}
            onChange={() => { setShowCalendar(false); }}
            className="text-black text-center"
          />
          <button type="button" className="bg-blue-500 text-white" onClick={search}>GO</button>
        </div>
        {showCalendar ? (
          <div>
            <Calendar
              calendarType="US"
              minDate={new Date()}
              value={selectedDate}
              onChange={handleDateChange}
              className="fixed"
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
