'use client';

import { useEffect, useState } from 'react';

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Geocode from 'react-geocode';

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
  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        setMyLocation({
          lat: coords.latitude,
          lng: coords.longitude,
        });
        Geocode.setApiKey('AIzaSyAxLZBfmUBWLcaK0WibtdtCWlmPvuB0Aws');
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

  const search = () => {
    const searchByDate = formattedDate(selectedDate);
    setClasses([]);
    setSearched(true);
    setList(true);
    const zipRegex = /^[0-9]{5}(?:-[0-9]{4})?$/;
    if (zipRegex.test(searchByLocation)) {
      console.log('zipcode');
    } else {
      console.log('city name');
    }
    console.log('searchByClass', searchByClass);
    console.log('searchByLocation', searchByLocation);
    console.log('searchByDate', searchByDate);
    console.log('myLocation', myLocation);
    console.log('list', list);
    console.log('searched', searched);
    console.log('Classes', Classes);
  };

  return (
    <div className="text-black">
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
  );
}
