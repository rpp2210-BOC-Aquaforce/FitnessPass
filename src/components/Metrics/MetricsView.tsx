'use client';

import React, { useState, useEffect } from 'react';
import PopularityMetrics from './PopularityMetrics';
import EngagementMetrics from './EngagementMetrics';

export default function MetricsView({ studioMetrics }) {
  const [view, setView] = useState('popularity');

  const handleClick = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    view === 'popularity' ? setView('engagement') : setView('popularity');
  };

  useEffect(() => {
    setView(view);
    console.log('Metrics in metrics view component: ', studioMetrics);
  }, [view, studioMetrics]);
  return (
    <div>
      {/* <h4>Hi I am the metrics view component</h4> */}
      {view === 'popularity' ? (
        <div>
          <h2>Class Popularity</h2>
          <PopularityMetrics studioMetrics={studioMetrics} />
          <button type="button" onClick={handleClick}>View Class Engagement</button>
        </div>
      ) : null}
      {view === 'engagement' ? (
        <div>
          <h2>Class Engagement</h2>
          <EngagementMetrics />
          <button type="button" onClick={handleClick}>View Class Popularity</button>
        </div>
      ) : null}
    </div>
  );
};
