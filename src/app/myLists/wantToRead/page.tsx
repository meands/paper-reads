import { Button } from "@/components/ui/button";
import { WantToReadList } from "@/components/wantToRead/wantToReadList";
import { getWantToReadRecords } from "@/utils/actions";
import Link from "next/link";

export default async function WantToRead() {
  const wantToReadArticles = await getWantToReadRecords();

  return (
    <div className="overflow-auto">
      <Button asChild variant="ghost" className="w-full">
        <Link href="/myLists/wantToRead">Want To Read</Link>
      </Button>
      <WantToReadList articleItems={wantToReadArticles} />
      <Link href="/myLists/addToWantToRead" className="flex justify-center">
        +
      </Link>
    </div>
  );
}
