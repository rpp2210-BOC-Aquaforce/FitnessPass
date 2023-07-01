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

export const options = {
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

const labels = ['4 Weeks Ago', '3 Weeks Ago', '2 Weeks Ago', '1 Week Ago', 'This Week'];

export const data = {
  labels,
  datasets: [
    {
      fill: true,
      label: 'Average Class Attendance',
      data: [11, 4, 5, 14, 16],
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

export default function EngagementMetrics() {
  return (
    <div className="relative h-5/6">
      <Line options={options} data={data} />
    </div>
  );
}
