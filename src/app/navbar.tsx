import Link from "next/link";
import React from "react";

export default function NavBar() {
  return (
    <div>
      <nav>
        <ol
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
          }}
        >
          <Link href={"/home"}>Home</Link>
          <Link href={"/followings"}>Following</Link>
          <Link href={"/activity"}>Activity</Link>
          <Link href="/explore">Explore</Link>
        </ol>
      </nav>
    </div>
  );
}
