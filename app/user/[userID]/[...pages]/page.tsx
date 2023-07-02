import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import { updateUserClass } from '@/lib/actions';
import { supabase } from '@/lib';
import { ScheduleView, Favorites, Ratings } from '@/components';
import { UserClass, Class, CustomSession } from '@/lib/types';

export default async function Page({ params }: { params: { pages: string[] } }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect('/login');
  }

  const { pages } = params;
  const { id: userId } = session.user as CustomSession['user'];

  const getUserClasses = async () => {
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

      const classes = data.map((userClass: UserClass) => {
        const { classes: classData } = userClass;
        return {
          ...classData,
          favorite: userClass.favorite,
          classRating: userClass.class_rating,
        };
      });

      return classes.sort(
        (a: Class, b: Class) => a.date.localeCompare(b.date),
      );
    } catch (error) {
      return null;
    }
  };

  const fitnessClasses = await getUserClasses();
  const renderPage = () => {
    const favorites = fitnessClasses?.filter((fitnessClass) => fitnessClass.favorite);
    const pageComponents: { [key: string]: JSX.Element } = {
      favorites: (
        <Favorites
          userId={userId}
          updateUserClass={updateUserClass}
          fitnessClasses={favorites || []}
        />),
      ratings: (
        <Ratings
          userId={userId}
          updateUserClass={updateUserClass}
          fitnessClasses={fitnessClasses || []}
        />),
      default: <ScheduleView fitnessClasses={fitnessClasses || []} />,
    };

    return pageComponents[pages[0]] || pageComponents.default;
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-3 sm:p-8 ">
      { renderPage() }
    </main>
  );
}
