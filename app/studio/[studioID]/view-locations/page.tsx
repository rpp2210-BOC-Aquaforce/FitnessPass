'use client';

// import Location from './location';

import React, { useEffect } from 'react';
import styles from './page.module.css';
import supabase from '../../../../lib/supabase';

export default function StudioLocations() {
  const studioID = 1;
  const fetchStudioLocations = async () => {
    const { data, error } = await supabase
      .from('locations')
      .select('*')
      .eq('studio_id', studioID);
    if (error) {
      console.error(error);
    } else {
      // Data
      console.log('Fetch Data: ', data);
      setStudioLocs(data);
    }
    console.log('Studio Locations: ', studioLocs);
  };

  useEffect(() => {
    fetchStudioLocations();
  }, []);
  return (
    <div className={styles.locationList}>
      <h1 className={styles.header}>All Locations</h1>
      <div>A location</div>
      <div>Look, another one</div>
      <div>Yep, one more</div>
      <div>Nope, this is just text.</div>
    </div>
  );
}
