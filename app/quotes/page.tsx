"use client";

import { Suspense, useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { getQuotes, ApiError } from "@/lib/api";
import type { Quote } from "@/types/api";
import QuoteCard from "@/components/QuoteCard";
import Pagination from "@/components/Pagination";
import { EmptyState, ErrorState, LoadingState } from "@/components/StateBanners";
import { useDebounce } from "@/hooks/useDebounce";

const PAGE_SIZE = 12;

export default function QuotesPage() {
  return (
    <Suspense fallback={<LoadingState label="Iqtiboslar yuklanmoqda..." />}>
      <QuotesPageContent />
    </Suspense>
  );
}

function QuotesPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchInput, setSearchInput] = useState(searchParams.get("search") || "");
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const debouncedSearch = useDebounce(searchInput, 600);
  const search = searchParams.get("search") || "";
  const page = Number(searchParams.get("page") || 1);

  const updateParams = useCallback(
    (updates: Record<string, string | number | null>) => {
      const next = new URLSearchParams(searchParams.toString());
      Object.entries(updates).forEach(([key, value]) => {
        if (value === null || value === "") next.delete(key);
        else next.set(key, String(value));
      });
      if (!("page" in updates) && updates.page !== null) {
        next.delete("page");
      }
      router.push(`/quotes?${next.toString()}`);
    },
    [router, searchParams]
  );

  useEffect(() => {
    if (debouncedSearch !== search) {
      updateParams({ search: debouncedSearch || null });
    }
  }, [debouncedSearch, search, updateParams]);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const res = await getQuotes({ search: search || undefined, page });
        if (!cancelled) {
          setQuotes(res.results);
          setCount(res.count);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof ApiError ? err.message : "Iqtiboslarni yuklab bo'lmadi.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, [search, page]);

  return (
    <div className="container-lolazor py-10 pb-24 sm:py-16">
      
      {/* Sarlavha Kulgilektual uslubida markazda */}
      <header className="mb-14 flex flex-col items-center justify-center text-center">
        <span className="mb-4 text-[11px] font-bold uppercase tracking-widest text-lolazor-sky">
          LOLAZOR ARXIVI
        </span>
        <h1 className="text-5xl font-extrabold tracking-tight text-text-main sm:text-6xl md:text-7xl">
          Iqtiboslar <span className="text-lolazor-sky">bazasi</span>
        </h1>
      </header>

      {/* Kulgilektual Toolbar */}
      <div className="mb-10 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div className="relative w-full md:w-[380px]">
          <Search size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-text-muted" />
          <input
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            type="search"
            placeholder="Iqtibos yoki ism qidiring..."
            className="w-full rounded-full border border-border/50 bg-card/40 py-3 pl-12 pr-4 text-sm text-text-main placeholder:text-text-muted outline-none transition focus:border-lolazor-sky focus:bg-card hover:bg-card/60"
          />
        </div>

        <div className="hidden text-sm font-medium text-text-muted lg:block">
          {count} ta iqtibos
        </div>
      </div>

      {loading && <LoadingState label="Iqtiboslar yuklanmoqda..." />}
      {!loading && error && <ErrorState message={error} />}
      {!loading && !error && quotes.length === 0 && <EmptyState />}

      {!loading && !error && quotes.length > 0 && (
        <>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8">
            {quotes.map((quote) => (
              <QuoteCard key={quote.id} quote={quote} />
            ))}
          </div>
          <div className="mt-12 sm:mt-16">
            <Pagination page={page} totalCount={count} pageSize={PAGE_SIZE} onPageChange={(p) => updateParams({ page: p })} />
          </div>
        </>
      )}
    </div>
  );
}