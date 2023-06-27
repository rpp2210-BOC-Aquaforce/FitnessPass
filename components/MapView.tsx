'use client';

import {
  Dispatch, SetStateAction, useEffect,
} from 'react';
// import {
//   Dispatch, SetStateAction, useEffect, useState, useRef,
// } from 'react';

// import {
//   useLoadScript, GoogleMap, Marker, InfoWindow,
// } from '@react-google-maps/api';
// import Geocode from 'react-geocode';

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

export default function Map({ center, classes, setList }: MapProps) {
  useEffect(() => {
    console.log('center', center);
  });

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
