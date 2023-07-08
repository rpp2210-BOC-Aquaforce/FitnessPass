import { getClassesByDate } from '@/lib/studio-classes';
import { format, subWeeks } from 'date-fns';

export default async function getEngMetrics(studioID: string) {
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

  const promises = weeks.map(async (week) => {
    const data = await getClassesByDate(studioID, week.start, week.end);

    const weekData = data.reduce((acc) => ({
      week: week.label,
      attendance: acc.attendance + 1,
    }), { week: week.label, attendance: 0 });

    return weekData;
  });

  const groupedEngData = await Promise.all(promises);

  try {
    return groupedEngData;
  } catch (err) {
    return ([{ week: null, attendance: null }]);
  }
}
