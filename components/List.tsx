/* eslint-disable camelcase */

'use client';

export default function List({ classes, setMap }) {
  if (classes.length === 0) return <div>0 result</div>;

  return (
    <div>
      <div>
        {classes.length}
        {' '}
        results
      </div>
      <button type="button" className="bg-green-500 text-white" onClick={() => setMap(true)}>Map</button>
      <div>
        {classes.map(({
          class_id, name, date, time, duration, instructor, locations,
        }) => (
          <div key={class_id} className="p-5">
            <h3>
              {name}
              {' - '}
              {locations.name}
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
              {locations.street}
              {', '}
              {locations.city}
              {', '}
              {locations.state}
              {locations.zip}
            </div>
            <button type="button" className="bg-orange-500 text-white">Sign Up</button>
          </div>
        ))}
      </div>
    </div>
  );
}
