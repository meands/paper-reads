"use client";

import { article_store, user_reads_notes } from "@prisma/client";
import Link from "next/link";

export function ArticleItem({
  item,
  onRemove,
}: {
  item: article_store & {
    user_reads_notes: user_reads_notes[];
  };
  onRemove: (id: number) => void;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "row", gap: 10 }}>
      <Link href={`../read/${item.recordid}`}>{item.title}</Link>
      <button onClick={() => onRemove(item.recordid)}>Remove</button>
    </div>
  );
}
