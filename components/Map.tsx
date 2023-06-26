/* eslint-disable camelcase */

'use client';

import {
  Dispatch, SetStateAction, useEffect, useState, useRef,
} from 'react';

import {
  useLoadScript, GoogleMap, Marker, InfoWindow,
} from '@react-google-maps/api';
import Geocode from 'react-geocode';

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

interface MapProps {
  center: LatLngLiteral | undefined;
  classes: CLASS[];
  setList: Dispatch<SetStateAction<boolean>>;
}
export default function Map({ center, classes, setList }: MapProps) {
  const [activeMarker, setActiveMarker] = useState<number | null>(null);
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

  // const handleOnLoad = (map:google.maps.Map) => {
  //   const bounds = new google.maps.LatLngBounds();
  //   markers.forEach(({ position }) => {
  //     bounds.extend(position);
  //   });
  //   if (center) {
  //     bounds.extend(center);
  //   }
  //   map.fitBounds(bounds);
  // };

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

  const handleActiveMarker = (markerID: number | null) => {
    if (markerID === activeMarker) {
      return;
    }
    setActiveMarker(markerID);
  };

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
      <div className="items-center">
        <GoogleMap
          onLoad={(map) => {
            mapInstanceRef.current = map;
            // handleOnLoad(map);
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
            class_id, name, date, time, duration, instructor, address, position, locations,
          }) => (
            <Marker
              key={class_id}
              position={position}
              icon="http://maps.google.com/mapfiles/ms/icons/green-dot.png"
              onClick={() => handleActiveMarker(class_id)}
            >
              {activeMarker === class_id ? (
                <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                  <div className="text-black">
                    <h3>
                      {name}
                      {' - '}
                      {locations.name}
                    </h3>
                    <h5>{instructor}</h5>
                    <div>
                      {date}
                      {' '}
                      {time}
                    </div>
                    <div>
                      {duration}
                      {' minutes'}
                    </div>
                    <div>
                      {address}
                    </div>
                    <button type="button" className="bg-orange-500 text-white">Sign Up</button>
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
