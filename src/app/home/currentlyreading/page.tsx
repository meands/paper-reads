import styles from "./page.module.css";
import { getCurrentlyReadingRecords } from "@/pages/api/dbActions";
import Link from "next/link";
import { ArticleItem } from "../../../components/item";
import { removeItemFromCurrentlyReading } from "../actions";

export default async function CurrentlyReading() {
  const currentlyReadingArticles = await getCurrentlyReadingRecords();
  return (
    <div className={styles.list}>
      <Link href="./currentlyreading">
        <h2>Currently Reading</h2>
      </Link>
      {currentlyReadingArticles?.map((item) => (
        <ArticleItem item={item} onRemove={removeItemFromCurrentlyReading} />
      ))}
      <Link href="./addcurrentlyreading">+ Add New Item</Link>
    </div>
  );
}
