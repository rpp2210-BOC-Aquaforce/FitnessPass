'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { getClassPopularity, getStudioClasses, getClassesByDate } from '@/lib/api';
import { MetricsView } from '@/components/index';
import { useRouter } from 'next/navigation';
import { format, subWeeks } from 'date-fns';

export default function Metrics() {
  const router = useRouter();

  const { data: session } = useSession();
  const studioID = (session?.user as any)?.id;

  const [studioPopMetrics, setStudioPopMetrics] = useState([]);
  const [studioEngMetrics, setStudioEngMetrics] = useState([]);

  const getPopMetrics = async () => {
    await getStudioClasses(studioID)
      .then((data) => {
        // console.log('Client-side starting metrics data: ', data);
        const metrics: any[] | PromiseLike<any[]> = [];
        data.forEach(async (item: { class_id: string; name: string; }) => {
          await getClassPopularity(item.class_id)
            .then((popularity) => {
              metrics.push({ class_id: item.class_id, name: item.name, popularity });
            })
            .catch((err) => {
              console.error(err);
            });
        });
        return metrics;
      })
      .then((metricsData) => {
        setStudioPopMetrics(metricsData);
      })
      .catch((err) => {
        console.error(err);
      });
    console.log('Studio Metrics: ', studioPopMetrics);
  };

  const getEngMetrics = async () => {
    const today = format(new Date(), 'yyyy-MM-dd');
    const lastWeek = format(subWeeks(new Date(), 1), 'yyyy-MM-dd');
    const twoWeeksAgo = format(subWeeks(new Date(), 2), 'yyyy-MM-dd');
    const threeWeeksAgo = format(subWeeks(new Date(), 3), 'yyyy-MM-dd');
    const fourWeeksAgo = format(subWeeks(new Date(), 4), 'yyyy-MM-dd');
    const fiveWeeksAgo = format(subWeeks(new Date(), 5), 'yyyy-MM-dd');

    const weeks = [
      { label: 'This week', start: lastWeek, end: today },
      { label: 'One week ago', start: twoWeeksAgo, end: lastWeek },
      { label: 'Two weeks ago', start: threeWeeksAgo, end: twoWeeksAgo },
      { label: 'Three weeks ago', start: fourWeeksAgo, end: threeWeeksAgo },
      { label: 'Four weeks ago', start: fiveWeeksAgo, end: fourWeeksAgo },
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
      console.log('Attendance data:', attendanceData);
      setStudioEngMetrics(attendanceData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    console.log('Metrics STUDIO ID: ', studioID);
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
