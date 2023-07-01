'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { getClassPopularity } from '@/lib/api';
import { MetricsView } from '@/components/index';
import { useRouter } from 'next/navigation';

export default function Metrics() {
  const router = useRouter();

  const { data: session } = useSession();
  const studioID = (session?.user as any)?.id;

  useEffect(() => {
    console.log('****');
    // getClassPopularity(studioID);
  }, []);

  return (
    <div>
      <h1>My Metrics</h1>
      <MetricsView />
      {/* <MetricsView studioID={studioID} /> */}
      <button
        type="button"
        onClick={() => router.push(`/studio/${studioID}`)}
      >
        My Profile
      </button>
    </div>
  );
}
