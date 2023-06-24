'use client';

import { useRouter } from 'next/navigation';
import React, {
  useState,
  useEffect,
  ChangeEvent,
  FormEvent,
} from 'react';
import supabase from '../../../../lib/supabase';

// To-Do:
// Refactor tags section to be more user-friendly
// Handle UTC timezome consistency for class start time
// Route based on studio id, not hard-coded studio id
// Move all server code outside of this function

type FormData = {
  loc_id: string;
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

  const [studioLocs, setStudioLocs] = useState([{ location_id: '', name: '' }]);
  const [formData, setFormData] = useState<FormData>({
    loc_id: '',
    location: '',
    class_name: '',
    class_description: '',
    class_date: '',
    class_start: '',
    class_duration: 0,
    class_tags: '',
    instructor: '',
  });

  // To be refactored to fetch studio locations on form load (need studio id from auth)
  // To be refactored -- if no studio locations, give curtosey message to add studio location
  const fetchStudioLocations = async () => {
    const { data, error } = await supabase
      .from('locations')
      .select('location_id, name')
      .eq('studio_id', '1');
    if (error) {
      console.error(error);
    } else {
      // console.log('Fetch Data: ', data);
      setStudioLocs(data);
    }
    // console.log('Studio Locations: ', studioLocs);
  };

  // [] to be refactored to include change of studio id (need studio id from auth)
  useEffect(() => {
    fetchStudioLocations();
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement |
    HTMLSelectElement>) => {
    e.preventDefault();
    const { name, value } = e.target;
    if (name === 'location') {
      const target = e.target as HTMLSelectElement;
      const index = target.selectedIndex;
      const { id } = target.children[index];
      setFormData((prevData) => ({
        ...prevData,
        loc_id: id,
      }));
    }
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    // console.log('Form Data: ', formData);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { error } = await supabase
      .from('classes')
      .insert([{
        location_id: Number(formData.loc_id),
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
      <h1 className="mt-4 text-3xl text-orange-500 font-semibold tracking-wider">Add Class</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-y-2">
        <label htmlFor="location">
          Location:
          <div className="relative">
            <select
              id="location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded-sm border-teal-300 w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
              required
            >
              <option value="" disabled>Please Select Location</option>
              {studioLocs.map((loc) => {
                const locId = loc.location_id;
                return (
                  <option key={locId} id={locId}>{loc.name}</option>
                );
              })}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
            </div>
          </div>
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
            className="shadow appearance-none border rounded-sm border-teal-300 w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
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
            className="shadow appearance-none border rounded-sm border-teal-300 w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
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
            className="shadow appearance-none border rounded-sm border-teal-300 w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
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
            className="shadow appearance-none border rounded-sm border-teal-300 w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
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
            className="shadow appearance-none border rounded-sm border-teal-300 w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
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
            placeholder="Duration (Mins)"
            value={formData.class_duration}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded-sm border-teal-300 w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </label>
        <label htmlFor="class_tags">
          Tags:
          <input
            id="class_tags"
            type="text"
            name="class_tags"
            placeholder="Tags"
            value={formData.class_tags}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded-sm border-teal-300 w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </label>
        <button
          type="submit"
          className="mt-6 bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Add Class
        </button>
      </form>
      <button
        type="submit"
        onClick={() => router.push('/studio/1234')}
        className="inline-block align-baseline font-bold text-sm text-orange-500 hover:text-orange-600"
      >
        Cancel
      </button>
    </div>
  );
}
