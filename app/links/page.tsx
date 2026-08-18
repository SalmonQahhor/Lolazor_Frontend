"use client";

import { useState } from "react";
import { 
  Youtube,
  Instagram, 
  Send, 
  Headphones, 
  Podcast, 
  Music, 
  MessageSquare, 
  Share2, 
  Check, 
  Link2
} from "lucide-react";
import Link from "next/link";

// ----------------------------------------------------------------------
// Havolalar bazasi
// ----------------------------------------------------------------------
const SOCIAL_LINKS = [
  {
    id: "youtube",
    title: "Barcha epizodlar (YouTube)",
    handle: "@Lolazorpodcast",
    url: "https://www.youtube.com/@Lolazorpodcast",
    icon: Youtube,
    color: "text-red-500",
    bg: "bg-red-500/10",
    border: "border-red-500/20"
  },
  {
    id: "telegram",
    title: "Rasmiy Telegram kanal",
    handle: "@lolazorpodcast",
    url: "https://t.me/lolazorpodcast",
    icon: Send,
    color: "text-blue-400",
    bg: "bg-blue-400/10",
    border: "border-blue-400/20"
  },
  {
    id: "instagram",
    title: "Lavhalar va yangiliklar",
    handle: "@lolazor.podcast",
    url: "https://instagram.com/lolazor.podcast",
    icon: Instagram,
    color: "text-pink-500",
    bg: "bg-pink-500/10",
    border: "border-pink-500/20"
  }
];

const AUDIO_LINKS = [
  {
    id: "spotify",
    title: "Spotify",
    handle: "Lolazor Podcast",
    url: "https://open.spotify.com/show/5DtsdEgKmKTETrQ0eruvVF",
    icon: Headphones,
    color: "text-green-500",
    bg: "bg-green-500/10",
    border: "border-green-500/20"
  },
  {
    id: "apple",
    title: "Apple Podcasts",
    handle: "Lolazor Podcast",
    url: "https://podcasts.apple.com/us/podcast/lolazor-podcast/id1719432488",
    icon: Podcast,
    color: "text-purple-500",
    bg: "bg-purple-500/10",
    border: "border-purple-500/20"
  },
  {
    id: "yandex",
    title: "Yandex Music",
    handle: "Lolazor Podcast",
    url: "https://music.yandex.com/album/28403554",
    icon: Music,
    color: "text-yellow-500",
    bg: "bg-yellow-500/10",
    border: "border-yellow-500/20"
  }
];

// ----------------------------------------------------------------------
// Nusxa olish tugmasi komponenti (Micro-interaction)
// ----------------------------------------------------------------------
function CopyButton({ url }: { url: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault(); // Sahifaga o'tib ketmasligi uchun
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-all active:scale-90 ${
        copied 
          ? "border-green-500/50 bg-green-500/10 text-green-500" 
          : "border-border/80 bg-background text-text-muted hover:border-lolazor-sky hover:text-lolazor-sky"
      }`}
      title="Havoladan nusxa olish"
    >
      {copied ? <Check size={16} /> : <Share2 size={16} />}
    </button>
  );
}

// ----------------------------------------------------------------------
// Asosiy Sahifa
// ----------------------------------------------------------------------
export default function LinksPage() {
  return (
    <div className="container-lolazor py-12 pb-24 sm:py-20">
      <div className="mx-auto max-w-2xl">
        
        {/* Sarlavha qismi */}
        <div className="mb-12 text-center">
          <span className="eyebrow flex items-center justify-center gap-2">
            <Link2 size={14} className="text-lolazor-sky" />
            LOLAZOR PODKAST
          </span>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-text-main sm:text-5xl">
            Barcha <span className="text-amber-500">havolalar</span>
          </h1>
          <p className="mt-4 text-sm text-text-muted sm:text-base">
            Lolazor podkastining barcha rasmiy sahifalari va audio platformalari qulay formatda.
          </p>
        </div>

        {/* 1. Ijtimoiy Tarmoqlar */}
        <div className="mb-8">
          <h2 className="mb-4 text-[11px] font-bold uppercase tracking-widest text-text-muted">
            Ijtimoiy Tarmoqlar
          </h2>
          <div className="flex flex-col gap-3">
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between overflow-hidden rounded-2xl border border-border/60 bg-card p-3 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-lolazor-sky/40 hover:shadow-md sm:p-4"
              >
                <div className="flex items-center gap-4">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl border ${link.bg} ${link.color} ${link.border}`}>
                    <link.icon size={22} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-base font-bold text-text-main transition group-hover:text-lolazor-sky">
                      {link.title}
                    </span>
                    <span className="text-xs font-medium text-text-muted">
                      {link.handle}
                    </span>
                  </div>
                </div>
                <CopyButton url={link.url} />
              </a>
            ))}
          </div>
        </div>

        {/* 2. Audio Platformalar (Podkastlar) */}
        <div className="mb-10">
          <h2 className="mb-4 text-[11px] font-bold uppercase tracking-widest text-text-muted">
            Audio Platformalar (Eshitish uchun)
          </h2>
          <div className="flex flex-col gap-3">
            {AUDIO_LINKS.map((link) => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between overflow-hidden rounded-2xl border border-border/60 bg-card p-3 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-lolazor-sky/40 hover:shadow-md sm:p-4"
              >
                <div className="flex items-center gap-4">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl border ${link.bg} ${link.color} ${link.border}`}>
                    <link.icon size={22} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-base font-bold text-text-main transition group-hover:text-lolazor-sky">
                      {link.title}
                    </span>
                    <span className="text-xs font-medium text-text-muted">
                      {link.handle}
                    </span>
                  </div>
                </div>
                <CopyButton url={link.url} />
              </a>
            ))}
          </div>
        </div>

        {/* 3. Sayt va Fikr-mulohaza */}
        <div>
          <h2 className="mb-4 text-[11px] font-bold uppercase tracking-widest text-text-muted">
            Platforma
          </h2>
          <Link
            href="/feedback"
            className="group flex items-center justify-between overflow-hidden rounded-2xl border border-lolazor-sky/20 bg-gradient-to-r from-lolazor-sky/10 to-transparent p-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-lolazor-sky/50 hover:shadow-md"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-lolazor-sky text-white shadow-[0_0_15px_rgba(56,189,248,0.4)]">
                <MessageSquare size={20} />
              </div>
              <div className="flex flex-col">
                <span className="text-base font-bold text-text-main transition group-hover:text-lolazor-sky">
                  Fikr va takliflar
                </span>
                <span className="text-xs font-medium text-text-muted">
                  Savol, taklif yoki xatolik bo&apos;lsa yozib qoldiring
                </span>
              </div>
            </div>
            
            <div className="flex h-9 items-center justify-center rounded-xl bg-background px-4 text-xs font-bold text-text-main border border-border/80 transition group-hover:border-lolazor-sky group-hover:text-lolazor-sky">
              Yozish
            </div>
          </Link>
        </div>

      </div>
    </div>
  );
}