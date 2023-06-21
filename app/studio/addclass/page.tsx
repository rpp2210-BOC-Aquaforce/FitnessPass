'use client';

import supabase from '../../../lib/supabase';

// To-Do:
// Refactor tags section to be more user-friendly
// Refactor location to pull from existing studio locations

export default function AddClass() {
  const fetchSample = async () => {
    const { data: test, error } = await supabase
      .from('classes')
      .select()
    if (error) {
      console.error(error);
    } else {
      console.log('Data? ', JSON.stringify({ data: test, error }, null, 4));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);
    // console.log('Form data: ', formData);
    console.log('form props: ', formProps);
    fetchSample();
    const classData = {
      location_id: 1,
      name: formProps.class_name,
      description: formProps.class_description,
      date: formProps.class_date,
      time: formProps.class_start,
      duration: formProps.class_duration,
      tags: JSON.stringify(formProps.class_tags),
      instructor: formProps.instructor,
      total_rating: 0,
      num_ratings: 0,
    };
    console.log('Class Data: ', classData);
    const { data, error } = await supabase.from('classes').insert(classData);
    if (error) {
      console.log('Data: ', data);
      console.error(error);
    } else {
      console.log('data: ', data);
      fetchSample();
    }
    // POST to Supabase classes table
  //   const { data: test, error } = await supabase
  //   .from('test')
  //   .select('textrow');

  // return <pre>{JSON.stringify({ data: test, error }, null, 2)}</pre>;
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
            required
          />
        </label>
        <label htmlFor="class_date">
          Class Date:
          <input
            id="class_date"
            type="date"
            name="class_date"
            required
          />
        </label>
        <label htmlFor="class_start">
          Class Start Time:
          <input
            id="class_start"
            type="time"
            name="class_start"
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
            required
          />
        </label>
        <label htmlFor="class_tags">
          Tags:
          <input
            id="class_tags"
            type="text"
            name="class_tags"
            required
          />
        </label>
        <button type="submit">Add Class</button>
      </form>
    </div>
  );
}
