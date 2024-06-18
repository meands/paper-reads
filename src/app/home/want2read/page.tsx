import { getWantToReadRecords, removeItemFromUserReads } from "../actions";
import Link from "next/link";
import { ArticleItem } from "@/components/item";
import { Button } from "@/components/ui/button";

export default async function WantToRead() {
  const availableArticles = await getWantToReadRecords();
  return (
    <div className="container">
      <Button asChild variant="ghost" className="w-full">
        <Link href="./want2read">Want to Read</Link>
      </Button>
      {availableArticles.map((item) => (
        <ArticleItem item={item} onRemove={removeItemFromUserReads} />
      ))}
      <Button asChild variant="ghost" className="w-full">
        <Link href="./addwant2read">+ Add New Item</Link>
      </Button>
    </div>
  );
}
