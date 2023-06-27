/* eslint-disable camelcase */

'use client';

import {
  Dispatch, SetStateAction, useEffect, useRef, useState,
} from 'react';

import {
  useLoadScript,
} from '@react-google-maps/api';

// import {
//   useLoadScript, GoogleMap, Marker, InfoWindow,
// } from '@react-google-maps/api';
import Geocode from 'react-geocode';

type CLASS = {
  class_id: number,
  date: string,
  duration: number,
  instructor: string,
  locations: {name: string, street: string, city: string, state: string, zip: string},
  name: string,
  time: string,
}

type LatLngLiteral = google.maps.LatLngLiteral;
interface MapProps {
  center: LatLngLiteral | undefined;
  classes: CLASS[];
  setList: Dispatch<SetStateAction<boolean>>;
}

type marker = {
  class_id: number,
  date: string,
  duration: number,
  instructor: string,
  locations: {name: string, street: string, city: string, state: string, zip: string},
  name: string,
  time: string,
  address: string,
  position: LatLngLiteral,
}

export default function Map({ center, classes, setList }: MapProps) {
  const [markers, setMarkers] = useState<marker[]>([]);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyAxLZBfmUBWLcaK0WibtdtCWlmPvuB0Aws',
  });
  Geocode.setApiKey('AIzaSyAxLZBfmUBWLcaK0WibtdtCWlmPvuB0Aws');

  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  if (isLoaded && mapInstanceRef.current && markers.length > 0) {
    const bounds = new google.maps.LatLngBounds();
    if (center) {
      bounds.extend(center);
    }
    markers.forEach(({ position }) => {
      bounds.extend(position);
    });
    mapInstanceRef.current.fitBounds(bounds);
  }

  useEffect(() => {
    if (Array.isArray(classes)) {
      classes.forEach(
        ({
          class_id,
          name,
          date,
          time,
          duration,
          instructor,
          locations,
        }: CLASS) => {
          const address = `${locations.street}, ${locations.city}, ${locations.state}${locations.zip}`;
          Geocode.fromAddress(address).then(
            (response) => {
              const position = response.results[0].geometry.location;
              const Class = {
                class_id,
                name,
                date,
                time,
                duration,
                instructor,
                address,
                position,
                locations,
              };
              setMarkers((prevMarkers) => [...prevMarkers, Class]);
            },
            (error) => {
              console.error(error);
            },
          );
        },
      );
    }
  }, []);

  if (!Array.isArray(classes) || classes.length === 0) return <div>0 result</div>;
  if (!isLoaded) return <div>loading...</div>;
  return (
    <div>
      <div>
        {classes.length}
        {' '}
        results
      </div>
      <button type="button" className="bg-green-500 text-white" onClick={() => setList(true)}>List</button>
    </div>
  );
}
