'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import AddLocation from '../../../components/AddLocation';
import fetchStudioData from '../../../pages/api/studioProfile';
import styles from './page.module.css';
// import supabase from '../../../lib/supabase';

interface StudioInfo {
  studio_name: string;
  studio_email: string;
  photo: string;
}

export default function StudioPage() {
  const studioID = 1;
  const starterData: StudioInfo = {
    studio_name: 'Globogym',
    studio_email: 'whiteGoodman@bullByTheHorns.com',
    photo: '/images/placeholder2.png',
  };
  const [studioInfo, setStudioInfo] = useState<StudioInfo>(starterData);

  useEffect(() => {
    fetchStudioData(studioID, setStudioInfo);
  }, []);

  useEffect(() => {
    // console.log('studio info state: ', studioInfo)
  }, [studioInfo]);

  return (
    // <main className="flex flex-col items-center justify-center min-h-screen">
    <main className={styles.container}>
      {/* <div className="text-3xl font-bold mb-4"> */}
      <div className="text-3xl font-bold mb-4">
        <h1 className={styles.header}>Studio Profile</h1>
        <Image
          src="/images/placeholder1.png"
          alt="gym placeholder"
          width={250}
          height={250}
          className={styles.centeredImage}
        />
        <h5 className={styles.infoHeader}>Studio Name:</h5>
        <p className={styles.info}>{studioInfo.studio_name}</p>
        <h5 className={styles.infoHeader}>Preferred Email:</h5>
        <p className={styles.info}>{studioInfo.studio_email}</p>
        <br />
        <AddLocation />
        <br />
        <Link href="/studio/1234/addclass" className={styles.links}>Add A Class</Link>
        <br />
        <Link href="/studio/1234/metrics" className={styles.links}>View Metrics</Link>
        <br />
        <Link href="/studio/1234/view-classes" className={styles.links}>View All Classes</Link>
        <br />
        <Link href="/studio/1234/view-locations" className={styles.links}> View All Locations</Link>
      </div>

    </main>
  );
}
