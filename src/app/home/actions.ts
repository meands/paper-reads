"use server";
import { revalidatePath } from "next/cache";
import prisma from "@/index";
import { activity_type, article_state } from "@/types/article";
import { CURRENT_USER } from "../constants/user";

export async function addItemToCurrentlyReading(id: number, date?: string) {
  const res = await prisma.user_reads.upsert({
    update: {
      status: article_state.currentlyReading,
      ...(date && { date_started: date }),
    },
    create: {
      user_id: CURRENT_USER,
      article_id: id,
      status: article_state.currentlyReading,
      ...(date && { date_started: date }),
    },
    where: {
      user_id_article_id: {
        user_id: CURRENT_USER,
        article_id: id,
      },
    },
  });
  const action = await prisma.user_article_activity.create({
    data: {
      activity_type: activity_type.addCurrentlyReading,
      article_id: id,
      user_id: CURRENT_USER,
    },
  });
  revalidatePath("/home");
}

export async function addItemToWantToRead(id: number) {
  const res = await prisma.user_reads.upsert({
    update: {
      status: article_state.wantToRead,
    },
    create: {
      user_id: CURRENT_USER,
      article_id: id,
      status: article_state.wantToRead,
    },
    where: {
      user_id_article_id: {
        user_id: CURRENT_USER,
        article_id: id,
      },
    },
  });
  const action = await prisma.user_article_activity.create({
    data: {
      activity_type: activity_type.addWantToRead,
      article_id: id,
      user_id: CURRENT_USER,
    },
  });
  revalidatePath("/home");
}

export async function addItemToFinishedReading(
  id: number,
  date?: string,
  review?: string,
  rating?: number
) {
  const res = await prisma.user_reads.upsert({
    update: {
      status: article_state.finishedReading,
      ...(date && { date_completed: date }),
      ...(review && { review }),
      ...(rating && { rating }),
    },
    create: {
      user_id: CURRENT_USER,
      ...(date && { date_completed: date }),
      ...(review && { review }),
      ...(rating && { rating }),
      article_id: id,
      status: article_state.finishedReading,
    },
    where: {
      user_id_article_id: {
        user_id: CURRENT_USER,
        article_id: id,
      },
    },
  });
  revalidatePath("/home");
}

export async function removeItemFromUserReads(id: number) {
  const res = await prisma.user_reads.delete({
    where: {
      user_id_article_id: {
        user_id: CURRENT_USER,
        article_id: id,
      },
    },
  });
  revalidatePath("/home");
}

export async function searchForArticles(name: string) {
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

export async function getArticle(id: number) {
  const res = await prisma.article_store.findUnique({
    where: {
      recordid: id,
    },
  });
  return res;
}

export async function getArticleWithNotes(articleId: number, userId: number) {
  const res = await prisma.article_store.findUnique({
    where: {
      recordid: articleId,
    },
    include: {
      user_reads_notes: {
        where: {
          user_id: userId,
        },
      },
    },
  });
  return res;
}

export async function getFollowings(userId: number) {
  const res = await prisma.user_relations.findMany({
    where: {
      from_user: userId,
    },
    include: {
      user_info_user_relations_to_userTouser_info: true,
    },
  });
  return res;
}

export async function getFullUserInfo(id: number) {
  const userInfo = await prisma.user_info.findUnique({
    where: { user_id: id },
    include: {
      user_reads: {
        orderBy: {
          date_completed: "desc",
        },
      },
      user_reads_notes: true,
    },
  });
  const articles = await prisma.article_store.findMany({
    where: {
      recordid: {
        in: userInfo?.user_reads.map((e) => e.article_id),
      },
    },
  });
  if (!userInfo) return null;
  return {
    ...userInfo,
    user_reads: userInfo.user_reads.map((e, i) => ({
      ...e,
      article: articles[i],
    })),
  };
}

export async function getFollowingActivity(userId: number) {
  const followings = await prisma.user_relations.findMany({
    where: {
      from_user: userId,
    },
  });
  const followingSet = [...new Set(followings.map((u) => u.to_user))];
  const activity = await prisma.user_article_activity.findMany({
    where: {
      user_id: {
        in: followingSet,
      },
    },
    include: {
      article_store: true,
      user_info: true,
    },
    orderBy: {
      created_at: "desc",
    },
  });
  return activity;
}

export async function getAllArticleStoreRecords() {
  const res = prisma.article_store.findMany();
  return res;
}

export async function getCurrentlyReadingRecords() {
  // TODO: two queries
  const reads = await prisma.user_reads.findMany({
    where: {
      user_id: CURRENT_USER,
      status: article_state.currentlyReading,
    },
  });
  const readsIds = reads.map((e) => e.article_id);
  const res = await prisma.article_store.findMany({
    where: {
      recordid: {
        in: readsIds,
      },
    },
    select: {
      recordid: true,
      title: true,
      author: true,
      doi: true,
      publication_date: true,
      user_reads_notes: true,
    },
  });
  return res;
}

export async function getWantToReadRecords() {
  const reads = await prisma.user_reads.findMany({
    where: {
      user_id: CURRENT_USER,
      status: article_state.wantToRead,
    },
  });
  const readsIds = reads.map((e) => e.article_id);
  const res = await prisma.article_store.findMany({
    where: {
      recordid: {
        in: readsIds,
      },
    },
    select: {
      recordid: true,
      title: true,
      author: true,
      doi: true,
      publication_date: true,
      user_reads_notes: true,
    },
  });
  return res;
}

export async function getFinishedReadingRecords() {
  const reads = await prisma.user_reads.findMany({
    where: {
      user_id: CURRENT_USER,
      status: article_state.finishedReading,
    },
  });
  const readsIds = reads.map((e) => e.article_id);
  const res = await prisma.article_store.findMany({
    where: {
      recordid: {
        in: readsIds,
      },
    },
    select: {
      recordid: true,
      title: true,
      author: true,
      doi: true,
      publication_date: true,
      user_reads_notes: true,
    },
  });
  return res;
}
