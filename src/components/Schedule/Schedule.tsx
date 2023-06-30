'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib';
import { UserClass } from '@/lib/types';
import ScheduleView from './ScheduleView';

export default function Schedule({ userId }: { userId: number}) {
  const [userClasses, setUserClasses] = useState<UserClass[]>([]);
  const getClasses = async () => {
    try {
      const { data, error } = await supabase
        .from('user_classes')
        .select(`
          *,
          classes(*,locations(*))
        `)
        .eq('user_id', userId);

      if (error) {
        throw error;
      }

      console.log('schedule data', data);

      setUserClasses(
        data.sort((a: UserClass, b: UserClass) => a.classes.date.localeCompare(b.classes.date)),
      );
    } catch (error) {
      // console.error('Error fetching user classes:', error);
    }
  };

  useEffect(() => {
    getClasses();
  }, []);

  return (
    // <ScheduleView userClasses={userClasses} setUserClasses={setUserClasses} />
    <ScheduleView userClasses={userClasses} />
  );
}
