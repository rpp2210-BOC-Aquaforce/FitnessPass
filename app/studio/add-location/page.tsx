'use client';

import React, { useState, ChangeEvent, FormEvent } from 'react';

export default async function StudioPage() {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Input:
        <input
          type="text"
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}
