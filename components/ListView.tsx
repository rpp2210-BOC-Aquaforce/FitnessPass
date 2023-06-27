'use client';

type CLASS = {
  class_id: number,
  date: string,
  duration: number,
  instructor: string,
  locations: {name: string, street: string, city: string, state: string, zip: string},
  name: string
  time: string
}

interface ListProps {
  classes: CLASS[];
  setList: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function List({ classes, setList } : ListProps) {
  if (classes.length === 0) return <div>0 result</div>;
  return (
    <div>
      <div>
        {classes.length}
        {' '}
        results
      </div>
      <button type="button" className="bg-green-500 text-white" onClick={() => setList(false)}>Map</button>
    </div>
  );
}
