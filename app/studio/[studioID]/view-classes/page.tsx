'use client';

import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Session, User } from 'next-auth';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
// import Class from '../../../../src/components/Studios/class';
import Class from '@/components/Studios/class';
import fetchClasses from '../../../../pages/api/studioClasses';
import deleteClass from '../../../../pages/api/deleteClass';
import styles from './page.module.css';

interface MyUser extends User {
  id: string;
}

interface StudioClass {
  class_id: number;
  location_id: number;
  name: string;
  description: string;
  instructor: string;
  date: string;
  time: string;
  duration: number;
  total_rating: number;
  num_ratings: number;
}

export default function StudioClasses() {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/login');
    },
  }) as { data: Session & { user?: MyUser | null }};

  const studioID = (session?.user as any)?.id;
  const [classes, setClasses] = useState<StudioClass[]>([]);

  useEffect(() => {
    fetchClasses(studioID, setClasses);
  }, [studioID]);

  const handleClassDelete = async (classID: number) => {
    await deleteClass(classID);
    // Remove the deleted class from the state
    setClasses(classes.filter((classObj) => classObj.class_id !== classID));
  };

  return (
    <div className={styles.classesList}>
      <h1 className={styles.header}>All Classes</h1>
      {classes.map((classObj) => (
        <Class
          classObj={classObj}
          key={classObj.class_id}
          onDelete={() => handleClassDelete(classObj.class_id)}
        />
      ))}
      <Link href={`/studio/${studioID}/addclass`} className={styles.links}>
        Add A Class
      </Link>
    </div>
  );
}
