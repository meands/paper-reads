import React from "react";
import { getFollowings } from "../home/actions";
import Link from "next/link";
import { CURRENT_USER } from "../constants/user";
import { Button } from "@/components/ui/button";
import { ViewActivity } from "./viewActivity";

export default async function Followings() {
  const followings = await getFollowings(CURRENT_USER);

  return (
    <div className="flex gap-2 flex-col p-14">
      {followings.map((user) => (
        <div className="flex gap-2 h-full items-center">
          <Button variant="ghost" asChild>
            <Link href={`/userProfile/${user.to_user}`}>
              {user.user_info_user_relations_to_userTouser_info.display_name}
            </Link>
          </Button>
          {/* TODO: hover effect */}
          <Link href={`/userProfile/${user.to_user}`}>
            <img
              width={100}
              height={100}
              src={
                user.user_info_user_relations_to_userTouser_info.profile_pic ||
                undefined
              }
              className="rounded-lg"
            />
          </Link>
          <span>{user.user_info_user_relations_to_userTouser_info.bio}</span>

          <ViewActivity id={user.to_user} />
        </div>
      ))}
    </div>
  );
}
