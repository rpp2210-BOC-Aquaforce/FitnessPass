/* eslint-disable camelcase */

'use client';

import {
  useEffect, useRef, useState,
} from 'react';
import {
  useLoadScript, GoogleMap, Marker, InfoWindow,
} from '@react-google-maps/api';
import Geocode from 'react-geocode';
import { ReactChildren } from '@/lib/types';
import ClassSignUp from '@/components/ClassSignUp';

function TextDiv({ children }: ReactChildren) {
  return <div className="text-seafoam text-[10px] pt-1 font-black uppercase tracking-wide">{children}</div>;
}

type LatLngLiteral = google.maps.LatLngLiteral;

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
  total_rating: number
}

type Class = {
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
  locations: {name: string, street: string, city: string, state: string, zip: string},
}

interface MapProps {
  center: LatLngLiteral | undefined;
  classes: Class[];
  user_id: any;
}

export default function Map({ center, classes, user_id }: MapProps) {
  const [activeMarker, setActiveMarker] = useState<number | null>(null);
  const [markers, setMarkers] = useState<marker[]>([]);

  const apiKey: string | undefined = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string;

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: apiKey,
  });
  Geocode.setApiKey(apiKey);

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

  const handleActiveMarker = (markerID: number | null) => {
    if (markerID === activeMarker) {
      return;
    }
    setActiveMarker(markerID);
  };

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
          total_rating,
        }: Class) => {
          const address = `${locations.street}, ${locations.city}, ${locations.state}${locations.zip}`;
          Geocode.fromAddress(address).then(
            (response) => {
              const position = response.results[0].geometry.location;
              const CLASS = {
                class_id,
                name,
                date,
                time,
                duration,
                instructor,
                address,
                position,
                locations,
                total_rating,
              };
              setMarkers((prevMarkers) => [...prevMarkers, CLASS]);
            },
            (error) => {
              console.error(error);
            },
          );
        },
      );
    }
  }, []);

  if (!isLoaded) return <div>loading...</div>;
  return (
    <div>
      <div className="items-center relative">
        <GoogleMap
          onLoad={(map) => {
            mapInstanceRef.current = map;
          }}
          mapContainerStyle={{ width: '100vw', height: '80vh' }}
        >
          <Marker
            key={0}
            position={center || { lat: 0, lng: 0 }}
            icon="http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
            onClick={() => handleActiveMarker(0)}
          >
            {activeMarker === 0 ? (
              <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                <div className="text-black">
                  My Location
                </div>
              </InfoWindow>
            ) : null}
          </Marker>

          {markers.map(({
            class_id, name, time, duration, total_rating, locations, position,
          }) => (
            <Marker
              key={class_id}
              position={position}
              icon="http://maps.google.com/mapfiles/ms/icons/green-dot.png"
              onClick={() => handleActiveMarker(class_id)}
            >
              {activeMarker === class_id ? (
                <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                  <div key={class_id} className="flex items-start mt-4 bg-white w-full">
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
                      <ClassSignUp user_id={user_id} class_id={class_id} />
                    </div>
                  </div>
                </InfoWindow>
              ) : null}
            </Marker>
          ))}
        </GoogleMap>
      </div>
    </div>
  );
}
