"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Calendar, Clock, Crown, PlayCircle } from "lucide-react";
import { getEpisode, ApiError } from "@/lib/api";
import type { EpisodeDetail, PersonMinimal } from "@/types/api";
import QuoteCard from "@/components/QuoteCard";
import ResourceBadge from "@/components/ResourceBadge";
import { ErrorState, LoadingState } from "@/components/StateBanners";
import {
  formatDate,
  formatDuration,
  initials,
  timestampToSeconds,
  youtubeEmbedUrl,
} from "@/lib/utils";

export default function EpisodeDetailPage() {
  const params = useParams<{ id: string }>();
  const [episode, setEpisode] = useState<EpisodeDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [startSeconds, setStartSeconds] = useState<number | undefined>(undefined);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const data = await getEpisode(params.id);
        if (!cancelled) setEpisode(data);
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof ApiError ? err.message : "Epizod topilmadi."
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [params.id]);

  if (loading) return <LoadingState label="Epizod yuklanmoqda..." />;

  if (error || !episode) {
    return (
      <div className="container-lolazor py-16">
        <ErrorState message={error || "Epizod topilmadi."} />
      </div>
    );
  }

  const hosts = episode.hosts || [];
  const guests = episode.guests || [];
  const quotes = episode.quotes || [];
  const resources = episode.resources || [];
  const topics = episode.topics || [];
  const allPeople: PersonMinimal[] = [...hosts, ...guests];

  function jumpTo(timestamp: string) {
    setStartSeconds(timestampToSeconds(timestamp));
    document
      .getElementById("player")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="container-lolazor py-10">
      {/* Player */}
      <div
        id="player"
        className="relative aspect-video w-full overflow-hidden rounded-2xl border border-border bg-black shadow-card"
      >
        <iframe
          key={startSeconds}
          src={youtubeEmbedUrl(episode.youtube_id, startSeconds)}
          title={episode.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      </div>

      {/* Meta header */}
      <div className="mt-6 flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-2">
          {episode.is_super_episode && (
            <span className="inline-flex items-center gap-1 rounded-full bg-gold/95 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-background">
              <Crown size={12} strokeWidth={2.5} />
              Super epizod
            </span>
          )}
          {topics.map((topic) => (
            <Link
              key={topic.id}
              href={`/episodes?topics__slug=${topic.slug}`}
              className="rounded-full bg-lolazor-sky/10 px-2.5 py-1 text-[11px] font-semibold text-lolazor-sky transition hover:bg-lolazor-sky/20"
            >
              {topic.name}
            </Link>
          ))}
        </div>

        <h1 className="text-2xl font-bold leading-snug text-text-main sm:text-3xl">
          {episode.title}
        </h1>

        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-text-muted">
          <span className="flex items-center gap-1.5">
            <Calendar size={15} />
            {formatDate(episode.release_date)}
          </span>
          {episode.duration && (
            <span className="flex items-center gap-1.5">
              <Clock size={15} />
              {formatDuration(episode.duration)}
            </span>
          )}
          <a
            href={episode.youtube_url}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 text-lolazor-sky hover:underline"
          >
            <PlayCircle size={15} />
            YouTube&apos;da ochish
          </a>
        </div>

        {episode.description && (
          <p className="max-w-3xl whitespace-pre-line text-[15px] leading-relaxed text-text-muted">
            {episode.description}
          </p>
        )}
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-[2fr_1fr]">
        <div className="flex flex-col gap-10">
          {/* Timestamps */}
          {quotes.length > 0 && (
            <section>
              <h2 className="mb-4 text-lg font-bold text-text-main">
                Vaqt belgilari
              </h2>
              <ul className="card-surface divide-y divide-border overflow-hidden">
                {quotes.map((quote) => (
                  <li key={quote.id}>
                    <button
                      type="button"
                      onClick={() => jumpTo(quote.timestamp)}
                      className="flex w-full items-center gap-4 px-4 py-3.5 text-left transition hover:bg-background/60"
                    >
                      <span className="shrink-0 rounded-lg bg-lolazor-sky/10 px-2.5 py-1 font-mono text-xs font-semibold text-lolazor-sky">
                        {quote.timestamp}
                      </span>
                      <span className="line-clamp-1 flex-1 text-sm text-text-main">
                        {quote.text}
                      </span>
                      <span className="shrink-0 text-xs text-text-muted">
                        {quote.person.full_name}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Quotes */}
          {quotes.length > 0 && (
            <section>
              <h2 className="mb-4 text-lg font-bold text-text-main">
                Iqtiboslar
              </h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {quotes.map((quote) => (
                  <QuoteCard key={quote.id} quote={quote} />
                ))}
              </div>
            </section>
          )}

          {/* Resources */}
          {resources.length > 0 && (
            <section>
              <h2 className="mb-4 text-lg font-bold text-text-main">
                Tilga olingan manbalar va kitoblar
              </h2>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {resources.map((resource) => (
                  <ResourceBadge key={resource.id} resource={resource} />
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Sidebar: hosts & guests */}
        <aside className="flex flex-col gap-6">
          {hosts.length > 0 && (
            <PeopleGroup title="Mezbonlar" people={hosts} />
          )}
          {guests.length > 0 && (
            <PeopleGroup title="Mehmonlar" people={guests} />
          )}
          {allPeople.length === 0 && (
            <p className="text-sm text-text-muted">
              Bu epizod uchun ishtirokchilar ko&apos;rsatilmagan.
            </p>
          )}
        </aside>
      </div>
    </div>
  );
}

function PeopleGroup({
  title,
  people,
}: {
  title: string;
  people: PersonMinimal[];
}) {
  return (
    <div>
      <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-text-muted">
        {title}
      </h3>
      <div className="flex flex-col gap-2">
        {people.map((person) => (
          <Link
            key={person.id}
            href={`/people/${person.id}`}
            className="card-surface flex items-center gap-3 p-3 transition hover:border-lolazor-sky/40"
          >
            <span className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-lolazor text-sm font-bold text-text-main ring-1 ring-border">
              {person.avatar ? (
                <Image
                  src={person.avatar}
                  alt={person.full_name}
                  fill
                  sizes="44px"
                  className="object-cover"
                />
              ) : (
                initials(person.full_name)
              )}
            </span>
            <span className="text-sm font-semibold text-text-main">
              {person.full_name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}