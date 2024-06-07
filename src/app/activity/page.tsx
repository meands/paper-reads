import { CURRENT_USER } from "../constants/user";
import { getFollowingActivity } from "../home/actions";

export default async function Activity() {
  const activity = await getFollowingActivity(CURRENT_USER);
  return (
    <div>
      <h1>Activity</h1>
      <section>
        {activity.map((a) => {
          return (
            <div>
              {`${a.user_info?.username} ${a.activity_type} article: ${
                a.article_store.title
              } at ${a.created_at.toDateString()}`}
            </div>
          );
        })}
      </section>
    </div>
  );
}
