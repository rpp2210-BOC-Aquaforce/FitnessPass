import { redirect } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Schedule } from '@/components/index';

export default function Page({ params }: { params: { userID: string }}) {
  useSession({
    required: true,
    onUnauthenticated() {
      redirect('/login');
    },
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-3 sm:p-8 ">
      <Schedule userId={Number(params.userID)} />
    </main>
  );
}
