"use client";

import { useEffect } from "react";
import { X } from "lucide-react";

interface VideoModalProps {
  youtubeId: string | null;
  onClose: () => void;
}

export default function VideoModal({ youtubeId, onClose }: VideoModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (youtubeId) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [youtubeId, onClose]);

  if (!youtubeId) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 px-4 py-8 backdrop-blur-sm sm:px-10 animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl overflow-hidden rounded-2xl bg-black shadow-2xl">
        
        {/* Yopish tugmasi */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white transition-colors hover:bg-red-500"
        >
          <X size={24} />
        </button>

        {/* YouTube Iframe */}
        <div className="relative aspect-video w-full">
          <iframe
            src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`}
            title="YouTube video player"
            className="absolute left-0 top-0 h-full w-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
      
      <div className="absolute inset-0 -z-10" onClick={onClose} />
    </div>
  );
}