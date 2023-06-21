'use client';

import React, { useState, ChangeEvent, FormEvent } from 'react';
import supabase from '../../../../lib/supabase';

type FormData = {
  studioName: string;
  location: string;
  description: string;
  photo: File | null;
};

function StudioLocationForm() {
  const [formData, setFormData] = useState<FormData>({
    studioName: '',
    location: '',
    description: '',
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
    const { data: newStudio, error } = await supabase
      .from('locations')
      .insert([
        {
          name: formData.studioName,
          location: formData.location,
          description: formData.description,
        },
      ]);
      // 400 errors from posting

    // need to handle file uploads
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
      <label htmlFor="location" className="block mb-2">
        Location:
        <input
          id="location"
          type="text"
          name="location"
          value={formData.location}
          onChange={handleInputChange}
        />
      </label>
      <label htmlFor="description" className="block mb-2">
        Description:
        <input
          id="description"
          type="text"
          name="description"
          value={formData.description}
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
