import { MoveToCurrentlyReadingModal } from "@/components/moveToCurrentlyReadingModal";

export default function MoveToCurrentlyReadingView({
  params,
}: {
  params: { articleId: string };
}) {
  return <MoveToCurrentlyReadingModal articleId={parseInt(params.articleId)} />;
}
