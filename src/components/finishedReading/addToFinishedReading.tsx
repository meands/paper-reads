"use client";
import { article_store } from "@prisma/client";
import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { NewItemForm } from "@/components/newItemForm";
import { addItemToFinishedReading } from "@/utils/actions";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";

const formFields = {
  articles: [] as number[],
  finishedDate: "",
  review: "",
  rating: "",
} as const;

export function AddToFinishedReadingModal({
  articles,
  selectedArticles,
}: {
  articles: article_store[];
  selectedArticles: article_store[];
}) {
  const router = useRouter();

  return (
    <Dialog defaultOpen>
      <DialogContent onClose={router.back} onInteractOutside={router.back}>
        <DialogTitle>Add to Finished Reading</DialogTitle>
        <DialogDescription>
          <FinishedReadingForm
            articles={articles}
            selectedArticles={selectedArticles}
          />
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}

function FinishedReadingForm({
  articles,
  selectedArticles,
}: {
  articles: article_store[];
  selectedArticles: article_store[];
}) {
  const router = useRouter();

  return (
    <NewItemForm
      defaultValues={formFields}
      articles={articles}
      selectedArticles={selectedArticles}
      onSubmit={async (values: typeof formFields) => {
        await addItemToFinishedReading(
          values.articles[0],
          values.finishedDate,
          values.review,
          parseInt(values.rating)
        );
        router.back();
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
