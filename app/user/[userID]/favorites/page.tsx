'use client';

import React from 'react';
import Favorites from '@/components/Favorites';

export default async function FavoritesPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-3 sm:p-8 w-full">
      <Favorites />
    </main>
  );
}
