import { article_store } from "@prisma/client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const formFields = {
  articleName: "",
  articleDoi: "",
} as const;

export function SearchArticle({
  handleSearch,
}: {
  articles: article_store[];
  selectedArticles: article_store[];
  handleSearch: (values: typeof formFields) => void;
}) {
  const form = useForm({
    defaultValues: formFields,
  });

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSearch)}
          className="flex flex-col gap-2"
        >
          <FormField
            control={form.control}
            name="articleName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Article Name</FormLabel>
                <FormControl>
                  <Input placeholder="article name" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="articleDoi"
            render={({ field }) => (
              <FormItem>
                <FormLabel>DOI</FormLabel>
                <FormControl>
                  <Input placeholder="article doi" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <div className="w-full flex justify-end">
            <Button type="submit">Search</Button>
          </div>
        </form>
      </Form>
    </>
  );
}
