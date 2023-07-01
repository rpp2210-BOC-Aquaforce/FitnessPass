import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import { supabase } from '@/lib';
import { ScheduleView } from '@/components';
import { UserClass, CustomSession } from '@/lib/types';

export default async function Page() {
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

      return data.sort(
        (a: UserClass, b: UserClass) => a.classes.date.localeCompare(b.classes.date),
      );
    } catch (error) {
      // console.error('Error fetching user classes:', error);
      return null;
    }
  };

  const userClasses = await getClasses();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-3 sm:p-8 ">
      <ScheduleView userClasses={userClasses || []} />
    </main>
  );
}
