interface ClassProps {
  classObj: {
    class_id: number;
    location_id: number;
    name: string;
    description: string;
    instructor: string;
    date: string;
    time: string;
    duration: number;
    total_rating: number;
    num_ratings: number;
  };
}

export default function Location({ classObj }: ClassProps) {
  // Generate and return a location component based on the data inside the location prop

  return (
    <div>
      <h5>{classObj.name}</h5>
      <p>{classObj.description}</p>
      <p>{classObj.instructor}</p>
      <p>{classObj.date}</p>
      <p>{classObj.time}</p>
      <p>{classObj.duration}</p>
      <p>Rating:</p>
      <p>{classObj.total_rating}</p>
      <button type="button">Delete Class</button>
    </div>
  );
}


// export default function Class() {
//   // Generate and return a location component based on the data inside the location props

//   return (
//     <div>
//       <h1>Name</h1>
//     </div>
//   );
// }