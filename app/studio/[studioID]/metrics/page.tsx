'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { getClassPopularity } from '@/lib/api';
import { MetricsView } from '@/components/index';

export default function Metrics() {
  const { data: session } = useSession();
  const studioID = (session?.user as any)?.id;

  useEffect(() => {
    console.log('****');
    // getClassPopularity('11');
  }, []);

  return (
    <div>
      <h1>Hi I am the metrics component</h1>
      <MetricsView />
      {/* <MetricsView studioID={studioID} /> */}
    </div>
  );
}
