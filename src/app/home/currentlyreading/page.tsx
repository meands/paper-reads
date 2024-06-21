import {
  getAllArticleStoreRecords,
  getCurrentlyReadingRecords,
  removeItemFromUserReads,
} from "../actions";
import Link from "next/link";
import { ArticleItem } from "../../../components/articleItem";
import { Button } from "@/components/ui/button";
import { AddCurrentlyReadingModal } from "./newItemForm";

export default async function CurrentlyReading() {
  const currentlyReadingArticles = await getCurrentlyReadingRecords();
  const availableArticles = await getAllArticleStoreRecords();

  return (
    <div className="overflow-auto">
      <Button asChild variant="ghost" className="w-full">
        <Link href="./currentlyreading">Currently Reading</Link>
      </Button>

      {currentlyReadingArticles.map((item) => (
        <ArticleItem item={item} onRemove={removeItemFromUserReads} />
      ))}

      <AddCurrentlyReadingModal
        listArticles={currentlyReadingArticles}
        articles={availableArticles}
      />
    </div>
  );
}
