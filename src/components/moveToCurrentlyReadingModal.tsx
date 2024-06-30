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
import { addItemToCurrentlyReading } from "@/utils/actions";

const formFields = {
  articles: [] as number[],
  startDate: "",
} as const;

export function MoveToCurrentlyReadingModal({
  articleId,
}: {
  articleId: number;
}) {
  const router = useRouter();

  return (
    <Dialog defaultOpen>
      <DialogContent onClose={router.back} onInteractOutside={router.back}>
        <DialogTitle>Move To Currently Reading</DialogTitle>
        <DialogDescription>
          <BasicForm
            defaultValues={formFields}
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
            onSubmit={async (values: typeof formFields) => {
              await addItemToCurrentlyReading(articleId, values.startDate);
              router.back();
            }}
          />
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}
