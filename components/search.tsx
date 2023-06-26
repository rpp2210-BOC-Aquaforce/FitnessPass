import Link from 'next/link';

export default function Search() {
  return (
    <Link href="/user/1/search">
      <input placeholder="Search" />
    </Link>
  );
}
