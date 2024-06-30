"use client";
import { addItemToCurrentlyReading } from "@/utils/actions";
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
import { useRouter } from "next/navigation";

const formFields = {
  articles: [] as number[],
  startDate: "",
} as const;

export function AddToCurrentlyReadingModal({
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
        <DialogTitle>Add to Currently Reading</DialogTitle>
        <DialogDescription>
          <AddToCurrentlyReadingForm
            articles={articles}
            selectedArticles={selectedArticles}
          />
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}

function AddToCurrentlyReadingForm({
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
        for (const article of values.articles) {
          await addItemToCurrentlyReading(article, values.startDate);
        }
        router.back();
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
