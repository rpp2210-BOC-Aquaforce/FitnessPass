'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { getClassPopularity, getStudioClasses } from '@/lib/api';
import { MetricsView } from '@/components/index';
import { useRouter } from 'next/navigation';

export default function Metrics() {
  const router = useRouter();

  const { data: session } = useSession();
  const studioID = (session?.user as any)?.id;

  const [studioMetrics, setStudioMetrics] = useState([]);

  const getMetrics = async () => {
    await getStudioClasses(studioID)
      .then((data) => {
        console.log('Client-side starting metrics data: ', data);
        const metrics = [];
        data.forEach((item) => {
          getClassPopularity(item.class_id)
            .then((popularity) => {
              console.log(`Popularity for ${item.class_id}: `, popularity);
              console.log({ class_id: item.class_id, name: item.name, popularity });
              metrics.push({ class_id: item.class_id, name: item.name, popularity });
              setStudioMetrics(metrics);
            })
            .catch((err) => {
              console.error(err);
            });
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  useEffect(() => {
    console.log('****');
    getMetrics(studioID);
  }, []);

  return (
    <div>
      <h1>My Metrics</h1>
      <MetricsView studioMetrics={studioMetrics} />
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
