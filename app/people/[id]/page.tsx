"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { ArrowLeft, Instagram, Facebook, Youtube, Send } from "lucide-react";
import { getPersonDetail } from "@/lib/api";
import type { PersonDetail, EpisodeList } from "@/types/api";
import EpisodeCard from "@/components/EpisodeCard";
import VideoModal from "@/components/VideoModal";
import { EmptyState, ErrorState, LoadingState } from "@/components/StateBanners";
import { initials } from "@/lib/utils";

export default function PersonDetailPage() {
  const params = useParams();
  const personId = params?.id as string;

  const [person, setPerson] = useState<PersonDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);

  useEffect(() => {
    if (!personId) return;

    let cancelled = false;

    async function fetchPerson() {
      setLoading(true);
      setError(null);
      try {
        const data = await getPersonDetail(personId);
        if (!cancelled && data) setPerson(data);
      } catch (err: any) {
        if (!cancelled) {
          setError(err.message || "Mehmon topilmadi.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchPerson();
    return () => {
      cancelled = true;
    };
  }, [personId]);

  if (!personId) return <ErrorState message="Noto'g'ri havola." />;
  if (loading) return <LoadingState label="Mehmon yuklanmoqda..." />;
  if (error) return <ErrorState message={error} />;
  if (!person) return <EmptyState />;

  const episodes: EpisodeList[] = [
    ...(person.guest_episodes || []),
    ...(person.hosted_episodes || []),
  ];

  return (
    <div className="container-lolazor py-10 pb-24 sm:py-16">
      <VideoModal youtubeId={activeVideoId} onClose={() => setActiveVideoId(null)} />

      {/* Orqaga qaytish */}
      <button
        onClick={() => window.history.back()}
        className="group mb-8 flex items-center gap-2 text-sm font-semibold text-text-muted transition-colors hover:text-lolazor-sky"
      >
        <div className="flex h-9 w-9 items-center justify-center rounded-full border border-border/60 bg-card/40 transition-colors group-hover:border-lolazor-sky/50 group-hover:bg-lolazor-sky/10">
          <ArrowLeft size={18} />
        </div>
        Orqaga qaytish
      </button>

      {/* Profile Card */}
      <div className="mb-16 flex flex-col items-center gap-8 rounded-3xl border border-border/80 bg-card/40 p-6 shadow-xl backdrop-blur-md md:flex-row md:items-start md:p-10 lg:gap-12">
        
        {/* Chap tomon: 3:4 Rasm */}
        <div className="relative aspect-[3/4] w-full max-w-[280px] shrink-0 overflow-hidden rounded-2xl border border-border/80 bg-background shadow-2xl sm:max-w-[300px]">
          {person.avatar ? (
            <Image
              src={person.avatar}
              alt={person.full_name}
              fill
              className="object-cover transition-transform duration-500 hover:scale-105"
              sizes="(max-width: 768px) 280px, 300px"
              priority
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-lolazor-sky/10 text-5xl font-black text-lolazor-sky/40">
              {initials(person.full_name)}
            </div>
          )}
        </div>

        {/* O'ng tomon: Ma'lumotlar, Izoh va Ijtimoiy Havolalar */}
        <div className="flex flex-1 flex-col items-center text-center md:items-start md:text-left">
          
          <div className="mb-2">
            <span className="inline-block rounded-full border border-lolazor-sky/30 bg-lolazor-sky/10 px-3.5 py-1 text-[11px] font-bold uppercase tracking-widest text-lolazor-sky">
              {person.role === "host" ? "Boshlovchi" : "Mehmon"}
            </span>
          </div>
          
          <h1 className="text-3xl font-extrabold tracking-tight text-text-main sm:text-4xl lg:text-5xl">
            {person.full_name}
          </h1>

          {person.bio && (
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-text-muted whitespace-pre-line break-words sm:text-lg">
              {person.bio}
            </p>
          )}

          {/* Ijtimoiy Tarmoqlar */}
          {(person.telegram || person.instagram || person.facebook || person.youtube) && (
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5 md:justify-start">
              {person.telegram && (
                <a
                  href={`https://t.me/${person.telegram.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 rounded-full border border-border/70 bg-background/90 px-6 py-3 text-base font-bold text-text-main shadow-md backdrop-blur-md transition-all hover:-translate-y-1 hover:border-[#229ED9] hover:bg-[#229ED9]/10 hover:text-[#229ED9] hover:shadow-lg"
                >
                  <Send size={20} className="text-[#229ED9]" />
                  @{person.telegram.replace('@', '')}
                </a>
              )}

              {person.instagram && (
                <a
                  href={`https://instagram.com/${person.instagram.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 rounded-full border border-border/70 bg-background/90 px-6 py-3 text-base font-bold text-text-main shadow-md backdrop-blur-md transition-all hover:-translate-y-1 hover:border-[#E1306C] hover:bg-[#E1306C]/10 hover:text-[#E1306C] hover:shadow-lg"
                >
                  <Instagram size={20} className="text-[#E1306C]" />
                  @{person.instagram.replace('@', '')}
                </a>
              )}

              {person.facebook && (
                <a
                  href={`https://facebook.com/${person.facebook.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 rounded-full border border-border/70 bg-background/90 px-6 py-3 text-base font-bold text-text-main shadow-md backdrop-blur-md transition-all hover:-translate-y-1 hover:border-[#1877F2] hover:bg-[#1877F2]/10 hover:text-[#1877F2] hover:shadow-lg"
                >
                  <Facebook size={20} className="text-[#1877F2]" />
                  @{person.facebook.replace('@', '')}
                </a>
              )}

              {person.youtube && (
                <a
                  href={`https://youtube.com/${person.youtube.startsWith('@') ? person.youtube : '@' + person.youtube}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 rounded-full border border-border/70 bg-background/90 px-6 py-3 text-base font-bold text-text-main shadow-md backdrop-blur-md transition-all hover:-translate-y-1 hover:border-[#FF0000] hover:bg-[#FF0000]/10 hover:text-[#FF0000] hover:shadow-lg"
                >
                  <Youtube size={20} className="text-[#FF0000]" />
                  {person.youtube.startsWith('@') ? person.youtube : '@' + person.youtube}
                </a>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Ishtirok etgan epizodlar */}
      {episodes.length > 0 && (
        <div>
          <div className="mb-8 flex items-center justify-between border-b border-border/60 pb-4">
            <h2 className="text-2xl font-bold tracking-tight text-text-main sm:text-3xl">
              Ishtirok etgan epizodlar
            </h2>
            <span className="rounded-full bg-card/60 px-3.5 py-1 text-xs font-bold text-text-muted border border-border/40">
              {episodes.length} ta
            </span>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8">
            {episodes.map((ep) => (
              <EpisodeCard key={ep.id} episode={ep} onPlay={(id) => setActiveVideoId(id)} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}