"use client";
import { useState } from "react";
import {
  addItemToCurrentlyReading,
  addItemToFinishedReading,
  addItemToWantToRead,
  searchForArticle,
} from "../actions";
import {
  article_store,
  currently_reading,
  finished_reading,
  want_to_read,
} from "@prisma/client";

export default function AddNew({
  title,
  articles,
  listArticles,
  formRenderer,
}: {
  title: string;
  articles: article_store[];
  listArticles: ((want_to_read | currently_reading | finished_reading) &
    article_store)[];
  formRenderer: ({ options }: { options: article_store[] }) => JSX.Element;
}) {
  const [options, setOptions] = useState<article_store[]>(articles);
  const Form = formRenderer;
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <h3>{title}</h3>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const searchResults = await searchForArticle(
            new FormData(e.target as HTMLFormElement).get("search") as string
          );
          setOptions(searchResults);
        }}
        style={{
          display: "flex",
          flexDirection: "column",
          padding: 20,
          gap: 10,
          maxHeight: 300,
          overflow: "auto",
        }}
      >
        <input placeholder="search for article" name="search" />
        <button type="submit">Search</button>
      </form>
      <Form
        options={options.filter(
          (article) => !listArticles.find((c) => c.id === article.id)
        )}
      />
    </div>
  );
}

export function AddWantToReadForm({ options }: { options: article_store[] }) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const data = new FormData(e.target as HTMLFormElement);
        addItemToWantToRead(
          parseInt(data.get("article") as string),
          data.get("note") as string
        );
      }}
      style={{
        display: "flex",
        flexDirection: "column",
        padding: 20,
        gap: 10,
        maxHeight: 300,
        overflow: "auto",
      }}
    >
      {options.map((article) => (
        <div key={article.id}>
          <input type="radio" name="article" value={article.id} />
          <label htmlFor="article">{article.title}</label>
        </div>
      ))}
      <label htmlFor="note">Note</label>
      <input placeholder="make a note" name="note" />
      <button type="submit">Submit</button>
    </form>
  );
}

export function AddCurrentlyReadingForm({
  options,
}: {
  options: article_store[];
}) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const data = new FormData(e.target as HTMLFormElement);
        addItemToCurrentlyReading(
          parseInt(data.get("article") as string),
          data.get("date") as string
        );
      }}
      style={{
        display: "flex",
        flexDirection: "column",
        padding: 20,
        gap: 10,
        maxHeight: 300,
        overflow: "auto",
      }}
    >
      {options.map((article) => (
        <div key={article.id}>
          <input type="radio" name="article" value={article.id} />
          <label htmlFor="article">{article.title}</label>
        </div>
      ))}
      <label htmlFor="date">Start Date</label>
      <input placeholder="yyyy-mm-dd" name="date" />
      <button type="submit">Submit</button>
    </form>
  );
}

export function AddFinishedReadingForm({
  options,
}: {
  options: article_store[];
}) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const data = new FormData(e.target as HTMLFormElement);
        addItemToFinishedReading(
          parseInt(data.get("article") as string),
          data.get("review") as string,
          parseInt(data.get("rating") as string)
        );
      }}
      style={{
        display: "flex",
        flexDirection: "column",
        padding: 20,
        gap: 10,
        maxHeight: 300,
        overflow: "auto",
      }}
    >
      {options.map((article) => (
        <div key={article.id}>
          <input type="radio" name="article" value={article.id} />
          <label htmlFor="article">{article.title}</label>
        </div>
      ))}
      <label htmlFor="review">Review</label>
      <input placeholder="review" name="review" />

      <label htmlFor="rating">Rating</label>
      <input placeholder="rating" name="rating" />

      <button type="submit">Submit</button>
    </form>
  );
}
