import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import { supabase } from '@/lib';
import { FitnessClasses } from '@/components/FitnessClasses';
import { Class, CustomSession } from '@/lib/types';

export default async function Page() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect('/login');
  }

  const { id: userId } = session.user as CustomSession['user'];

  const getClasses = async () => {
    try {
      const { data, error } = await supabase
        .from('classes')
        .select('*,locations(*)');

      if (error) {
        throw error;
      }

      console.log('classes data & userId', data, userId);

      return data.sort(
        (a: Class, b: Class) => a.date.localeCompare(b.date),
      );
    } catch (error) {
      // console.error('Error fetching user classes:', error);
      return null;
    }
  };

  const classes = await getClasses();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-3 sm:p-8 ">
      <div className="flex flex-col items-start p-2 mt-2 bg-white shadow-md rounded-lg w-full min-h-[250px] h-full">
        <div className="flex w-full justify-between">
          <div className="w-full h-full">
            <FitnessClasses classes={classes || []} />
          </div>
        </div>
      </div>
    </main>
  );
}
