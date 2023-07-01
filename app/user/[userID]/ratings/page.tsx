'use client';

import { redirect } from 'next/navigation';
import { useSession } from 'next-auth/react';
import React from 'react';
import Ratings from '@/components/Ratings';

export default function RatingsPage() {
  useSession({
    required: true,
    onUnauthenticated() {
      redirect('/login');
    },
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-3 sm:p-8 w-full">
      <Ratings />
    </main>
  );
}
