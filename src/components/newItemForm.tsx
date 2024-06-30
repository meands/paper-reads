"use client";
import { useState } from "react";
import { article_store } from "@prisma/client";
import { ControllerRenderProps, FieldValues, useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { SearchArticle } from "@/components/searchArticle";
import { Checkbox } from "@/components/ui/checkbox";
import { searchForArticles } from "@/utils/actions";

export function NewItemForm<
  T extends FieldValues | { [x: string]: any } | undefined
>({
  defaultValues,
  articles,
  selectedArticles,
  onSubmit,
  fields,
}: {
  defaultValues: T;
  articles: article_store[];
  selectedArticles: article_store[];
  onSubmit: (values: T) => void;
  fields: {
    name: string;
    Renderer: ({
      field,
    }: {
      field: ControllerRenderProps<FieldValues, string>;
    }) => JSX.Element;
  }[];
}) {
  const form = useForm({
    defaultValues: defaultValues,
  });
  const [options, setOptions] = useState<article_store[]>(articles);

  return (
    <div className="flex flex-col gap-4">
      <SearchArticle
        articles={articles}
        selectedArticles={selectedArticles}
        handleSearch={async (values: { articleName: ""; articleDoi: "" }) => {
          const searchResults = await searchForArticles(values.articleName);
          setOptions(searchResults);
        }}
      />

      <Form {...form}>
        <form
          // TODO: fix type
          onSubmit={form.handleSubmit(onSubmit as any)}
          className="flex flex-col gap-2"
        >
          <FormField
            control={form.control}
            name="articles"
            render={() => (
              <FormItem>
                <FormLabel>Articles</FormLabel>
                <div className="flex gap-2 flex-col max-h-60 overflow-auto">
                  {options
                    .filter(
                      (option) =>
                        !selectedArticles.find(
                          (article) => article.title === option.title
                        )
                    )
                    .map((option) => (
                      <FormField
                        key={option.title}
                        control={form.control}
                        name="articles"
                        render={({ field }) => {
                          return (
                            <FormItem className="flex gap-1">
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(
                                    option.recordid
                                  )}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([
                                          ...field.value,
                                          option.recordid,
                                        ])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value: number) =>
                                              value !== option.recordid
                                          )
                                        );
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="hover:cursor-pointer">
                                {option.title}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      ></FormField>
                    ))}
                </div>
              </FormItem>
            )}
          />
          {fields.map((field) => {
            return (
              <FormField
                control={form.control}
                name={field.name}
                render={field.Renderer}
              />
            );
          })}
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}

export function BasicForm<
  T extends FieldValues | { [x: string]: any } | undefined
>({
  defaultValues,
  onSubmit,
  fields,
}: {
  defaultValues: T;
  onSubmit: (values: T) => void;
  fields: {
    name: string;
    Renderer: ({
      field,
    }: {
      field: ControllerRenderProps<FieldValues, string>;
    }) => JSX.Element;
  }[];
}) {
  const form = useForm({
    defaultValues: defaultValues,
  });

  return (
    <div className="flex flex-col gap-4">
      <Form {...form}>
        <form
          // TODO: fix type
          onSubmit={form.handleSubmit(onSubmit as any)}
          className="flex flex-col gap-2"
        >
          {fields.map((field) => {
            return (
              <FormField
                control={form.control}
                name={field.name}
                render={field.Renderer}
              />
            );
          })}
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}
