'use client';

import { redirect } from 'next/navigation';
import { useSession } from 'next-auth/react';

import Profile from '@/components/Profile';

export default function UserProfilePage() {
  useSession({
    required: true,
    onUnauthenticated() {
      redirect('/login');
    },
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-between w-full">
      <Profile />
    </main>
  );
}
