/* eslint-disable camelcase */
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export default async function SearchBar() {
  const session = await getServerSession(authOptions);
  const user_id = (session?.user as any)?.id;
  // if (!user_id) {
  //   user_id = 'guestUser';
  // }
  return (
    <main className="border border-gray-400 rounded-md p-2">
      <Link href={{ pathname: `/user/${user_id}/search`, query: user_id }}>
        <input placeholder="Search" className="text-center" />
      </Link>
    </main>
  );
}
