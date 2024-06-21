import CurrentlyReading from "./currentlyreading/page";
import WantToRead from "./want2read/page";
import FinishedReading from "./finishedreading/page";

export default async function Home() {
  return (
    <div className="w-full flex flex-row justify-between p-14">
      <WantToRead />
      <CurrentlyReading />
      <FinishedReading />
    </div>
  );
}
