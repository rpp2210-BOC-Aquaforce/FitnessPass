/* eslint-disable camelcase */

'use client';

import ClassSignUp from '../ClassSignUp';

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
      <div>
        {classes.map(({
          class_id, name, date, time, duration, instructor, locations,
        }) => {
          const location = locations;
          return (
            <div key={class_id} className="p-5">
              <h3>
                {name}
                {' - '}
                {location.name}
              </h3>
              <h5>{instructor}</h5>
              <div>
                {date}
                {' '}
                {time}
              </div>
              <div>
                {duration}
                {' minutes'}
              </div>
              <div>
                {location.street}
                {', '}
                {location.city}
                {', '}
                {location.state}
                {location.zip}
              </div>
              <ClassSignUp class_id={class_id} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
