import { getWantToReadRecords } from "@/pages/api/dbActions";
import styles from "./page.module.css";
import Link from "next/link";
import { ArticleItem } from "@/components/item";
import { removeItemFromWantToRead } from "../actions";

export default async function WantToRead() {
  const availableArticles = await getWantToReadRecords();
  return (
    <div className={styles.list}>
      <Link href="/myspace/want2read">
        <h2>Want to Read</h2>
      </Link>
      {availableArticles?.map((item) => (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            paddingBottom: 10,
          }}
        >
          <ArticleItem item={item} onRemove={removeItemFromWantToRead} />
          <span>Note: {item.note}</span>
        </div>
      ))}
      <Link href="./addwant2read">+ Add New Item</Link>
    </div>
  );
}
