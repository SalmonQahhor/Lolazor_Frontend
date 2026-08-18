"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  page: number;
  totalCount: number;
  pageSize?: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  page,
  totalCount,
  pageSize = 12,
  onPageChange,
}: PaginationProps) {
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));
  if (totalPages <= 1) return null;

  const pageNumbers = buildPageRange(page, totalPages);

  return (
    <nav
      aria-label="Sahifalash"
      className="flex items-center justify-center gap-1.5 pt-4"
    >
      <button
        type="button"
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
        className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-text-muted transition hover:border-lolazor-sky/50 hover:text-lolazor-sky disabled:opacity-30 disabled:hover:border-border disabled:hover:text-text-muted"
        aria-label="Oldingi sahifa"
      >
        <ChevronLeft size={16} />
      </button>

      {pageNumbers.map((n, idx) =>
        n === "ellipsis" ? (
          <span
            key={`ellipsis-${idx}`}
            className="flex h-9 w-9 items-center justify-center text-sm text-text-muted"
          >
            &hellip;
          </span>
        ) : (
          <button
            key={n}
            type="button"
            onClick={() => onPageChange(n)}
            aria-current={n === page ? "page" : undefined}
            className={
              n === page
                ? "flex h-9 w-9 items-center justify-center rounded-full bg-lolazor-sky text-sm font-semibold text-background"
                : "flex h-9 w-9 items-center justify-center rounded-full text-sm font-medium text-text-muted transition hover:bg-card hover:text-text-main"
            }
          >
            {n}
          </button>
        )
      )}

      <button
        type="button"
        disabled={page >= totalPages}
        onClick={() => onPageChange(page + 1)}
        className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-text-muted transition hover:border-lolazor-sky/50 hover:text-lolazor-sky disabled:opacity-30 disabled:hover:border-border disabled:hover:text-text-muted"
        aria-label="Keyingi sahifa"
      >
        <ChevronRight size={16} />
      </button>
    </nav>
  );
}

function buildPageRange(current: number, total: number): (number | "ellipsis")[] {
  const delta = 1;
  const range: (number | "ellipsis")[] = [];
  const left = Math.max(2, current - delta);
  const right = Math.min(total - 1, current + delta);

  range.push(1);
  if (left > 2) range.push("ellipsis");
  for (let i = left; i <= right; i++) range.push(i);
  if (right < total - 1) range.push("ellipsis");
  if (total > 1) range.push(total);

  return range;
}
