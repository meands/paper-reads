import WantToRead from "./wantToRead/page";
import FinishedReading from "./finishedReading/page";
import CurrentlyReading from "./currentlyReading/page";

export default function Page() {
  return (
    <div className="flex flex-row gap-2">
      <WantToRead />
      <CurrentlyReading />
      <FinishedReading />
    </div>
  );
}
