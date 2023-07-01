import styles from '../../../app/studio/[studioID]/view-classes/page.module.css';
import deleteClass from '../../../pages/api/deleteClass';

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
  // Format date in a readable way
  const formattedDate = new Date(classObj.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Format time in a readable way
  const formattedTime = new Date(`1970-01-01T${classObj.time}`).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });
  return (
    <div className={styles.container}>
      <h5 className={styles.title}>{classObj.name}</h5>
      <p className={styles.instructor}>{`with ${classObj.instructor}`}</p>
      <p className={styles.description}>{classObj.description}</p>
      <p className={styles.date}>{formattedDate}</p>
      <p className={styles.time}>{formattedTime}</p>
      <p className={styles.duration}>{`Duration: ${classObj.duration} mins`}</p>
      <p className={styles.rating}>{classObj.total_rating}</p>
      <button className={styles.deleteButton} onClick={() => { deleteClass(classObj.class_id); }} type="button">
        Delete Class
      </button>
    </div>
  );
}
