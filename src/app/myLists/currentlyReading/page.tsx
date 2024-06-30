import { CurrentlyReadingList } from "@/components/currentlyReading/currentlyReadingList";
import { Button } from "@/components/ui/button";
import { getCurrentlyReadingRecords } from "@/utils/actions";
import Link from "next/link";

export default async function CurrentlyReading() {
  const currentlyReading = await getCurrentlyReadingRecords();

  return (
    <div className="overflow-auto">
      <Button asChild variant="ghost" className="w-full">
        <Link href="/myLists/currentlyReading">Currently Reading</Link>
      </Button>
      <CurrentlyReadingList articleItems={currentlyReading} />
      <Link
        href="/myLists/addToCurrentlyReading"
        className="flex justify-center"
      >
        +
      </Link>
    </div>
  );
}
