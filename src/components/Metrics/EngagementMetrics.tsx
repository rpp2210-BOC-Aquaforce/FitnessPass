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
        ticks: {
          precision: 0,
        },
      },
      x: {
        ticks: {
          maxRotation: 90,
          minRotation: 60,
        },
      },
    },
    maintainAspectRatio: false,
  };

  const data = {
    labels,
    datasets: [
      {
        fill: true,
        label: 'Class Attendees',
        data: classAttendees,
        borderColor: 'rgba(255, 159, 28, 1)',
        backgroundColor: 'rgba(255, 159, 28, 0.6)',
      },
    ],
  };

  return (
    <div style={{ position: 'relative', height: '55vh' }}>
      <Line options={options} data={data} />
    </div>
  );
}
