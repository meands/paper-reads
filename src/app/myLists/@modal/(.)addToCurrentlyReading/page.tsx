import { AddToCurrentlyReadingModal } from "@/components/currentlyReading/addToCurrentlyReading";
import {
  getAllArticleStoreRecords,
  getCurrentlyReadingRecords,
} from "@/utils/actions";

export default async function AddToCurrentlyReading() {
  const currentlyReading = await getCurrentlyReadingRecords();
  const allArticles = await getAllArticleStoreRecords();

  return (
    <AddToCurrentlyReadingModal
      articles={allArticles}
      selectedArticles={currentlyReading}
    />
  );
}
