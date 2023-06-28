import Link from 'next/link';

export default function searchBar() {
  return (
    <main className="border border-gray-400 rounded-md p-2">
      <Link href="/user/1/search">
        <input placeholder="Search" className="text-center" />
      </Link>
    </main>
  );
}
