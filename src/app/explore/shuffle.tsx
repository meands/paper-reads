"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function ShuffleBtn() {
  const router = useRouter();
  return <Button onClick={() => router.refresh()}>Shuffle</Button>;
}
