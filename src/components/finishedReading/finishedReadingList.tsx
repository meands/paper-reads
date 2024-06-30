"use client";

import { CURRENT_USER } from "@/constants/user";
import { article_store, user_reads_notes } from "@prisma/client";
import { ArticleItemWithMenu } from "../articleItem";

export function FinishedReadingList({
  articleItems,
}: {
  articleItems: (article_store & {
    user_reads_notes: user_reads_notes[];
  })[];
}) {
  return (
    <>
      {articleItems.map((item) => (
        <ArticleItemWithMenu
          key={item.recordid}
          item={item}
          actions={[
            { name: "View Article", link: `/read/${item.recordid}` },
            {
              name: "View Notes",
              link: `/read/${item.recordid}/${CURRENT_USER}`,
            },
          ]}
        />
      ))}
    </>
  );
}
