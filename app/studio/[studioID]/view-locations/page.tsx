'use client';

import { redirect } from 'next/navigation';
import { Session, User } from 'next-auth';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import AddLocation from '@/components/AddLocation';
import Location from '../../../../src/components/Studios/location';
import fetchLocations from '../../../../pages/api/studioLocations';
import styles from './page.module.css';

interface MyUser extends User {
  id: string;
}

interface StudioLocation {
  location_id: number;
  name: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  total_rating: number;
}

export default function StudioLocations() {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/login');
    },
  }) as { data: Session & { user?: MyUser | null }};

  const studioID = (session?.user as any)?.id;
  const [locations, setLocations] = useState<StudioLocation[]>([]);

  useEffect(() => {
    // console.log('ran useEffect block');
    fetchLocations(studioID, setLocations);
  }, []);

  useEffect(() => {
    // console.log('locations: ', locations);
  }, [locations]);

  return (
    <div className={styles.locationList}>
      <h1 className={styles.header}>All Locations</h1>
      {locations.map((location) => (
        <Location location={location} key={location.location_id} />
      ))}
      <AddLocation />
    </div>
  );
}
