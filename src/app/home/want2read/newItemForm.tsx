"use client";
import { addItemToWantToRead } from "../actions";
import { article_store } from "@prisma/client";
import { NewItemForm } from "@/components/newItemForm";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const formFields = {
  articles: [] as number[],
  startDate: "",
} as const;

export function WantToReadModal({
  articles,
  listArticles,
}: {
  articles: article_store[];
  listArticles: article_store[];
}) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button variant="ghost" className="w-full" onClick={() => setOpen(true)}>
        +
      </Button>
      <DialogContent>
        <DialogTitle>Add New Article</DialogTitle>
        <DialogDescription>
          <WantToReadForm
            articles={articles}
            listArticles={listArticles}
            onClose={() => setOpen(false)}
          />
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}
function WantToReadForm({
  articles,
  listArticles,
  onClose,
}: {
  articles: article_store[];
  listArticles: article_store[];
  onClose: () => void;
}) {
  return (
    <NewItemForm
      defaultValues={formFields}
      articles={articles}
      listArticles={listArticles}
      onSubmit={(values: typeof formFields) => {
        values.articles.forEach((article) => {
          addItemToWantToRead(article);
        });
        onClose();
      }}
      fields={[]}
    />
  );
}
