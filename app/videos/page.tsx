"use client";

import { Suspense, useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, Play, ChevronDown } from "lucide-react";
import Pagination from "@/components/Pagination";
import { EmptyState, ErrorState, LoadingState } from "@/components/StateBanners";
import { useDebounce } from "@/hooks/useDebounce";
import VideoModal from "@/components/VideoModal";

const PAGE_SIZE = 18;

const ORDERING_OPTIONS = [
  { value: "-release_date", label: "Yangi ➔ eski" },
  { value: "release_date", label: "Eski ➔ yangi" },
];

interface VideoItem {
  id: number;
  title: string;
  youtube_id: string;
  youtube_url: string;
  release_date: string;
  duration: string;
  views_count: string;
}

export default function VideosPage() {
  return (
    <Suspense fallback={<LoadingState label="Videolar yuklanmoqda..." />}>
      <VideosContent />
    </Suspense>
  );
}

function VideosContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchInput, setSearchInput] = useState(searchParams.get("search") || "");
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);

  const debouncedSearch = useDebounce(searchInput, 600);
  const search = searchParams.get("search") || "";
  const ordering = searchParams.get("ordering") || "-release_date";
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
      router.push(`/videos?${next.toString()}`);
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
        const params = new URLSearchParams({
          page: String(page),
          page_size: String(PAGE_SIZE),
          ordering: ordering,
        });
        if (search) params.set("search", search);

        const res = await fetch(`http://localhost:8000/api/videos/?${params.toString()}`);
        if (!res.ok) throw new Error("Videolarni yuklab bo'lmadi.");

        const data = await res.json();
        if (cancelled) return;
        setVideos(data.results);
        setCount(data.count);
      } catch (err) {
        if (cancelled) return;
        setError(err instanceof Error ? err.message : "Xatolik yuz berdi.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, [page, search, ordering]);

  return (
    <div className="container-lolazor py-10 pb-24 sm:py-16">
      
      <VideoModal youtubeId={activeVideoId} onClose={() => setActiveVideoId(null)} />

      {/* Sarlavha Kulgilektual uslubida markazda */}
      <header className="mb-14 flex flex-col items-center justify-center text-center">
        <span className="mb-4 text-[11px] font-bold uppercase tracking-widest text-lolazor-sky">
          LOLAZOR VIDEOLARI
        </span>
        <h1 className="text-5xl font-extrabold tracking-tight text-text-main sm:text-6xl md:text-7xl">
          Qisqa <span className="text-lolazor-sky">videolar</span>
        </h1>
      </header>

      {/* Kulgilektual Toolbar */}
      <div className="mb-10 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        
        <div className="flex w-full flex-col gap-3 md:w-auto md:flex-row md:items-center">
          <div className="relative w-full md:w-[340px]">
            <Search size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-text-muted" />
            <input
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              type="search"
              placeholder="Video nomini qidiring..."
              className="w-full rounded-full border border-border/50 bg-card/40 py-3 pl-12 pr-4 text-sm text-text-main placeholder:text-text-muted outline-none transition focus:border-lolazor-sky focus:bg-card hover:bg-card/60"
            />
          </div>

          <div className="relative w-full md:w-auto">
            <select
              value={ordering}
              onChange={(e) => updateParams({ ordering: e.target.value })}
              className="w-full appearance-none rounded-full border border-border/50 bg-card/40 py-3 pl-5 pr-10 text-sm font-medium text-text-main outline-none transition cursor-pointer focus:border-lolazor-sky focus:bg-card hover:bg-card/60"
            >
              {ORDERING_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            <ChevronDown size={14} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-text-muted" />
          </div>
        </div>

        <div className="hidden text-sm font-medium text-text-muted lg:block">
          {count} ta video
        </div>
      </div>

      {loading && <LoadingState label="Videolar yuklanmoqda..." />}
      {!loading && error && <ErrorState message={error} onRetry={() => updateParams({ page })} />}
      {!loading && !error && videos.length === 0 && <EmptyState />}

      {!loading && !error && videos.length > 0 && (
        <>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8">
            {videos.map((vid) => (
              <button
                key={vid.id}
                onClick={() => setActiveVideoId(vid.youtube_id)}
                className="group flex flex-col overflow-hidden rounded-3xl border border-border/80 bg-card text-left transition-all duration-300 hover:-translate-y-1 hover:border-lolazor-sky/50 hover:shadow-xl"
              >
                <div className="relative aspect-video w-full overflow-hidden bg-background">
                  <Image
                    src={`https://img.youtube.com/vi/${vid.youtube_id}/hqdefault.jpg`}
                    alt={vid.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-lolazor-sky text-white shadow-lg">
                      <Play size={20} className="ml-0.5 fill-white" />
                    </div>
                  </div>
                  {vid.duration && (
                    <span className="absolute bottom-3 right-3 rounded-lg bg-black/80 px-2 py-1 text-[11px] font-bold text-white backdrop-blur-sm">
                      {vid.duration}
                    </span>
                  )}
                </div>

                <div className="flex flex-1 flex-col justify-between p-5">
                  <h3 className="line-clamp-2 text-base font-bold text-text-main transition-colors group-hover:text-lolazor-sky">
                    {vid.title}
                  </h3>
                  <div className="mt-4 flex items-center justify-between text-xs text-text-muted">
                    <span>{vid.release_date}</span>
                    <span className="flex items-center gap-1 font-semibold text-lolazor-sky">
                      Saytda ko&apos;rish <Play size={10} className="fill-current" />
                    </span>
                  </div>
                </div>
              </button>
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