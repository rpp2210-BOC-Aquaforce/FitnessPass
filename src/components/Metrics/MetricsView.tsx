'use client';

import React, { useState, useEffect } from 'react';
import { studioPopMetric, studioEngMetric } from '@/lib/types';
import PopularityMetrics from './PopularityMetrics';
import EngagementMetrics from './EngagementMetrics';
import styles from './metricsStyles.module.css';

export default function MetricsView({
  studioPopMetrics,
  studioEngMetrics,
}: {
  studioPopMetrics: studioPopMetric[];
  studioEngMetrics: studioEngMetric[];
}) {
  const [view, setView] = useState('popularity');

  const handleClick = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setView(view === 'popularity' ? 'engagement' : 'popularity');
  };

  useEffect(() => {
    setView(view);
  }, [view]);
  return (
    <div className={styles.metrics}>
      {view === 'popularity' ? (
        <div className="text-xl font-semibold flex flex-col justify-center justify-items-center">
          <h2>Class Popularity</h2>
          <PopularityMetrics studioPopMetrics={studioPopMetrics} />
          <button
            type="button"
            data-testid="metric_pop_toggle"
            onClick={handleClick}
          >
            View Class Engagement
          </button>
        </div>
      ) : null}
      {view === 'engagement' ? (
        <div className="text-xl font-semibold flex flex-col justify-center justify-items-center">
          <h2>Class Engagement</h2>
          <EngagementMetrics studioEngMetrics={studioEngMetrics} />
          <button
            type="button"
            data-testid="metric_eng_toggle"
            onClick={handleClick}
          >
            View Class Popularity
          </button>
        </div>
      ) : null}
    </div>
  );
}
