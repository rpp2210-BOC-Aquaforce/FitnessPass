'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { MetricsView } from '@/components/index';
import { useRouter } from 'next/navigation';
import getEngMetrics from '@/lib/get-class-eng-metrics';
import getPopMetrics from '@/lib/get-class-pop-metrics';
import { studioPopMetric, studioEngMetric } from '@/lib/types';

export default function Metrics() {
  const router = useRouter();

  const { data: session } = useSession();
  const studioID = (session?.user as any)?.id;

  const [studioPopMetrics, setStudioPopMetrics] = useState<studioPopMetric[]>([]);
  const [studioEngMetrics, setStudioEngMetrics] = useState<studioEngMetric[]>([]);

  const getMetrics = async () => {
    console.log('???????');
    const engMetrics = await getEngMetrics(studioID);
    const popMetrics = await getPopMetrics(studioID);
    // console.log('popMetrics: ', popMetrics);
    // console.log('engMetrics: ', engMetrics);
    setStudioEngMetrics(engMetrics);
    setStudioPopMetrics(popMetrics);
  };

  useEffect(() => {
    console.log('********');
    getMetrics();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center p-3 sm:p-8">
      <div className="flex flex-col items-center mt-2 pt-2 pb-2 space-y-4 bg-white shadow-md rounded-lg w-full" style={{ height: '80vh' }}>
        <h1 className="text-solid-orange text-3xl font-semibold mt-2">My Metrics</h1>
        {studioPopMetrics.length > 0
          ? <MetricsView studioPopMetrics={studioPopMetrics} studioEngMetrics={studioEngMetrics} />
          : <p>Loading Your Metrics...</p>}
      </div>
    </main>
  );
}
