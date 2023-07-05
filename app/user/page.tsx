import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import Link from 'next/link';

export default async function Users() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect('/login');
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      Users
      <Link href="/user/123/profile">
        <button type="button" className="relative sm:inset-x-20 inset-y-4 text-5xl">My Profile</button>
      </Link>
    </main>
  );
}
