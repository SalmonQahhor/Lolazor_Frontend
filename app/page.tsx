"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowRight, ChevronLeft, ChevronRight, Search, Radio } from "lucide-react";
import { getEpisodes, getQuotes, getPeople, ApiError } from "@/lib/api";
import type { EpisodeList, Quote } from "@/types/api";
import EpisodeCard from "@/components/EpisodeCard";
import QuoteCard from "@/components/QuoteCard";
import { ErrorState, LoadingState } from "@/components/StateBanners";
import VideoModal from "@/components/VideoModal";

export default function HomePage() {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");

  const [superEpisodes, setSuperEpisodes] = useState<EpisodeList[]>([]);
  const [latestEpisodes, setLatestEpisodes] = useState<EpisodeList[]>([]);
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);
  
  const [stats, setStats] = useState({ episodes: 0, quotes: 0, people: 0 });
  const [initialLoading, setInitialLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadInitial() {
      setInitialLoading(true);
      setError(null);
      try {
        const [superRes, latestRes, quotesRes, peopleRes] = await Promise.all([
          getEpisodes({ is_super_episode: "true", ordering: "-release_date" }),
          getEpisodes({ ordering: "-release_date" }),
          getQuotes(),
          getPeople(),
        ]);

        if (cancelled) return;
        
        setSuperEpisodes(superRes.results.slice(0, 8));
        setLatestEpisodes(latestRes.results.slice(0, 6));
        setQuotes(quotesRes.results.slice(0, 6));
        
        setStats({
          episodes: latestRes.count || 0,
          quotes: quotesRes.count || 0,
          people: peopleRes.count || 0,
        });

      } catch (err) {
        if (cancelled) return;
        setError(
          err instanceof ApiError ? err.message : "Ma'lumotlarni yuklab bo'lmadi."
        );
      } finally {
        if (!cancelled) setInitialLoading(false);
      }
    }

    loadInitial();
    return () => {
      cancelled = true;
    };
  }, []);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = searchValue.trim();
    router.push(
      trimmed ? `/episodes?search=${encodeURIComponent(trimmed)}` : "/episodes"
    );
  }

  return (
    <div className="pb-24">
      {/* Video Pleyer */}
      <VideoModal youtubeId={activeVideoId} onClose={() => setActiveVideoId(null)} />

      {/* Hero Section */}
      <section className="border-b border-border/60 bg-gradient-to-b from-lolazor/10 via-background to-background py-12 sm:py-20">
        <div className="container-lolazor grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          
          <div className="animate-fade-up text-center sm:text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-lolazor-sky/30 bg-lolazor-sky/10 px-3.5 py-1.5 text-xs font-bold text-lolazor-sky">
              <Radio size={14} className="animate-pulse" />
              Lolazor Podkast Platformasi
            </div>

            <h1 className="mt-5 text-4xl font-extrabold leading-[1.1] tracking-tight text-text-main sm:text-5xl lg:text-6xl">
              Atrofdagi voqeliklarga{" "}
              <span className="text-lolazor-sky">turli rakursdan</span> nazar.
            </h1>

            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-text-muted sm:mx-0 sm:text-lg">
              Siyosat, iqtisodiyot va jamiyat haqida chuqur suhbatlar.
              Har bir epizodda — yangi mehmon, yangi qarash, yangi savol.
            </p>

            <form
              onSubmit={handleSearch}
              className="mx-auto mt-8 flex w-full max-w-md flex-col gap-3 sm:mx-0 sm:flex-row sm:items-center"
            >
              <div className="relative flex-1">
                <Search size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
                <input
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  type="search"
                  placeholder="Epizodni qidiring..."
                  className="w-full rounded-2xl border border-border bg-card py-3.5 pl-12 pr-4 text-sm text-text-main placeholder:text-text-muted/60 outline-none transition focus:border-lolazor-sky"
                />
              </div>
              <button
                type="submit"
                className="shrink-0 rounded-2xl bg-lolazor-sky px-6 py-3.5 text-sm font-bold text-background transition hover:bg-lolazor-sky/90"
              >
                Qidirish
              </button>
            </form>
          </div>

          <div className="relative mx-auto w-full max-w-lg lg:mx-0 lg:max-w-none">
            <div className="absolute -inset-1 -z-10 rounded-[2.5rem] bg-gradient-to-tr from-lolazor-sky/20 to-amber-500/20 opacity-60 blur-2xl filter dark:opacity-30" />
            <div className="relative overflow-hidden rounded-[2rem] border border-border/80 bg-card shadow-2xl">
              <div className="relative aspect-[16/10] w-full bg-[#f8f9fa] dark:bg-white/5">
                <Image src="/lolazor-team.png" alt="Lolazor Jamoasi" fill className="object-cover" priority />
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-card to-transparent" />
              </div>
              <div className="relative z-10 -mt-6 grid grid-cols-3 gap-3 px-5 pb-6 sm:px-8 sm:pb-8">
                <div className="flex flex-col items-center justify-center rounded-2xl border border-border/50 bg-background/80 p-4 shadow-sm backdrop-blur-md transition-colors hover:border-lolazor-sky/50">
                  <span className="text-2xl font-black text-lolazor-sky sm:text-3xl">{stats.episodes}</span>
                  <span className="mt-1 text-[10px] font-bold uppercase tracking-widest text-text-muted">Epizod</span>
                </div>
                <div className="flex flex-col items-center justify-center rounded-2xl border border-border/50 bg-background/80 p-4 shadow-sm backdrop-blur-md transition-colors hover:border-amber-500/50">
                  <span className="text-2xl font-black text-amber-500 sm:text-3xl">{stats.quotes}</span>
                  <span className="mt-1 text-[10px] font-bold uppercase tracking-widest text-text-muted">Iqtibos</span>
                </div>
                <div className="flex flex-col items-center justify-center rounded-2xl border border-border/50 bg-background/80 p-4 shadow-sm backdrop-blur-md transition-colors hover:border-emerald-500/50">
                  <span className="text-2xl font-black text-emerald-500 sm:text-3xl">{stats.people}</span>
                  <span className="mt-1 text-[10px] font-bold uppercase tracking-widest text-text-muted">Mehmon</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {initialLoading && <LoadingState />}
      {!initialLoading && error && (
        <div className="container-lolazor py-12">
          <ErrorState message={error} />
        </div>
      )}

      {!initialLoading && !error && (
        <>
          {superEpisodes.length > 0 && (
            <section className="container-lolazor mt-8 py-12">
              <SectionHeader eyebrow="Tavsiya etamiz" title="Maxsus epizodlar" href="/episodes?is_super_episode=true" />
              <SuperEpisodesRail episodes={superEpisodes} onPlay={(id) => setActiveVideoId(id)} />
            </section>
          )}

          <section className="container-lolazor py-12">
            <SectionHeader eyebrow="Yangiliklar" title="So'nggi epizodlar" href="/episodes" />
            {latestEpisodes.length === 0 ? (
              <div className="py-12 text-center text-sm font-medium text-text-muted">Epizod topilmadi.</div>
            ) : (
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {latestEpisodes.map((ep) => (
                  <EpisodeCard key={ep.id} episode={ep} onPlay={(id) => setActiveVideoId(id)} />
                ))}
              </div>
            )}
          </section>

          {quotes.length > 0 && (
            <section className="container-lolazor py-12">
              <SectionHeader eyebrow="Esda qolarli gaplar" title="So'nggi iqtiboslar" href="/quotes" />
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {quotes.map((q) => (
                  <QuoteCard key={q.id} quote={q} />
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </div>
  );
}

function SectionHeader({ eyebrow, title, href }: { eyebrow: string; title: string; href: string }) {
  return (
    <div className="mb-8 flex items-end justify-between gap-4 border-b border-border/60 pb-4">
      <div>
        <span className="text-xs font-bold uppercase tracking-widest text-lolazor-sky">{eyebrow}</span>
        <h2 className="mt-1.5 text-3xl font-extrabold text-text-main sm:text-4xl">{title}</h2>
      </div>
      <Link
        href={href}
        className="hidden shrink-0 items-center gap-1.5 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-semibold text-text-main transition hover:border-lolazor-sky hover:text-lolazor-sky sm:flex"
      >
        Barchasi <ArrowRight size={16} />
      </Link>
    </div>
  );
}

function SuperEpisodesRail({ episodes, onPlay }: { episodes: EpisodeList[], onPlay: (id: string) => void }) {
  const scrollBy = (dir: 1 | -1) => {
    const el = document.getElementById("super-rail");
    el?.scrollBy({ left: dir * 360, behavior: "smooth" });
  };

  return (
    <div className="relative group">
      <div id="super-rail" className="snap-rail flex gap-8 overflow-x-auto pb-6 pt-2" style={{ scrollbarWidth: "none" }}>
        {episodes.map((ep) => (
          <div key={ep.id} className="snap-item w-[300px] shrink-0 sm:w-[380px]">
            <EpisodeCard episode={ep} onPlay={onPlay} />
          </div>
        ))}
      </div>
      {episodes.length > 2 && (
        <>
          <button
            type="button"
            onClick={() => scrollBy(-1)}
            className="absolute -left-5 top-1/2 hidden -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background p-3 text-text-muted shadow-xl transition hover:border-lolazor-sky hover:text-lolazor-sky group-hover:flex"
            aria-label="Chapga"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            type="button"
            onClick={() => scrollBy(1)}
            className="absolute -right-5 top-1/2 hidden -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background p-3 text-text-muted shadow-xl transition hover:border-lolazor-sky hover:text-lolazor-sky group-hover:flex"
            aria-label="O'ngga"
          >
            <ChevronRight size={20} />
          </button>
        </>
      )}
    </div>
  );
}