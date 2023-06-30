'use client';

// import Link from 'next/link';
import AccessDenied from '../../../src/components/Auth/access-denied';

export default function ErrorPage() {
  return (
    <div>
      <AccessDenied />
    </div>
  );
}
