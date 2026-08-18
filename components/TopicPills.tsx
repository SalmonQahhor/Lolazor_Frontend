"use client";

import { cn } from "@/lib/utils";
import type { Topic } from "@/types/api";

interface TopicPillsProps {
  topics: Topic[];
  activeSlug: string | null;
  onSelect: (slug: string | null) => void;
}

export default function TopicPills({
  topics,
  activeSlug,
  onSelect,
}: TopicPillsProps) {
  if (topics.length === 0) return null;

  return (
    <div id="topics" className="flex flex-wrap gap-2">
      <button
        type="button"
        onClick={() => onSelect(null)}
        className={cn("pill", activeSlug === null && "pill-active")}
      >
        Barchasi
      </button>
      {topics.map((topic) => (
        <button
          key={topic.id}
          type="button"
          onClick={() => onSelect(topic.slug)}
          className={cn("pill", activeSlug === topic.slug && "pill-active")}
        >
          {topic.name}
        </button>
      ))}
    </div>
  );
}
