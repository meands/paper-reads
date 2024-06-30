import { getRandomArticles } from "@/utils/actions";
import { ShuffleBtn } from "./shuffle";

export default async function Explore() {
  const randomArticles = await getRandomArticles(10);

  return (
    <div className="container pt-14">
      {randomArticles.map((article) => (
        <div>
          {article.title} written by {article.author} on{" "}
          {article.publication_date?.toDateString()}
        </div>
      ))}
      <ShuffleBtn />
    </div>
  );
}
