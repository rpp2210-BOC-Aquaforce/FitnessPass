'use client';

import React, { useState, ChangeEvent, FormEvent } from 'react';
import { supabase } from '@/lib';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

type FormData = {
  studioName: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
};

function StudioLocationForm() {
  const { data: session } = useSession();
  const studioID = (session?.user as any)?.id;
  const router = useRouter();

  const [formData, setFormData] = useState<FormData>({
    studioName: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    phone: '',
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { data: newStudio, error } = await supabase
        .from('locations')
        .insert([
          {
            studio_id: studioID,
            name: formData.studioName,
            street: formData.street,
            city: formData.city,
            state: formData.state,
            zip: formData.zip,
            phone: formData.phone,
          },
        ]);
      if (error) {
        console.error('Supabase Error: ', error);
      } else {
        router.push(`/studio/${studioID}`);
      }
    } catch (err) {
      console.error('Unexpected error: ', err);
    }
  };

  return (
    <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
      <label htmlFor="studioName" className="block mb-2">
        Studio Name:
        <input
          id="studioName"
          type="text"
          name="studioName"
          value={formData.studioName}
          onChange={handleInputChange}
        />
      </label>
      <label htmlFor="street" className="block mb-2">
        Street:
        <input
          id="street"
          type="text"
          name="street"
          value={formData.street}
          onChange={handleInputChange}
        />
      </label>
      <label htmlFor="city" className="block mb-2">
        City:
        <input
          id="city"
          type="text"
          name="city"
          value={formData.city}
          onChange={handleInputChange}
        />
      </label>
      <label htmlFor="state" className="block mb-2">
        State:
        <input
          id="state"
          type="text"
          name="state"
          value={formData.state}
          onChange={handleInputChange}
        />
      </label>
      <label htmlFor="zip" className="block mb-2">
        Zip Code:
        <input
          id="zip"
          type="text"
          name="zip"
          value={formData.zip}
          onChange={handleInputChange}
        />
      </label>
      <label htmlFor="phone" className="block mb-2">
        Phone Number:
        <input
          id="phone"
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
        />
      </label>
      <button
        type="submit"
        className="bg-orange-500 text-orange px-4 py-2 rounded-md mt-4"
      >
        {' '}
        Submit
        {' '}

      </button>
    </form>
  );
}

export default StudioLocationForm;
