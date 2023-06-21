'use client';

export default function AddClass() {
  const handleSubmit = (e: FormEvent<HTMLInputElement>): void => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);
    console.log('form props: ', formProps);
    // POST to Supabase classes table
  };
  return (
    <div>
      <h1>Add Class</h1>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <label htmlFor="location">
          Location:
          <input
            id="location"
            type="text"
            name="location"
            required
          />
        </label>
        <label htmlFor="class_name">
          Class Name:
          <input
            id="class_name"
            type="text"
            name="class_name"
            required
          />
        </label>
        <label htmlFor="class_description">
          Class Description:
          <textarea
            id="class_description"
            spellCheck="true"
            name="class_description"
            required
          />
        </label>
        <label htmlFor="instructor">
          Instructor:
          <input
            id="instructor"
            type="text"
            name="instructor"
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
