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

  const readingWithNotes = userInfo?.user_reads_notes;

  return (
    <div className="container pt-14">
      <section className="flex gap-4">
        <img
          width={100}
          height={100}
          src={userInfo?.profile_pic || undefined}
          className="rounded-lg"
        />
        <div className="flex flex-col">
          <h2 className="font-semibold">{userInfo?.username}</h2>
          <span>{userInfo?.bio}</span>
          <span className="text-slate-700">
            Joined {userInfo?.date_joined?.toDateString()}
          </span>
        </div>
      </section>

      <section className="flex flex-row gap-2 justify-evenly pt-10">
        {["Want to Read", "Currently Reading", "Finished Reading"].map(
          (list, i) => (
            <div className="flex flex-col gap-1">
              <h2 className="flex justify-center font-semibold">{list}</h2>
              <div>
                {partitionedArticles?.[i]?.map((item: user_reads) => (
                  <ArticleItem item={{ id: item.article_id }} />
                ))}
              </div>
            </div>
          )
        )}
      </section>

      <section className="pt-10">
        <h2 className="font-semibold">Reviews</h2>
        <div className="flex gap-2 flex-col pb-4">
          {finishedWithReview?.map((article) => (
            <p>
              <span className="text-slate-700">
                Finished{" "}
                <span className="font-semibold">{article.article.title}</span>{" "}
                with review:{" "}
              </span>
              {article.review}
            </p>
          ))}
        </div>
      </section>

      <section className="pt-4">
        <h2 className="font-semibold">Ratings</h2>
        <div className="flex gap-2 flex-col pb-4">
          {finishedWithRating?.map((article) => (
            <p>
              <span className="text-slate-700">
                Finished{" "}
                <span className="font-semibold">{article.article.title}</span>{" "}
                with rating:
              </span>{" "}
              {article.rating}
            </p>
          ))}
        </div>
      </section>

      <section className="pt-4">
        <h2 className="font-semibold">Notes</h2>
        <div className="flex gap-2 flex-col pb-4">
          {readingWithNotes?.map((article) => (
            <ArticleWithNote item={article} />
          ))}
        </div>
      </section>
    </div>
  );
}

export async function ArticleItem({ item }: { item: { id: number } }) {
  const articleInfo = await getArticle(item.id);
  return (
    <Link
      href={`/read/${item.id}`}
      className="flex items-center border-t-2 border-b-2 p-2"
    >
      {articleInfo?.title}
    </Link>
  );
}

async function ArticleWithNote({
  item,
}: {
  item: { article_id: number; note: string };
}) {
  const articleInfo = await getArticle(item.article_id);
  return (
    <p>
      <span className="text-slate-700">
        Made a note on{" "}
        <span className="font-semibold">{articleInfo?.title}</span>:{" "}
      </span>
      {item.note}
    </p>
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
