import Link from "next/link";
import { ArticleItem } from "../../../components/articleItem";
import {
  getAllArticleStoreRecords,
  getFinishedReadingRecords,
  removeItemFromUserReads,
} from "../actions";
import { Button } from "@/components/ui/button";
import { FinishedReadingModal } from "./newItemForm";

export default async function FinishedReading() {
  const currentlyReadingArticles = await getFinishedReadingRecords();
  const availableArticles = await getAllArticleStoreRecords();

  return (
    <div className="overflow-auto">
      <Button asChild variant="ghost" className="w-full">
        <Link href="./finishedreading">Finished Reading</Link>
      </Button>
      {currentlyReadingArticles.map((item) => (
        <ArticleItem item={item} onRemove={removeItemFromUserReads} />
      ))}
      <FinishedReadingModal
        articles={availableArticles}
        listArticles={currentlyReadingArticles}
      />
    </div>
  );
}
