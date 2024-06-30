import { getArticle } from "@/utils/actions";
import React from "react";

export default async function ArticlePage({
  params,
}: {
  params: { articleId: string };
}) {
  const article = await getArticle(parseInt(params.articleId));
  return (
    <div>
      <h1>{article?.title}</h1>
      <h2>{article?.author}</h2>
      <p>Published: {article?.publication_date?.toDateString()}</p>
      <p>DOI: {article?.doi}</p>
    </div>
  );
}
