'use client';

import Link from 'next/link';

import MyFavorites from '../../../../components/MyFavorites';

export default async function Favorites() {
  return (
    <div className="text-2xl">
      <div className="flex flex-row justify-end text-2xl md:w-1/3 text-2xl mt-5">
        <Link href="/user/123/profile"> My Profile</Link>
      </div>
      <MyFavorites />
      <div className="relative sm:inset-10 inset-y-8 flex sm:place-content-between md:w-1/3">
        <Link href="/user/123/favorites"> My Schedule</Link>
        {/* <Link href="/user/123/classes"> Classes</Link> */}
        <Link href="/user/123/ratings"> My Ratings</Link>
      </div>
    </div>
  );
}
