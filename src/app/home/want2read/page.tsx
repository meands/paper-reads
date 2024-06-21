import {
  getAllArticleStoreRecords,
  getWantToReadRecords,
  removeItemFromUserReads,
} from "../actions";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { WantToReadModal } from "./newItemForm";
import { ArticleItem } from "@/components/articleItem";

export default async function WantToRead() {
  const wantToReadArticles = await getWantToReadRecords();
  const availableArticles = await getAllArticleStoreRecords();

  return (
    <div className="overflow-auto">
      <Button asChild variant="ghost" className="w-full">
        <Link href="./want2read">Want to Read</Link>
      </Button>
      {wantToReadArticles.map((item) => (
        <ArticleItem item={item} onRemove={removeItemFromUserReads} />
      ))}
      <WantToReadModal
        articles={availableArticles}
        listArticles={wantToReadArticles}
      />
    </div>
  );
}
