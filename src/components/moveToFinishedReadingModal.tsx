"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { BasicForm } from "./newItemForm";
import { FormControl, FormItem, FormLabel } from "./ui/form";
import { Input } from "./ui/input";
import { addItemToFinishedReading } from "@/utils/actions";

const formFields = {
  finishedDate: "",
  review: "",
  rating: "",
} as const;
export function MoveToFinishedReadingModal({
  articleId,
}: {
  articleId: number;
}) {
  const router = useRouter();

  return (
    <Dialog defaultOpen>
      <DialogContent onClose={router.back} onInteractOutside={router.back}>
        <DialogTitle>Move To Finished Reading</DialogTitle>
        <DialogDescription>
          <BasicForm
            defaultValues={formFields}
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
            onSubmit={async (values: typeof formFields) => {
              await addItemToFinishedReading(
                articleId,
                values.finishedDate,
                values.review,
                parseInt(values.rating)
              );
              router.back();
            }}
          />
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}
