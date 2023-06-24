import Link from 'next/link';

export default function Studios() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      Studio Page - CI/CD Test - Vercel!
      <Link href="/studio/add-location">
        <button type="button">Add a Location</button>
      </Link>
    </main>
  );
}
