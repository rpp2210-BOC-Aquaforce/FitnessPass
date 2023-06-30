interface LocationProps {
  location: {
  name: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  total_rating: number;
  };
}

export default function Location({ location }: LocationProps) {
  // Generate and return a location component based on the data inside the location prop

  return (
    <div>
      <h5>{location.name}</h5>
      <p>{location.street}</p>
      <p>{`${location.city}, ${location.state} ${location.zip}`}</p>
      <p>{location.phone}</p>
      <p>Total Rating:</p>
      <p>
        {location.total_rating || 'No ratings yet!'}
      </p>
    </div>
  );
}
