import { BookOpen, ExternalLink, Newspaper } from "lucide-react";
import type { Resource, ResourceType } from "@/types/api";

const RESOURCE_META: Record<
  ResourceType,
  { label: string; icon: React.ElementType }
> = {
  book: { label: "Kitob", icon: BookOpen },
  article: { label: "Maqola", icon: Newspaper },
  link: { label: "Havola", icon: ExternalLink },
};

export default function ResourceBadge({ resource }: { resource: Resource }) {
  const meta = RESOURCE_META[resource.type];
  const Icon = meta.icon;

  return (
    <a
      href={resource.url}
      target="_blank"
      rel="noreferrer"
      className="group flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 transition hover:border-lolazor-sky/40"
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-lolazor-sky/10 text-lolazor-sky">
        <Icon size={16} />
      </span>
      <span className="flex-1 min-w-0">
        <span className="block text-[11px] font-semibold uppercase tracking-wide text-text-muted">
          {meta.label}
        </span>
        <span className="block truncate text-sm font-medium text-text-main transition group-hover:text-lolazor-sky">
          {resource.title}
        </span>
      </span>
      <ExternalLink
        size={14}
        className="shrink-0 text-text-muted transition group-hover:text-lolazor-sky"
      />
    </a>
  );
}
