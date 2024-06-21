"use client";
import { addItemToCurrentlyReading } from "../actions";
import { article_store } from "@prisma/client";
import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
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

export function AddCurrentlyReadingModal({
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
          <CurrentlyReadingForm
            articles={articles}
            listArticles={listArticles}
            closeModal={() => setOpen(false)}
          />
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}

function CurrentlyReadingForm({
  articles,
  listArticles,
  closeModal,
}: {
  articles: article_store[];
  listArticles: article_store[];
  closeModal: () => void;
}) {
  return (
    <NewItemForm
      defaultValues={formFields}
      articles={articles}
      listArticles={listArticles}
      onSubmit={(values: typeof formFields) => {
        values.articles.forEach(async (article) => {
          await addItemToCurrentlyReading(article, values.startDate);
        });
        closeModal();
      }}
      fields={[
        {
          name: "startDate",
          Renderer: ({ field }) => (
            <FormItem>
              <FormLabel>Start Date</FormLabel>
              <FormControl>
                <Input placeholder="yyyy-mm-dd" {...field} />
              </FormControl>
            </FormItem>
          ),
        },
      ]}
    />
  );
}
