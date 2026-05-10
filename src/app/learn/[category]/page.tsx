export const dynamic = "force-static";
import { getAllTopics } from "@/data/vocabulary";
import FlashCardClient from "./FlashCardClient";

export function generateStaticParams() {
  return getAllTopics().map((c) => ({ category: c.id }));
}

export default function FlashCardPage() {
  return <FlashCardClient />;
}
