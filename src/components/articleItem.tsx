"use client";

import { article_store, user_reads_notes } from "@prisma/client";
import Link from "next/link";
import { Button } from "./ui/button";

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
    <div className="flex flex-row justify-between items-center border-t-2 border-b-2">
      <Button asChild variant="ghost">
        <Link
          href={`../read/${item.recordid}`}
          className="text-wrap hover:bg-slate-100"
        >
          {item.title}
        </Link>
      </Button>
      <Button variant="ghost" onClick={() => onRemove(item.recordid)}>
        -
      </Button>
    </div>
  );
}
