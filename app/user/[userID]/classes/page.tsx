import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import { supabase } from '@/lib';
import { FitnessClasses } from '@/components/FitnessClasses';
import { Class } from '@/lib/types';

export default async function Page() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect('/login');
  }

  const getClasses = async () => {
    try {
      const { data, error } = await supabase
        .from('classes')
        .select('*,locations(*,studio_users(photo))');

      if (error) {
        throw error;
      }

      const classes = data.map((fitnessClass) => {
        const { locations: loc } = fitnessClass;
        const { studio_users: studio } = loc;
        return {
          ...fitnessClass,
          locations: {
            ...loc,
            photo_url: studio?.photo,
          },
        };
      });

      return classes.sort(
        (a: Class, b: Class) => a.date.localeCompare(b.date),
      );
    } catch (error) {
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
