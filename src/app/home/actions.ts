"use server";

import {
  getArticleStoreRecordsByName,
  insertRecordIntoCurrentlyReading,
  insertRecordIntoFinishedReading,
  insertRecordIntoWantToRead,
  removeRecordFromCurrentlyReading,
  removeRecordFromWantToRead,
} from "@/pages/api/dbActions";
import { revalidatePath } from "next/cache";

export async function addItemToCurrentlyReading(id: number, date?: string) {
  const res = await insertRecordIntoCurrentlyReading(id, date);
  revalidatePath("/myspace");
}

export async function addItemToWantToRead(id: number, note?: string) {
  const res = await insertRecordIntoWantToRead(id, note);
  revalidatePath("/myspace");
}

export async function addItemToFinishedReading(
  id: number,
  review?: string,
  rating?: number
) {
  const res = await insertRecordIntoFinishedReading(id, review, rating);
  revalidatePath("/myspace");
}

export async function removeItemFromCurrentlyReading(id: number) {
  const res = await removeRecordFromCurrentlyReading(id);
  revalidatePath("/myspace");
}

export async function removeItemFromWantToRead(id: number) {
  const res = await removeRecordFromWantToRead(id);
  revalidatePath("/myspace");
}

export async function searchForArticle(name: string) {
  const res = await getArticleStoreRecordsByName(name);
  return res;
}
