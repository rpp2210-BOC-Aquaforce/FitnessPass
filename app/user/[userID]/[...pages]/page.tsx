import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import {
  getUserClasses,
  getNonUserClasses,
  updateUserClass,
} from '@/lib/actions';
import { CustomSession } from '@/lib/types';
import UserPages from '@/components/User/Pages';

export const revalidate = 60; // revalidate this page every 60 seconds

export default async function Page({ params }: { params: { pages: string[] } }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect('/login');
  }

  const { pages } = params;
  const { id: userId } = session.user as CustomSession['user'];

  const userClasses = await getUserClasses(Number(userId));
  const userClassIds = userClasses?.map((userClass) => userClass.class_id) ?? [];
  const availableClasses = await getNonUserClasses(userClassIds);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-3 sm:p-8 ">
      <UserPages
        page={pages[0]}
        userClasses={userClasses ?? []}
        updateUserClass={updateUserClass}
        availableClasses={availableClasses ?? []}
        userId={userId}
      />
    </main>
  );
}
