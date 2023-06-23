'use client';

import React, { useState, ChangeEvent, FormEvent } from 'react';
import supabase from '../../../../lib/supabase';

// NEEDS DYNAMIC STUDIO ID
type FormData = {
  studioName: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  photo: File | null;
};

function StudioLocationForm() {

  const [formData, setFormData] = useState<FormData>({
    studioName: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    phone: '',
    photo: null,
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      photo: file || null,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
    // need to change to dynamic ID - cannot insert if studio_id is not in table
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { data: newStudio, error } = await supabase
        .from('locations')
        .insert([
          {
            studio_id: 1,
            name: formData.studioName,
            street: formData.street,
            city: formData.city,
            state: formData.state,
            zip: formData.zip,
            phone: formData.phone,
            photo_url: null,
          },
        ]);
      if (error) {
        console.error('Supabase Error: ', error);
      } else {
        // Temporary Submit Routing for MVP
        window.location.href = '/studio/1234/';
      }
    } catch (err) {
      console.error('Unexpected error: ', err);
    }

    // Photo Insert is stretch goal
    // issues with policy access when uploading photo to bucket
    // need to have access to specific Studio ID
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
      <label htmlFor="photo-upload" className="block mb-2">
        Upload Photo:
        <input
          id="photo-upload"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />
      </label>
      <button
        type="submit"
        className="bg-orange-500 text-white px-4 py-2 rounded-md mt-4"
      >
        {' '}
        Submit
        {' '}

      </button>
    </form>
  );
}

export default StudioLocationForm;
