'use client';

import { useState } from 'react';

export default function Ping() {
  const [message, setMessage] = useState<string | null>(null);

  const handleClick = async () => {
    const response = await fetch('/api/ping');
    const data = await response.json();
    setMessage(data.message);
  };

  return (
    <main className="flex-col p-24">
      <button type="submit" onClick={handleClick} className="border border-gray-400 rounded-md p-4">Ping API</button>
      {message && <p className="w-full">{message}</p>}
    </main>
  );
}
