"use client";

import { Suspense, useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, ChevronDown, X } from "lucide-react";
import { getEpisodes, ApiError } from "@/lib/api";
import type { EpisodeList } from "@/types/api";
import EpisodeCard from "@/components/EpisodeCard";
import Pagination from "@/components/Pagination";
import { EmptyState, ErrorState, LoadingState } from "@/components/StateBanners";
import { useDebounce } from "@/hooks/useDebounce";
import VideoModal from "@/components/VideoModal";

const PAGE_SIZE = 18;

const ORDERING_OPTIONS = [
  { value: "-release_date", label: "Yangi ➔ eski" },
  { value: "release_date", label: "Eski ➔ yangi" },
];

export default function EpisodesArchivePage() {
  return (
    <Suspense fallback={<LoadingState label="Epizodlar yuklanmoqda..." />}>
      <EpisodesArchiveContent />
    </Suspense>
  );
}

function EpisodesArchiveContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchInput, setSearchInput] = useState(searchParams.get("search") || "");
  const [episodes, setEpisodes] = useState<EpisodeList[]>([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);

  const debouncedSearch = useDebounce(searchInput, 600);
  const search = searchParams.get("search") || "";
  
  // URL parametrlari
  const isSuperEpisode = searchParams.get("is_super_episode") || "";
  const ordering = searchParams.get("ordering") || "-release_date";
  const topicSlug = searchParams.get("topics__slug") || "";
  const page = Number(searchParams.get("page") || 1);

  const updateParams = useCallback(
    (updates: Record<string, string | number | null>) => {
      const next = new URLSearchParams(searchParams.toString());
      Object.entries(updates).forEach(([key, value]) => {
        if (value === null || value === "") next.delete(key);
        else next.set(key, String(value));
      });
      if (!("page" in updates)) {
        next.delete("page");
      }
      router.push(`/episodes?${next.toString()}`);
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
        const res = await getEpisodes({
          page,
          search: search || undefined,
          is_super_episode: isSuperEpisode === "true" ? "true" : undefined,
          topics__slug: topicSlug || undefined,
          ordering,
        });
        if (cancelled) return;
        setEpisodes(res.results);
        setCount(res.count);
      } catch (err) {
        if (cancelled) return;
        setError(err instanceof ApiError ? err.message : "Xatolik yuz berdi.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, [page, search, isSuperEpisode, topicSlug, ordering]);

  return (
    <div className="container-lolazor py-10 pb-24 sm:py-16">
      <VideoModal youtubeId={activeVideoId} onClose={() => setActiveVideoId(null)} />

      {/* Sarlavha */}
      <header className="mb-14 flex flex-col items-center justify-center text-center">
        <span className="mb-4 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-lolazor-sky">
          LOLAZOR ARXIVI
        </span>
        <h1 className="text-5xl font-extrabold tracking-tight text-text-main sm:text-6xl md:text-7xl">
          Barcha <span className="text-lolazor-sky">epizodlar</span>
        </h1>
      </header>

      {/* Filter va Qidiruv Toolbari */}
      <div className="mb-10 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div className="flex w-full flex-col gap-3 md:w-auto md:flex-row md:items-center">
          
          {/* Qidiruv */}
          <div className="relative w-full md:w-[340px]">
            <Search size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-text-muted" />
            <input
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              type="search"
              placeholder="Epizod qidirish..."
              className="w-full rounded-full border border-border/50 bg-card/40 py-3 pl-12 pr-4 text-sm text-text-main placeholder:text-text-muted outline-none transition focus:border-lolazor-sky focus:bg-card hover:bg-card/60"
            />
          </div>

          {/* Saralash Dropdown */}
          <div className="relative w-full md:w-auto">
            <select
              value={ordering}
              onChange={(e) => updateParams({ ordering: e.target.value })}
              className="w-full cursor-pointer appearance-none rounded-full border border-border/50 bg-card/40 py-3 pl-5 pr-10 text-sm font-medium text-text-main outline-none transition focus:border-lolazor-sky focus:bg-card hover:bg-card/60"
            >
              {ORDERING_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            <ChevronDown size={14} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-text-muted" />
          </div>

          {/* Maxsus Epizod Dropdown */}
          <div className="relative w-full md:w-auto">
            <select
              value={isSuperEpisode}
              onChange={(e) => updateParams({ is_super_episode: e.target.value || null })}
              className="w-full cursor-pointer appearance-none rounded-full border border-border/50 bg-card/40 py-3 pl-5 pr-10 text-sm font-medium text-text-main outline-none transition focus:border-lolazor-sky focus:bg-card hover:bg-card/60"
            >
              <option value="">Barcha epizodlar</option>
              <option value="true">Maxsus epizodlar</option>
            </select>
            <ChevronDown size={14} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-text-muted" />
          </div>

          {/* Aktiv Mavzu (Topic) Filteri badge'i */}
          {topicSlug && (
            <button
              onClick={() => updateParams({ topics__slug: null })}
              className="inline-flex items-center gap-1.5 rounded-full border border-lolazor-sky/40 bg-lolazor-sky/10 px-4 py-2.5 text-xs font-semibold text-lolazor-sky transition hover:bg-lolazor-sky/20"
            >
              Mavzu: {topicSlug}
              <X size={14} />
            </button>
          )}

        </div>

        {/* Jami Son */}
        <div className="hidden text-sm font-medium text-text-muted lg:block">
          {count} epizod
        </div>
      </div>

      {loading && <LoadingState label="Epizodlar yuklanmoqda..." />}
      {!loading && error && <ErrorState message={error} onRetry={() => updateParams({ page })} />}
      {!loading && !error && episodes.length === 0 && <EmptyState />}

      {!loading && !error && episodes.length > 0 && (
        <>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8">
            {episodes.map((ep) => (
              <EpisodeCard key={ep.id} episode={ep} onPlay={(id) => setActiveVideoId(id)} />
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