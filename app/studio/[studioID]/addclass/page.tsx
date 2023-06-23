'use client';

import { useRouter } from 'next/navigation';
import React, { useState, ChangeEvent, FormEvent } from 'react';
import supabase from '../../../../lib/supabase';

// To-Do:
// Refactor location to pull from existing studio locations
// Refactor tags section to be more user-friendly
// Handle UTC timezome consistency for class start time
// Route based on studio id, not hard-coded studio id

type FormData = {
  location: string;
  class_name: string;
  class_description: string;
  class_date: string;
  class_start: string;
  class_duration: number;
  class_tags: string;
  instructor: string;
}

export default function AddClass() {
  const router = useRouter();

  const [formData, setFormData] = useState<FormData>({
    location: '1',
    class_name: '',
    class_description: '',
    class_date: '',
    class_start: '',
    class_duration: 0,
    class_tags: '',
    instructor: '',
  });

  // To be refactored to fetch studio locations on form load
  // const fetchStudioLocations = async () => {
  //   const { data, error } = await supabase
  //     .from('locations')
  //     .select('location_id, name')
  //     .eq('studio_id', '1');
  //   if (error) {
  //     // console.error(error);
  //   } else {
  //     // console.log('Fetch Data: ', data);
  //   }
  // };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { error } = await supabase
      .from('classes')
      .insert([{
        location_id: 1,
        name: formData.class_name,
        description: formData.class_description,
        date: formData.class_date,
        time: formData.class_start,
        duration: formData.class_duration,
        tags: JSON.stringify(formData.class_tags),
        instructor: formData.instructor,
        total_rating: 0,
        num_ratings: 0,
      }]);

    if (error) {
      // console.error(error);
      alert('Error adding class, please try again later!');
    } else {
      // console.log('Class successfully added!');
      router.push('/studio/1234');
    }
  };

  return (
    <div className="flex flex-col content-start justify-center items-center py-4 gap-y-4">
      <h1 className="text-xl">Add Class</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-y-2">
        <label htmlFor="location">
          Location:
          <input
            id="location"
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleInputChange}
            required
          />
        </label>
        <label htmlFor="class_name">
          Class Name:
          <input
            id="class_name"
            type="text"
            name="class_name"
            placeholder="Class Name"
            value={formData.class_name}
            onChange={handleInputChange}
            required
          />
        </label>
        <label htmlFor="class_description">
          Class Description:
          <textarea
            id="class_description"
            spellCheck="true"
            name="class_description"
            placeholder="Class Description"
            value={formData.class_description}
            onChange={handleInputChange}
            required
          />
        </label>
        <label htmlFor="instructor">
          Instructor:
          <input
            id="instructor"
            type="text"
            name="instructor"
            placeholder="Instructor"
            value={formData.instructor}
            onChange={handleInputChange}
            required
          />
        </label>
        <label htmlFor="class_date">
          Class Date:
          <input
            id="class_date"
            type="date"
            name="class_date"
            value={formData.class_date}
            onChange={handleInputChange}
            required
          />
        </label>
        <label htmlFor="class_start">
          Class Start Time:
          <input
            id="class_start"
            type="time"
            name="class_start"
            value={formData.class_start}
            onChange={handleInputChange}
            required
          />
        </label>
        <label htmlFor="class_duration">
          Class Duration:
          <input
            id="class_duration"
            name="class_duration"
            type="number"
            min="5"
            max="720"
            step="5"
            value={formData.class_duration}
            onChange={handleInputChange}
            required
          />
        </label>
        <label htmlFor="class_tags">
          Tags:
          <input
            id="class_tags"
            type="text"
            name="class_tags"
            value={formData.class_tags}
            onChange={handleInputChange}
            required
          />
        </label>
        <button type="submit">Add Class</button>
      </form>
      <button type="submit" onClick={() => router.push('/studio/1234')}>Cancel</button>
    </div>
  );
}
