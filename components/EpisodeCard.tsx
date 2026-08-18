import Image from "next/image";
import { Play, Sparkles, Eye } from "lucide-react";
import type { EpisodeList } from "@/types/api";

function formatViews(viewsString: string | undefined): string {
  if (!viewsString || viewsString === "0") return "";
  const views = parseInt(viewsString, 10);
  if (isNaN(views)) return "";
  if (views >= 1000000) return (views / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
  if (views >= 1000) return (views / 1000).toFixed(1).replace(/\.0$/, "") + "K";
  return views.toString();
}

interface EpisodeCardProps {
  episode: EpisodeList;
  onPlay: (youtubeId: string) => void;
}

export default function EpisodeCard({ episode, onPlay }: EpisodeCardProps) {
  const thumbnailUrl = `https://img.youtube.com/vi/${episode.youtube_id}/maxresdefault.jpg`;

  return (
    <button
      onClick={() => onPlay(episode.youtube_id)}
      className={`group/episode relative flex flex-col overflow-hidden rounded-3xl border border-border bg-card text-left transition-all duration-300 hover:-translate-y-1 ${
        episode.is_super_episode
          ? "hover:border-amber-500/50 hover:shadow-[0_10px_30px_-10px_rgba(245,158,11,0.2)]"
          : "hover:border-lolazor-sky/50 hover:shadow-[0_10px_30px_-10px_rgba(56,189,248,0.2)]"
      }`}
    >
      <div className="relative aspect-video w-full overflow-hidden bg-background">
        <Image
          src={thumbnailUrl}
          alt={episode.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition duration-300 group-hover/episode:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-80" />
        
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition group-hover/episode:opacity-100">
          <span 
            className={`flex h-14 w-14 items-center justify-center rounded-full text-background ${
              episode.is_super_episode
                ? "bg-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.6)]"
                : "bg-lolazor-sky shadow-[0_0_20px_rgba(56,189,248,0.6)]"
            }`}
          >
            <Play size={24} className="ml-1 fill-current" />
          </span>
        </div>

        <div className="absolute left-3 top-3 flex gap-2">
          {episode.is_super_episode && (
            <span className="inline-flex items-center gap-1.5 rounded-xl bg-amber-500/95 px-2.5 py-1 text-[11px] font-black uppercase tracking-widest text-black shadow-md backdrop-blur-sm">
              <Sparkles size={12} /> Maxsus
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-between p-5">
        <h3 
          className={`line-clamp-2 text-lg font-bold leading-snug text-text-main transition ${
            episode.is_super_episode 
              ? "group-hover/episode:text-amber-500" 
              : "group-hover/episode:text-lolazor-sky"
          }`}
        >
          {episode.title}
        </h3>
        
        <div className="mt-4 flex items-center justify-between border-t border-border/50 pt-3 text-xs font-medium text-text-muted">
          <div className="flex items-center gap-3">
            <span>{episode.release_date}</span>
            {(episode as any).views_count && formatViews((episode as any).views_count) && (
              <span className="flex items-center gap-1">
                <Eye size={12} />
                {formatViews((episode as any).views_count)}
              </span>
            )}
          </div>
          
          <span 
            className={`flex items-center gap-1 font-semibold ${
              episode.is_super_episode ? "text-amber-500" : "text-lolazor-sky"
            }`}
          >
            Ko&apos;rish <Play size={10} className="fill-current" />
          </span>
        </div>
      </div>
    </button>
  );
}