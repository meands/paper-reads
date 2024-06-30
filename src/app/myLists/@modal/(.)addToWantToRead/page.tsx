import { AddToWantToReadModal } from "@/components/wantToRead/addToWantToRead";
import {
  getAllArticleStoreRecords,
  getWantToReadRecords,
} from "@/utils/actions";

export default async function AddToWantToRead() {
  const wantToReadArticles = await getWantToReadRecords();
  const allArticles = await getAllArticleStoreRecords();

  return (
    <AddToWantToReadModal
      articles={allArticles}
      selectedArticles={wantToReadArticles}
    />
  );
}
