/* eslint-disable camelcase */

'use client';

import { useEffect, useState } from 'react';

import {
  useLoadScript, GoogleMap, Marker, InfoWindow,
} from '@react-google-maps/api';
import Geocode from 'react-geocode';

export default function Map({ center, classes, setMap }) {
  const [activeMarker, setActiveMarker] = useState(null);
  const [markers, setMarkers] = useState([]);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyAxLZBfmUBWLcaK0WibtdtCWlmPvuB0Aws',
  });

  Geocode.setApiKey('AIzaSyAxLZBfmUBWLcaK0WibtdtCWlmPvuB0Aws');

  useEffect(() => {
    classes.forEach(({
      class_id, name, date, time, duration, instructor, locations,
    }) => {
      const address = `${locations.street}, ${locations.city}, ${locations.state}${locations.zip}`;
      Geocode.fromAddress(address).then(
        (response) => {
          const position = response.results[0].geometry.location;
          const Class = {
            class_id, name, date, time, duration, instructor, address, position, locations,
          };
          setMarkers((markers) => [...markers, Class]);
        },
        (error) => {
          console.error(error);
        },
      );
    });
  }, []);

  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

  const handleOnLoad = (map) => {
    const bounds = new google.maps.LatLngBounds();
    markers.forEach(({ position }) => bounds.extend(position));
    bounds.extend(center);
    map.fitBounds(bounds);
  };

  if (classes.length === 0) return <div>0 result</div>;
  if (!isLoaded) return <div>loading...</div>;
  return (
    <div>
      <div>
        {classes.length}
        {' '}
        results
      </div>
      <button type="button" className="bg-green-500 text-white" onClick={() => setMap(false)}>List</button>
      <div className="items-center">
        <GoogleMap
          zoom={10}
          // center={center}
          onLoad={handleOnLoad}
          mapContainerStyle={{ width: '100vw', height: '80vh' }}
        >
          <Marker
            position={center}
            icon="http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
            onClick={() => handleActiveMarker('myLocation')}
          >
            {activeMarker === 'myLocation' ? (
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
