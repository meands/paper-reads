import { getArticle, getFullUserInfo } from "@/app/home/actions";
import { article_state } from "@/types/article";
import { user_reads } from "@prisma/client";
import Link from "next/link";
import React from "react";

export default async function UserProfile({
  params,
}: {
  params: { userId: string };
}) {
  const userInfo = await getFullUserInfo(parseInt(params.userId));
  const partitionedArticles = partition(userInfo);

  const finishedWithReview = userInfo?.user_reads.filter(
    (e) => e.date_completed && e.review
  );
  const finishedWithRating = userInfo?.user_reads.filter(
    (e) => e.date_completed && e.rating
  );

  return (
    <div>
      <h1>{userInfo?.username}</h1>
      <section>
        <h2>Want to Read</h2>
        {partitionedArticles?.[0]?.map((item: user_reads) => (
          <ArticleItem item={{ id: item.article_id }} />
        ))}
      </section>
      <section>
        <h2>Currently Reading</h2>
        {partitionedArticles?.[1]?.map((item: user_reads) => (
          <ArticleItem item={{ id: item.article_id }} />
        ))}
      </section>
      <section>
        <h2>Finished Reading</h2>
        {partitionedArticles?.[2]?.map((item: user_reads) => (
          <ArticleItem item={{ id: item.article_id }} />
        ))}
      </section>

      <section>
        <h2>Reviews / Ratings</h2>
        <div
          style={{
            display: "flex",
            gap: 10,
            flexDirection: "column",
            paddingBottom: 20,
          }}
        >
          {finishedWithReview?.map((article) => {
            return (
              <span>
                Finished {article.article.title} with review: {article.review}
              </span>
            );
          })}
        </div>
        <div style={{ display: "flex", gap: 10, flexDirection: "column" }}>
          {finishedWithRating?.map((article) => {
            return (
              <span>
                Finished {article.article.title} with rating: {article.rating}
              </span>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export async function ArticleItem({ item }: { item: { id: number } }) {
  const articleInfo = await getArticle(item.id);
  return (
    <div style={{ display: "flex", flexDirection: "row", gap: 10 }}>
      <Link href={`/read/${item.id}`}>{articleInfo?.title}</Link>
    </div>
  );
}

function partition(data?: { user_reads?: user_reads[] } | null) {
  return data?.user_reads?.reduce(
    (acc, cur) => {
      switch (cur.status) {
        case article_state.wantToRead:
          acc[0].push(cur);
          return acc;
        case article_state.currentlyReading:
          acc[1].push(cur);
          return acc;
        case article_state.finishedReading:
          acc[2].push(cur);
          return acc;
        default:
          return acc;
      }
    },
    [[] as user_reads[], [] as user_reads[], [] as user_reads[]]
  );
}
