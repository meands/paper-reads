import { CURRENT_USER } from "@/constants/user";
import { getArticleWithNotes } from "@/utils/actions";
import React from "react";

export default async function ArticlePage({
  params,
}: {
  params: { articleId: string; userId: string };
}) {
  const article = await getArticleWithNotes(
    parseInt(params.articleId),
    CURRENT_USER
  );
  return (
    <div>
      <h1>{article?.title}</h1>
      <h2>{article?.author}</h2>
      <p>Published: {article?.publication_date?.toDateString()}</p>
      <p>DOI: {article?.doi}</p>

      <section>
        Notes:
        {article?.user_reads_notes.map((note) => (
          <p>{note.note}</p>
        ))}
      </section>
    </div>
  );
}
