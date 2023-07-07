/* eslint-disable camelcase */
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import React from 'react';

export default async function SearchBar() {
  const session = await getServerSession(authOptions);
  let user_id = (session?.user as any)?.id;
  if (user_id === undefined) {
    user_id = 1;
  }
  return (
    <main className="border border-gray-400 rounded-md p-2">
      <Link href={{ pathname: `/user/${user_id}/search`, query: user_id }}>
        <input placeholder="Search" className="text-center" />
      </Link>
    </main>
  );
}
