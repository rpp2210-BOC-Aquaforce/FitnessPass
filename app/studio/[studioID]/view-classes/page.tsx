// eslint-disable-next-line import/extensions
import Class from './class';
import styles from './page.module.css';

export default function StudioClasses() {
  const classesArr = [];


  return (
    <div className={styles.locationList}>
      <h1 className={styles.header}>All Classes</h1>
      <div>Class 1</div>
      <div>Class 2</div>
      <div>Class 3</div>
      <div>Class 4</div>
    </div>
  );
}
