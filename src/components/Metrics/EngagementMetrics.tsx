/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { studioEngMetric } from '@/lib/types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
);

export default function EngagementMetrics({
  studioEngMetrics,
}: {
  studioEngMetrics: studioEngMetric[];
}) {
  const labels = studioEngMetrics.map((studio) => studio.week);
  const classAttendees = studioEngMetrics.map(
    (studio) => studio.attendance,
  );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    scales: {
      y: {
        min: 0,
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        fill: true,
        label: 'Class Attendees',
        data: classAttendees,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  return (
    <div className="relative h-5/6">
      <Line options={options} data={data} />
    </div>
  );
}
