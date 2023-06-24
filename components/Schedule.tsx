'use client';

import { useState, useEffect } from 'react';
import supabase from '../lib/supabase';
import { UserClass } from '../types';
import ScheduleView from './ScheduleView';

export default function Schedule() {
  const [userClasses, setUserClasses] = useState<UserClass[]>([]);
  const getClasses = async () => {
    try {
      const { data, error } = await supabase
        .from('user_classes')
        .select(`
          *,
          classes(*,locations(*))
        `)
        .eq('user_id', 1);

      if (error) {
        throw error;
      }

      console.log('data', data);

      setUserClasses(data.sort((a, b) => a.classes.date.localeCompare(b.classes.date)));
    } catch (error) {
      console.error('Error fetching user classes:', error);
    }
  };

  useEffect(() => {
    getClasses();
  }, []);

  return (
    <ScheduleView userClasses={userClasses} setUserClasses={setUserClasses} />
  );
}
