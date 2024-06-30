import { AddToFinishedReadingModal } from "@/components/finishedReading/addToFinishedReading";
import {
  getAllArticleStoreRecords,
  getFinishedReadingRecords,
} from "@/utils/actions";

export default async function AddToFinishedReading() {
  const finishedArticles = await getFinishedReadingRecords();
  const allArticles = await getAllArticleStoreRecords();

  return (
    <AddToFinishedReadingModal
      articles={allArticles}
      selectedArticles={finishedArticles}
    />
  );
}
