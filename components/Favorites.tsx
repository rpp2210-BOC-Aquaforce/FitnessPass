import Link from 'next/link';

export default async function Favorites() {
  return (
    <div className="text-2xl">
       <div className="flex flex-row justify-end text-2xl md:w-1/3 text-2xl mt-5">
       <Link href="/profile"> My Profile</Link>

       </div>
      <h1 className="relative sm:inset-x-20 inset-y-4 text-5xl">My Favorites</h1>
      <div className="relative sm:inset-10 md:w-1/3">
        <div className="inline-block">
          Placeholder 1
        </div>
        <br></br>
        <div className="inline-block">
          Placeholder 1
        </div>
        <br></br>
        <div className="inline-block">
          Placeholder 1
        </div>
        <br></br>
      </div>
      <div className="relative sm:inset-10 flex sm:place-content-between md:w-1/3">
      <Link href="/favorites"> My Schedule</Link>
      <Link href="/classes"> Classes</Link>
      <Link href="/ratings"> My Ratings</Link>
      </div>
    </div>
  );
}
