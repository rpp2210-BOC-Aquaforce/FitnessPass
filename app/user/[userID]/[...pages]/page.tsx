import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import { updateUserClass } from '@/lib/actions';
import { supabase } from '@/lib';
import { ScheduleView, Favorites, Ratings } from '@/components';
import { FitnessClasses } from '@/components/FitnessClasses';
import { UserClass, Class, CustomSession } from '@/lib/types';

export const revalidate = 60; // revalidate this page every 60 seconds

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
          classes(*,locations(*,studio_users(photo)))
        `)
        // .eq('user_id', userId)
        .returns<UserClass[]>();

      if (error) {
        throw error;
      }

      const classes = data.map((userClass: UserClass) => {
        const { classes: classData } = userClass;
        const { locations: loc } = classData;
        const { studio_users: studio } = loc;
        return {
          ...classData,
          userId: userClass.user_id,
          locations: {
            ...loc,
            photo_url: studio?.photo,
          },
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
    const userClasses = fitnessClasses?.filter((c) => c.userId === Number(userId));
    const availableClasses = fitnessClasses?.filter((c) => c.userId !== Number(userId));
    const favorites = userClasses?.filter((c) => c.favorite);
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
          fitnessClasses={userClasses || []}
        />),
      classes: (
        <div className="flex flex-col items-start p-2 mt-2 bg-white shadow-md rounded-lg w-full min-h-[250px] h-full">
          <div className="flex w-full justify-between">
            <div className="w-full h-full">
              <FitnessClasses
                classes={availableClasses || []}
                updateUserClass={updateUserClass}
              />
            </div>
          </div>
        </div>
      ),
      default: (
        <ScheduleView
          fitnessClasses={userClasses || []}
          updateUserClass={updateUserClass}
        />
      ),
    };

    return pageComponents[pages[0]] || pageComponents.default;
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-3 sm:p-8 ">
      { renderPage() }
    </main>
  );
}
