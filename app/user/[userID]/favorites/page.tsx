'use client';

import Link from 'next/link';

import MyFavorites from '../../../../components/MyFavorites';

export default async function Favorites() {
  return (
    <div className="text-2xl">
      <MyFavorites />
      <div className="relative sm:inset-10 inset-y-8 flex sm:place-content-between md:w-1/3">
        <Link href="/user/1/schedule"> My Schedule</Link>
        {/* <Link href="/user/1/classes"> Classes</Link> */}
        <Link href="/user/1/ratings"> My Ratings</Link>
      </div>
    </div>
  );
}
