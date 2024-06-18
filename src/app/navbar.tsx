import Link from "next/link";
import React from "react";

export default function NavBar() {
  return (
    <nav className="container bg-slate-400 p-1 h-10">
      <ol className="flex flex-row justify-evenly gap-1 h-full">
        <Link
          href="/home"
          className="bg-slate-500 flex-grow flex justify-center items-center rounded-lg hover:bg-slate-100"
        >
          Home
        </Link>
        <Link
          href="/followings"
          className="bg-slate-500 flex-grow flex justify-center items-center rounded-lg hover:bg-slate-100"
        >
          Following
        </Link>
        <Link
          href="/activity"
          className="bg-slate-500 flex-grow flex justify-center items-center rounded-lg hover:bg-slate-100"
        >
          Activity
        </Link>
        <Link
          href="/explore"
          className="bg-slate-500 flex-grow flex justify-center items-center rounded-lg hover:bg-slate-100"
        >
          Explore
        </Link>
      </ol>
    </nav>
  );
}
