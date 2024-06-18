import {
  getCurrentlyReadingRecords,
  removeItemFromUserReads,
} from "../actions";
import Link from "next/link";
import { ArticleItem } from "../../../components/item";
import { Button } from "@/components/ui/button";

export default async function CurrentlyReading() {
  const currentlyReadingArticles = await getCurrentlyReadingRecords();
  return (
    <div className="container">
      <Button asChild variant="ghost" className="w-full">
        <Link href="./currentlyreading">Currently Reading</Link>
      </Button>
      {currentlyReadingArticles.map((item) => (
        <ArticleItem item={item} onRemove={removeItemFromUserReads} />
      ))}
      <Button asChild variant="ghost" className="w-full">
        <Link href="./addcurrentlyreading">+ Add New Item</Link>
      </Button>
    </div>
  );
}
