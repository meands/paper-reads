import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import prisma from "@/index";

export function ViewActivity({ id }: { id: number }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">View Activity</Button>
      </PopoverTrigger>
      <PopoverContent>
        <UserActivity id={id} />
      </PopoverContent>
    </Popover>
  );
}

async function UserActivity({ id }: { id: number }) {
  const activity = await prisma.user_article_activity.findMany({
    where: {
      user_id: id,
    },
    include: {
      article_store: true,
    },
    orderBy: {
      created_at: "desc",
    },
    take: 7,
  });
  return (
    <div>
      {activity.map((e) => (
        <div>
          <span className="font-semibold">{e.article_store.title}</span>{" "}
          {e.activity_type} at {e.created_at.toDateString()}
        </div>
      ))}
    </div>
  );
}
