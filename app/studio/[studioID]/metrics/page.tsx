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
    const engMetrics = await getEngMetrics(studioID);
    const popMetrics = await getPopMetrics(studioID);
    setStudioEngMetrics(engMetrics);
    setStudioPopMetrics(popMetrics);
  };

  useEffect(() => {
    getMetrics();
  }, []);

  return (
    <div>
      <h1>My Metrics</h1>
      {studioPopMetrics.length > 0
        ? <MetricsView studioPopMetrics={studioPopMetrics} studioEngMetrics={studioEngMetrics} />
        : <p>Loading Your Metrics...</p>}
      <button
        type="button"
        onClick={() => router.push(`/studio/${studioID}`)}
      >
        My Profile
      </button>
    </div>
  );
}
