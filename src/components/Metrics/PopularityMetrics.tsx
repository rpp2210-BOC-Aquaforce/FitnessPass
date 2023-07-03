import React from 'react';

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { studioPopMetric } from '@/lib/types';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PopularityMetrics({
  studioPopMetrics,
}: {
  studioPopMetrics: studioPopMetric[];
}) {
  const classNames = studioPopMetrics.map((studio) => studio.name);
  const classAttendees = studioPopMetrics.map((studio) => studio.popularity);

  const data = {
    labels: classNames,
    datasets: [
      {
        label: '# of Attendees',
        data: classAttendees,
        backgroundColor: [
          'rgba(255, 159, 28, 0.6)',
          'rgba(180, 173, 234, 0.6)',
          'rgba(91, 142, 125, 0.6)',
          'rgba(231, 29, 54, 0.6)',
          'rgba(46, 196, 182, 0.6)',
        ],
        borderColor: [
          'rgba(255, 159, 28, 1)',
          'rgba(180, 173, 234, 1)',
          'rgba(91, 142, 125, 1)',
          'rgba(231, 29, 54, 1)',
          'rgba(46, 196, 182, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="relative h-5/6">
      <Doughnut data={data} />
    </div>
  );
}
