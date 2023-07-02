'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { getClassPopularity, getStudioClasses, getClassesByDate } from '@/lib/api';
import { MetricsView } from '@/components/index';
import { useRouter } from 'next/navigation';
import { format, subWeeks } from 'date-fns';

type studioPopMetric = {
  name: string;
  popularity: number;
};

type studioEngMetric = {
  week: string;
  attendance: number;
};

export default function Metrics() {
  const router = useRouter();

  const { data: session } = useSession();
  const studioID = (session?.user as any)?.id;

  const [studioPopMetrics, setStudioPopMetrics] = useState<studioPopMetric[]>([]);
  const [studioEngMetrics, setStudioEngMetrics] = useState<studioEngMetric[]>([]);

  const getPopMetrics = async () => {
    try {
      const data = await getStudioClasses(studioID);
      const metricsMap = new Map();

      await Promise.all(data.map(async (item: { class_id: string; name: string; }) => {
        const popularity = await getClassPopularity(item.class_id);
        if (metricsMap.has(item.name)) {
          metricsMap.set(item.name, metricsMap.get(item.name) + popularity);
        } else {
          metricsMap.set(item.name, popularity);
        }
      }));

      const combinedMetrics = Array.from(metricsMap.entries()).map(([name, popularity]) => ({
        name,
        popularity,
      }));

      setStudioPopMetrics(combinedMetrics);
    } catch (err) {
      console.error(err);
    }
  };

  const getEngMetrics = async () => {
    const today = format(new Date(), 'yyyy-MM-dd');
    const lastWeek = format(subWeeks(new Date(), 1), 'yyyy-MM-dd');
    const twoWeeksAgo = format(subWeeks(new Date(), 2), 'yyyy-MM-dd');
    const threeWeeksAgo = format(subWeeks(new Date(), 3), 'yyyy-MM-dd');
    const fourWeeksAgo = format(subWeeks(new Date(), 4), 'yyyy-MM-dd');
    const fiveWeeksAgo = format(subWeeks(new Date(), 5), 'yyyy-MM-dd');

    const weeks = [
      { label: '4 weeks ago', start: fiveWeeksAgo, end: fourWeeksAgo },
      { label: '3 weeks ago', start: fourWeeksAgo, end: threeWeeksAgo },
      { label: '2 weeks ago', start: threeWeeksAgo, end: twoWeeksAgo },
      { label: 'Last week', start: twoWeeksAgo, end: lastWeek },
      { label: 'This week', start: lastWeek, end: today },
    ];

    const attendancePromises = weeks.map(async (week) => {
      const data = await getClassesByDate(studioID, week.start, week.end);

      const attendance = await Promise.all(
        data.map(async (item: { class_id: string; date: string }) => {
          const attendees = await getClassPopularity(item.class_id);
          return attendees;
        }),
      );

      const totalAttendance = attendance.reduce((acc, curr) => acc + curr, 0);
      return { week: week.label, attendance: totalAttendance };
    });

    try {
      const attendanceData = await Promise.all(attendancePromises);
      setStudioEngMetrics(attendanceData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getPopMetrics();
    getEngMetrics();
  }, []);

  return (
    <div>
      <h1>My Metrics</h1>
      <MetricsView studioPopMetrics={studioPopMetrics} studioEngMetrics={studioEngMetrics} />
      <button
        type="button"
        onClick={() => router.push(`/studio/${studioID}`)}
      >
        My Profile
      </button>
    </div>
  );
}
