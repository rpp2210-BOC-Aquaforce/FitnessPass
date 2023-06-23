// import Location from './location';
import styles from './page.module.css';

export default function StudioLocations() {
  // const locationsArr = [];

  // const allLocationComponents = locationsArr.map((location) => (
  //   <Location loc={location}
  //     key={location.id}/>));

  return (
    <div className={styles.locationList}>
      <h1 className={styles.header}>All Locations</h1>
      <div>A location</div>
      <div>Look, another one</div>
      <div>Yep, one more</div>
      <div>Nope, this is just text.</div>
    </div>
  );
}
