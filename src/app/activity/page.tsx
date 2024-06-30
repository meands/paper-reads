import { CURRENT_USER } from "../../constants/user";
import { getFollowingActivity } from "@/utils/actions";

export default async function Activity() {
  const activity = await getFollowingActivity(CURRENT_USER);
  return (
    <section className="container pt-14">
      {activity.map((a) => {
        return (
          <div className="border-t-2 p-2">
            {`${a.user_info?.username} ${a.activity_type} article: ${
              a.article_store.title
            } at ${a.created_at.toDateString()}`}
          </div>
        );
      })}
    </section>
  );
}
