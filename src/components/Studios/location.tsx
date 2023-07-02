import styles from '../../../app/studio/[studioID]/view-locations/page.module.css';

interface LocationProps {
  location: {
  name: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  total_rating: number;
  location_id: number;
  };
  onDelete: () => Promise<void>;
}

export default function Location({ location, onDelete }: LocationProps) {
  // Generate and return a location component based on the data inside the location prop

  return (
    <div className={styles.container}>
      <h5 className={styles.title}>{location.name}</h5>
      <p className={styles.address}>{location.street}</p>
      <p className={styles.address}>{`${location.city}, ${location.state} ${location.zip}`}</p>
      <p className={styles.phone}>{location.phone}</p>
      <p className={styles.ratingTitle}>Total Rating:</p>
      <p className={styles.rating}>
        {location.total_rating || 'No ratings yet!'}
      </p>
      <button className={styles.deleteButton} onClick={onDelete} type="button">Delete Location</button>
    </div>
  );
}
