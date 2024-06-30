"use client";

import { CURRENT_USER } from "@/constants/user";
import { article_store, user_reads_notes } from "@prisma/client";
import { ArticleItemWithMenu } from "../articleItem";

import {
  MOVE_TO_CURRENTLY_READING,
  MOVE_TO_FINISHED_READING,
} from "@/constants/links";

export function WantToReadList({
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
            {
              name: "Move to Currently Reading",
              link: `${MOVE_TO_CURRENTLY_READING}/${item.recordid}`,
            },
            {
              name: "Move to Finished Reading",
              link: `${MOVE_TO_FINISHED_READING}/${item.recordid}`,
            },
          ]}
        />
      ))}
    </>
  );
}
