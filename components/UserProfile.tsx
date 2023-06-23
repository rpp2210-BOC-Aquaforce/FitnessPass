import Link from "next/link";

export default async function UserProfile() {
  return (
    <div className="text-2xl">
      <h1 className="relative sm:inset-x-20 inset-y-4 text-5xl">My Profile</h1>
      <div className="inline-flex">
        <div className="relative sm:inset-7 border-red-800 lg:rounded text-5xl bg-gray-500 max-w-xs max-h-100">

          Photo:

        </div>
        <div className="relative sm:inset-10  max-w-xs mb-12">
          First Name:
          <br />
          Last Name:
          <br />
          Preferred Email:
          <br />
          Phone Number:
          <br />
          Age:
          <br />
          Street:
          <br />
          City:
          <br />
          State:
          <br />
          Zip:
          <br />
          Emergency Contact Name:
          <br />
          Emergency Contact Phone:
        </div>
      </div>
      <div className="relative sm:inset-10 mb-12">
        Next bill due in 30 days!
      </div>
      <div className="relative sm:inset-10 flex sm:place-content-between md:w-1/3">
        <Link href="/favorites"> My Schedule</Link>
        <Link href="/classes"> Classes</Link>
        <Link href="/favorites"> My Favorites</Link>
        <Link href="/ratings"> My Ratings</Link>
      </div>
    </div>
  );
}
