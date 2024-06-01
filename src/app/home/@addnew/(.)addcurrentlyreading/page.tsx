import { Modal } from "@/components/modal";
import {
  getAllArticleStoreRecords,
  getCurrentlyReadingRecords,
} from "@/pages/api/dbActions";
import AddNew, { AddCurrentlyReadingForm } from "../addnew";

export default async function AddCurrentlyReading() {
  const currentlyReadingArticles = await getCurrentlyReadingRecords();
  const availableArticles = await getAllArticleStoreRecords();
  return (
    <Modal>
      <AddNew
        title="Add New Article"
        articles={availableArticles}
        listArticles={currentlyReadingArticles}
        formRenderer={AddCurrentlyReadingForm}
      />
    </Modal>
  );
}
