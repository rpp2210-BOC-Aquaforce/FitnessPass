import Link from 'next/link';

export default function AddLocation() {
  return (
    // route needs to be dynamic, need from login
    <Link href="/studio/1234/add-location">
      <button type="button">Add a Location</button>
    </Link>
  );
}
