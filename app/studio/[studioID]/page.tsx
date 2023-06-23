// eslint-disable-next-line import/extensions
import Image from 'next/image';
import Link from 'next/link';
import AddLocation from '../../../components/AddLocation';
import styles from './page.module.css';

export default function StudioPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <p className="text-3xl font-bold mb-4">
        <h1 className="mainHeader">Studio Profile</h1>
        <Image src="/images/studioPlaceholder.png" alt="gym placeholder" width={400} height={300} />
        <h5 className={styles.infoHeader}>Studio Name</h5>
        <p>Name Here</p>
        <h5 className={styles.infoHeader}>Preferred Email</h5>
        <p>Email Here</p>
        <h5 className={styles.infoHeader}>Phone Number</h5>
        <p>Phone Here</p>
      </p>

      <AddLocation />
      <h5 className={styles.infoHeader}>Address</h5>
      <p>Address Here</p>
      <Link href="/studio/addclass"> Add A Class</Link>
      <Link href="/"> Add A Location</Link>
      <Link href="/"> View All Classes</Link>
      <Link href="/"> View All Locations</Link>
      <Link href="/"> View Metrics</Link>

    </main>
  );
}
