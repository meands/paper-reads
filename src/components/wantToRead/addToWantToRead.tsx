"use client";
import { addItemToWantToRead } from "@/utils/actions";
import { article_store } from "@prisma/client";
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

export function AddToWantToReadModal({
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
        <DialogTitle>Add New Article</DialogTitle>
        <DialogDescription>
          <AddToWantToReadForm
            articles={articles}
            selectedArticles={selectedArticles}
          />
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}

function AddToWantToReadForm({
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
          await addItemToWantToRead(article);
        }
        router.back();
      }}
      fields={[]}
    />
  );
}
