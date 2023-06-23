'use client';

import { useState } from 'react';

export default async function Classes() {
  const [favorite, setFavorite] = useState([]);

  return (
    <div className="relative sm:inset-x-20 inset-y-4 text-5xl">
      Classes
      <div className="relative sm:inset-x-20 inset-y-4 text-5xl">
        <button type="button" onClick={(e) => { e.preventDefault(); setFavorite(e.target.innerHTML); }}>Swimming</button>
      </div>
      <div className="relative sm:inset-x-20 inset-y-4 text-5xl">
        <button type="button" onClick={(e) => { e.preventDefault(); setFavorite(e.target.innerHTML); }}>Running</button>
      </div>
      <div className="relative sm:inset-x-20 inset-y-4 text-5xl">
        <button type="button" onClick={(e) => { e.preventDefault(); setFavorite(e.target.innerHTML); }}>Lifting</button>
      </div>
    </div>
  );
}
