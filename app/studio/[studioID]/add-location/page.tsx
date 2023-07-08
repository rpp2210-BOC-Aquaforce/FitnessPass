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
        console.log(newStudio);
        router.push(`/studio/${studioID}`);
      }
    } catch (err) {
      console.error('Unexpected error: ', err);
    }
  };

  return (
    <div className="flex flex-col content-start justify-center items-center py-4 gap-y-4">
      <h1 className="mt-4 text-3xl text-orange-500 font-semibold tracking-wider" data-testid="location_form_title">Add Location</h1>
      <form className="flex flex-col gap-y-2" onSubmit={handleSubmit}>
        <label htmlFor="studioName" className="block mb-2">
          Studio Name:
          <input
            id="studioName"
            type="text"
            name="studioName"
            value={formData.studioName}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded-sm border-teal-300 w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
            required
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
            className="shadow appearance-none border rounded-sm border-teal-300 w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
            required
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
            className="shadow appearance-none border rounded-sm border-teal-300 w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
            required
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
            className="shadow appearance-none border rounded-sm border-teal-300 w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
            required
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
            className="shadow appearance-none border rounded-sm border-teal-300 w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
            required
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
            className="shadow appearance-none border rounded-sm border-teal-300 w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </label>
        <button
          type="submit"
          onClick={() => router.push(`/studio/${studioID}`)}
          className="inline-block align-baseline font-bold text-sm text-orange-500 hover:text-orange-600"
        >
          Add New Location
        </button>
      </form>
    </div>
  );
}

export default StudioLocationForm;
