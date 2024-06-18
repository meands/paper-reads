import CurrentlyReading from "./currentlyreading/page";
import WantToRead from "./want2read/page";
import FinishedReading from "./finishedreading/page";

export default async function Home() {
  return (
    <div className="container flex flex-row pt-14">
      <WantToRead />
      <CurrentlyReading />
      <FinishedReading />
    </div>
  );
}
