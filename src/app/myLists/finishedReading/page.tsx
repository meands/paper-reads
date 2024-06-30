import { FinishedReadingList } from "@/components/finishedReading/finishedReadingList";
import { Button } from "@/components/ui/button";
import { getFinishedReadingRecords } from "@/utils/actions";
import Link from "next/link";

export default async function FinishedReading() {
  const finishedArticles = await getFinishedReadingRecords();

  return (
    <div className="overflow-auto">
      <Button asChild variant="ghost" className="w-full">
        <Link href="/myLists/finishedReading">Finished Reading</Link>
      </Button>
      <FinishedReadingList articleItems={finishedArticles} />
      <Link
        href="/myLists/addToFinishedReading"
        className="flex justify-center"
      >
        +
      </Link>
    </div>
  );
}
