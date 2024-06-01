"use client";

export function ArticleItem({
  item,
  onRemove,
}: {
  item: { id: number; title: string | null };
  onRemove: (id: number) => void;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "row", gap: 10 }}>
      <div>{item.title}</div>
      <button onClick={() => onRemove(item.id)}>Remove</button>
    </div>
  );
}
