import {
  PrismaClient,
  article_store,
  review_comment,
  user_article_activity,
  user_info,
  user_reads,
  user_reads_notes,
  user_relations,
} from "@prisma/client";
import { faker } from "@faker-js/faker";

// TODO: something about paths ... seeding fails due to article_state not being found when import
const article_state = {
  wantToRead: "want to read",
  currentlyReading: "currently reading",
  finishedReading: "finished reading",
} as const;

const prisma = new PrismaClient();

const articleCount = 50;
const userCount = 50;
const minUserReads = 5;
const maxUserReads = 20;
const minUserComments = 3;
const maxUserComments = 10;
const minNotes = 0;
const maxNotes = 5;
const minFollowings = 2;
const maxFollowings = 7;

async function main() {
  const articles: article_store[] = [];
  const users: user_info[] = [];
  const userReads: user_reads[] = [];
  const comments: review_comment[] = [];
  const userActivity: user_article_activity[] = [];
  const userNotes: user_reads_notes[] = [];
  const userFollowings: user_relations[] = [];

  for (let i = 0; i < articleCount; i++) {
    articles.push({
      recordid: i,
      title: faker.word.words({ count: { min: 3, max: 8 } }),
      author: faker.helpers
        .arrayElements([faker.person.fullName()], { min: 1, max: 5 })
        .join(", "),
      doi: faker.string.uuid(),
      publication_date: faker.date.past(),
    });
  }
  await prisma.article_store.createMany({ data: articles });

  for (let i = 0; i < userCount; i++) {
    // creating user
    users.push({
      user_id: i,
      display_name: faker.internet.displayName(),
      username: faker.internet.userName(),
      bio: faker.person.bio(),
      password: faker.internet.password(),
      date_joined: faker.date.past(),
      profile_pic: faker.image.url(),
    });

    // what the user is reading
    const currentUserReads = faker.number.int({
      min: minUserReads,
      max: maxUserReads,
    });
    const currentUserArticles = faker.helpers.uniqueArray(
      Array.from(Array(articleCount).keys()),
      currentUserReads
    );
    currentUserArticles.forEach((articleId) => {
      const state = faker.helpers.arrayElement([
        article_state.wantToRead,
        article_state.currentlyReading,
        article_state.finishedReading,
      ]);
      const started = state === "currently reading" ? faker.date.past() : null;
      const finished = state === "finished reading" ? faker.date.past() : null;
      userReads.push({
        article_id: articleId,
        user_id: i,
        date_started: started,
        date_completed: finished,
        status: state,
        rating:
          state === "finished reading"
            ? faker.number.int({ min: 0, max: 5 })
            : null,
        review:
          state === "finished reading"
            ? faker.helpers
                .multiple(
                  () => faker.word.words({ count: { min: 10, max: 30 } }),
                  { count: { min: 3, max: 6 } }
                )
                .join(". ")
            : null,
      });
      userActivity.push({
        user_id: i,
        article_id: articleId,
        activity_type: `add to ${state}`,
        created_at: faker.date.past(),
      } as user_article_activity);

      // what the user has made notes on for this article - only currently reading / finished reading
      if (state === "currently reading" || state === "finished reading") {
        const noteCount = faker.number.int({ min: minNotes, max: maxNotes });
        for (let j = 0; j < noteCount; j++) {
          userNotes.push({
            user_id: i,
            article_id: articleId,
            note: faker.word.words({ count: { min: 5, max: 20 } }),
            published_timestamp: faker.date.past(),
          } as user_reads_notes);
        }
      }

      // what the user has commented
      const currentUserComments = faker.number.int({
        min: minUserComments,
        max: maxUserComments,
      });
      const userCommentArticles = faker.helpers.uniqueArray(
        Array.from(Array(articleCount).keys()),
        currentUserComments
      );
      userCommentArticles.forEach((articleId) => {
        comments.push({
          article_id: articleId,
          author_id: i,
          comment: faker.word.words({ count: { min: 5, max: 20 } }),
          published_timestamp: faker.date.past(),
        } as review_comment);
      });
    });

    // user's followings
    const currentUserFollowingCount = faker.number.int({
      min: minFollowings,
      max: maxFollowings,
    });
    const followingUserIds = faker.helpers.uniqueArray(
      Array.from(Array(userCount - 1).keys()),
      currentUserFollowingCount
    );
    followingUserIds.forEach((userId) => {
      !followingUserIds.includes(i) &&
        userFollowings.push({
          from_user: i,
          to_user: userId,
          created_at: faker.date.past(),
        } as user_relations);
    });
  }
  await prisma.user_info.createMany({ data: users });
  await prisma.user_reads.createMany({ data: userReads });
  await prisma.review_comment.createMany({ data: comments });
  await prisma.user_article_activity.createMany({ data: userActivity });
  await prisma.user_reads_notes.createMany({ data: userNotes });
  await prisma.user_relations.createMany({ data: userFollowings });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
