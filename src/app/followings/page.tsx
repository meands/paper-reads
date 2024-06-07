import React from "react";
import { getFollowings } from "../home/actions";
import Link from "next/link";
import { CURRENT_USER } from "../constants/user";

export default async function Followings() {
  const followings = await getFollowings(CURRENT_USER);

  return (
    <div>
      <h1>Followings</h1>
      <section style={{ display: "flex", gap: 20, flexDirection: "column" }}>
        {followings.map((user) => (
          <div style={{ display: "flex", gap: 10 }}>
            <Link href={`/userProfile/${user.to_user}`}>
              {user.user_info_user_relations_to_userTouser_info.display_name}
            </Link>
            <img
              width={100}
              height={100}
              src={
                user.user_info_user_relations_to_userTouser_info.profile_pic ||
                undefined
              }
            />
            <span>{user.user_info_user_relations_to_userTouser_info.bio}</span>
          </div>
        ))}
      </section>
    </div>
  );
}
