import { Modal } from "@/components/modal";
import {
  getAllArticleStoreRecords,
  getFinishedReadingRecords,
} from "@/pages/api/dbActions";
import AddNew, { AddFinishedReadingForm } from "../addnew";

export default async function AddFinishedReading() {
  const finishedReadingArticles = await getFinishedReadingRecords();
  const availableArticles = await getAllArticleStoreRecords();
  return (
    <Modal>
      <AddNew
        title="Add New Article"
        articles={availableArticles}
        listArticles={finishedReadingArticles}
        formRenderer={AddFinishedReadingForm}
      />
    </Modal>
  );
}
