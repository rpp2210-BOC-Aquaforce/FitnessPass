import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { Schedule } from '@/components/index';

export default async function Page({ params }: { params: { userID: string }}) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect('/login');
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-3 sm:p-8 ">
      <Schedule userId={Number(params.userID)} />
    </main>
  );
}
