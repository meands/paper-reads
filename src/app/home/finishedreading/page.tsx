import Link from "next/link";
import { ArticleItem } from "../../../components/item";
import { getFinishedReadingRecords, removeItemFromUserReads } from "../actions";

export default async function FinishedReading() {
  const currentlyReadingArticles = await getFinishedReadingRecords();
  return (
    <div>
      <Link href="/myspace/finishedreading">
        <h2>Finished Reading</h2>
      </Link>
      {currentlyReadingArticles?.map((item) => (
        <ArticleItem item={item} onRemove={removeItemFromUserReads} />
      ))}
      <Link href="./addfinishedreading">+ Add New Item</Link>
    </div>
  );
}
