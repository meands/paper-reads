import { MoveToFinishedReadingModal } from "@/components/moveToFinishedReadingModal";

export default function MoveToFinishedReadingView({
  params,
}: {
  params: { articleId: string };
}) {
  return <MoveToFinishedReadingModal articleId={parseInt(params.articleId)} />;
}
