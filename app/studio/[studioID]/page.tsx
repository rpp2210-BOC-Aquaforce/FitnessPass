// eslint-disable-next-line import/extensions
import Image from 'next/image';
import Link from 'next/link';

export default function StudioPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Studio Name</h1>
      <Image src="/images/studioPlaceholder.png" alt="gym placeholder" width={400} height={300} />
      <Link href="/"> Add A Class</Link>
      <Link href="/"> Add A Location</Link>
      <Link href="/"> View All Classes</Link>
      <Link href="/"> View All Locations</Link>
      <Link href="/"> View Metrics</Link>

    </main>
  );
}
