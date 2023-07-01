'use client';

// import Location from './location';
// import React, { useEffect, useState } from 'react';
import AddLocation from '@/components/AddLocation';
import styles from './page.module.css';

export default function StudioLocations() {
  // const studioID = 1;
  // const [locations, setLocations] = useState([]);

  // const fetchStudioLocations = async () => {
  //   const { data, error } = await supabase
  //     .from('locations')
  //     .select('*')
  //     .eq('studio_id', studioID);
  //   if (error) {
  //     // console.log('error in fetchStudioLocations', error);
  //   } else {
  //     // Data
  //     // console.log('Fetched Data: ', data);
  //     // setLocations(data);
  //   }
  //   // console.log('Studio Locations: ', locations);
  // };

  // useEffect(() => {
  //   fetchStudioLocations();
  // }, []);

  return (
    <div className={styles.locationList}>
      <h1 className={styles.header}>All Locations</h1>
      <div>A location</div>
      <div>Look, another one</div>
      <div>Yep, one more</div>
      <div>Nope, this is just text.</div>
      <AddLocation />
    </div>
  );
}
