import Link from 'next/link';

export default function Search() {
  return (
    <Link href="/user/search">
      <input placeholder="Search" />
    </Link>
  );
}
