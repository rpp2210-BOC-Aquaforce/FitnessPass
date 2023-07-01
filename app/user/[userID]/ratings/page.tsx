import React from 'react';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { Ratings } from '@/components';
import { CustomSession, UserClass, Class } from '@/lib/types';
import { authOptions } from '@/lib/auth';
import { supabase } from '@/lib';

export default async function RatingsPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect('/login');
  }

  const { id: userId } = session.user as CustomSession['user'];

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

      console.log('schedule data & userId', data, userId);

      const classes = data.map((userClass: UserClass) => {
        const { classes: classData } = userClass;
        return { ...classData, classRating: userClass.class_rating };
      });

      return classes.sort(
        (a: Class, b: Class) => a.date.localeCompare(b.date),
      );
    } catch (error) {
      // console.error('Error fetching user classes:', error);
      return null;
    }
  };

  const fitnessClasses = await getClasses();

  return (
    <main className="flex min-h-screen flex-col items-center p-3 sm:p-8 w-full">
      <Ratings classes={fitnessClasses || []} />
    </main>
  );
}
