import prisma from "@/index";
import {
  article_store,
  currently_reading,
  finished_reading,
  want_to_read,
} from "@prisma/client";

export async function getAllArticleStoreRecords() {
  const res = prisma.article_store.findMany();
  return res;
}

export async function insertRecordIntoCurrentlyReading(
  id: number,
  date?: string
) {
  const res = await prisma.currently_reading.create({
    data: {
      id: parseInt(id as any),
      ...(date && { start_date: date }),
    },
  });
}

export async function insertRecordIntoWantToRead(id: number, note?: string) {
  const res = await prisma.want_to_read.create({
    data: {
      id: id,
      ...(note && { note }),
    },
  });
}

export async function insertRecordIntoFinishedReading(
  id: number,
  review?: string,
  rating?: number
) {
  const res = await prisma.finished_reading.create({
    data: {
      id: id,
      ...(review && { review }),
      ...(rating && { rating }),
    },
  });
}

export async function removeRecordFromFinishedReading(id: number) {
  const res = await prisma.finished_reading.deleteMany({
    where: {
      id: id,
    },
  });
}

export async function removeRecordFromCurrentlyReading(id: number) {
  const res = await prisma.currently_reading.deleteMany({
    where: {
      id: id,
    },
  });
}

export async function removeRecordFromWantToRead(id: number) {
  const res = await prisma.want_to_read.deleteMany({
    where: {
      id: id,
    },
  });
}

export async function getCurrentlyReadingRecords() {
  const currently_reading_articles = await prisma.currently_reading.findMany();
  const articles = await prisma.article_store.findMany({
    where: {
      id: {
        in: currently_reading_articles.map((a) => a.id),
      },
    },
  });
  const res = articles.map((a) => ({
    ...a,
    ...currently_reading_articles.find((e) => e.id === a.id),
  }));
  return res as unknown as (currently_reading & article_store)[];
}

export async function getWantToReadRecords() {
  const want_to_read_articles = await prisma.want_to_read.findMany();
  const articles = await prisma.article_store.findMany({
    where: {
      id: {
        in: want_to_read_articles.map((a) => a.id),
      },
    },
  });
  const res = articles.map((a) => ({
    ...a,
    ...want_to_read_articles.find((e) => e.id === a.id),
  }));
  return res as unknown as (want_to_read & article_store)[];
}

export async function getFinishedReadingRecords() {
  const finished_reading_articles = await prisma.finished_reading.findMany();
  const articles = await prisma.article_store.findMany({
    where: {
      id: {
        in: finished_reading_articles.map((a) => a.id),
      },
    },
  });
  const res = articles.map((a) => ({
    ...a,
    ...finished_reading_articles.find((e) => e.id === a.id),
  }));
  return res as unknown as (finished_reading & article_store)[];
}

export async function getArticleStoreRecordsByName(name: string) {
  const res = await prisma.article_store.findMany({
    where: {
      title: {
        contains: name,
        mode: "insensitive",
      },
    },
  });
  return res;
}
