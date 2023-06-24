import Link from 'next/link';

export default async function UserPage() {
  return (
    <div>
      Specific User Goes Here
      <Link href="/user/profile">
        <button type="button" className="relative sm:inset-x-20 inset-y-4 text-5xl">My Profile</button>
      </Link>
    </div>
  );
}
