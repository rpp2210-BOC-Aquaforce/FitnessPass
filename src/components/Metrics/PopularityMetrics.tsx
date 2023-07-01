import React from 'react';

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  labels: ["Zumba", "HIIT Core", "Yoga Flow"],
  datasets: [
    {
      label: "# of Attendees",
      data: [30, 6, 12],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
      ],
      borderWidth: 1
    }
  ]
};

export default function PopularityMetrics() {
  return (
    <div className="relative h-5/6">
      <Doughnut data={data} />
    </div>
  );
}
