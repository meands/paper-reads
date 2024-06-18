import Link from "next/link";
import { ArticleItem } from "../../../components/item";
import { getFinishedReadingRecords, removeItemFromUserReads } from "../actions";
import { Button } from "@/components/ui/button";

export default async function FinishedReading() {
  const currentlyReadingArticles = await getFinishedReadingRecords();
  return (
    <div className="container">
      <Button asChild variant="ghost" className="w-full">
        <Link href="./finishedreading">Finished Reading</Link>
      </Button>
      {currentlyReadingArticles.map((item) => (
        <ArticleItem item={item} onRemove={removeItemFromUserReads} />
      ))}
      <Button asChild variant="ghost" className="w-full">
        <Link href="./addfinishedreading">+ Add New Item</Link>
      </Button>
    </div>
  );
}
