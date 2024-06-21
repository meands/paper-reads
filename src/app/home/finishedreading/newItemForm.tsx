"use client";
import { article_store } from "@prisma/client";
import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { NewItemForm } from "@/components/newItemForm";
import { addItemToFinishedReading } from "../actions";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const formFields = {
  articles: [] as number[],
  finishedDate: "",
  review: "",
  rating: "",
} as const;

export function FinishedReadingModal({
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
          <FinishedReadingForm
            articles={articles}
            listArticles={listArticles}
            onClose={() => setOpen(false)}
          />
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}

function FinishedReadingForm({
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
        addItemToFinishedReading(
          values.articles[0],
          values.finishedDate,
          values.review,
          parseInt(values.rating)
        );
        onClose();
      }}
      fields={[
        {
          name: "finishedDate",
          Renderer: ({ field }) => (
            <FormItem>
              <FormLabel>Start Date</FormLabel>
              <FormControl>
                <Input placeholder="yyyy-mm-dd" {...field} />
              </FormControl>
            </FormItem>
          ),
        },
        {
          name: "review",
          Renderer: ({ field }) => (
            <FormItem>
              <FormLabel>Review</FormLabel>
              <FormControl>
                <Input placeholder="review" {...field} />
              </FormControl>
            </FormItem>
          ),
        },
        {
          name: "rating",
          Renderer: ({ field }) => (
            <FormItem>
              <FormLabel>Rating</FormLabel>
              <FormControl>
                <Input placeholder="rating" {...field} />
              </FormControl>
            </FormItem>
          ),
        },
      ]}
    />
  );
}
