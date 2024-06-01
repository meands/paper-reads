import styles from "./page.module.css";
import CurrentlyReading from "./currentlyreading/page";
import WantToRead from "./want2read/page";
import FinishedReading from "./finishedreading/page";

export default async function MySpace() {
  return (
    <div className={styles.main}>
      <h1 style={{ paddingBottom: 30 }}>Home</h1>
      <div className={styles.lists}>
        <WantToRead />
        <CurrentlyReading />
        <FinishedReading />
      </div>
    </div>
  );
}
