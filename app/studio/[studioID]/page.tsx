'use client';

import { redirect } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { Session, User } from 'next-auth';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import fetchStudioData from '../../../pages/api/studioProfile';
import styles from './page.module.css';

interface StudioInfo {
  studio_name: string;
  studio_email: string;
  photo: string;
}

interface MyUser extends User {
  id: string;
}

export default function StudioPage() {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/login');
    },
  }) as { data: Session & { user?: MyUser | null }};

  const studioID = (session?.user as any)?.id;

  const starterData: StudioInfo = {
    studio_name: session?.user?.name || '',
    studio_email: session?.user?.email || '',
    photo: session?.user?.image || '',
  };
  const [studioInfo, setStudioInfo] = useState<StudioInfo>(starterData);

  useEffect(() => {
    fetchStudioData(studioID, setStudioInfo);
  }, [studioID]);

  return (
    <main className={styles.container}>
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
        <Link href={`/studio/${studioID}/add-location`} className={styles.links}>Add A Location</Link>
        <br />
        <Link href={`/studio/${studioID}/addclass`} className={styles.links}>Add A Class</Link>
        <br />
        <Link href={`/studio/${studioID}/metrics`} className={styles.links}>View Metrics</Link>
        <br />
        <Link href={`/studio/${studioID}/view-classes`} className={styles.links}>View All Classes</Link>
        <br />
        <Link href={`/studio/${studioID}/view-locations`} className={styles.links}> View All Locations</Link>
      </div>

    </main>
  );
}
