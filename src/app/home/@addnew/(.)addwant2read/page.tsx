import { Modal } from "@/components/modal";
import { getAllArticleStoreRecords, getWantToReadRecords } from "../../actions";
import AddNew, { AddWantToReadForm } from "../addnew";

export default async function AddWantToRead() {
  const wantToReadArticles = await getWantToReadRecords();
  const availableArticles = await getAllArticleStoreRecords();
  return (
    <Modal>
      <AddNew
        title="Add New Article"
        articles={availableArticles}
        listArticles={wantToReadArticles}
        formRenderer={AddWantToReadForm}
      />
    </Modal>
  );
}
