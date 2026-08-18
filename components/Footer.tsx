import { Instagram, Youtube, Send } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-border/50 bg-background pb-12 pt-16">
      <div className="container-lolazor flex flex-col items-center justify-center text-center">
        
        <p className="mb-6 text-sm font-medium text-text-muted">
          Barcha videolar, tovushlar va kontent Lolazor jamoasiga tegishli.
        </p>

        {/* Ijtimoiy tarmoqlar (Kulgilektual Uslubida - Pill buttons) */}
        <div className="mb-12 flex flex-wrap justify-center gap-3 sm:gap-4">
          <a 
            href="https://www.youtube.com/@Lolazorpodcast" 
            target="_blank" 
            rel="noreferrer" 
            className="flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-semibold text-text-main transition hover:border-red-500 hover:text-red-500 hover:shadow-lg"
          >
            <Youtube size={18} />
            @lolazorpodcast
          </a>
          <a 
            href="https://instagram.com/lolazor.podcast" 
            target="_blank" 
            rel="noreferrer" 
            className="flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-semibold text-text-main transition hover:border-pink-500 hover:text-pink-500 hover:shadow-lg"
          >
            <Instagram size={18} />
            @lolazorpodcast
          </a>
          <a 
            href="https://t.me/lolazorpodcast" 
            target="_blank" 
            rel="noreferrer" 
            className="flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-semibold text-text-main transition hover:border-blue-400 hover:text-blue-400 hover:shadow-lg"
          >
            <Send size={16} />
            @lolazorpodcast
          </a>
        </div>

        {/* Sayt muallifi (Salmon Qahhorov) */}
        <div className="flex flex-col items-center justify-center gap-2">
          <span className="text-[10px] font-bold uppercase tracking-widest text-text-muted">
            SAYT MUALLIFI
          </span>
          <a 
            href="https://salmoncs.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group flex items-center gap-3 rounded-full border border-border bg-card p-1 pr-5 transition hover:border-lolazor-sky hover:shadow-md"
          >
            <img 
              src="https://salmoncs.com/static/images/salmon.JPEG" 
              alt="Salmon Qahhorov" 
              className="h-8 w-8 rounded-full object-cover ring-2 ring-transparent transition group-hover:ring-lolazor-sky"
            />
            <span className="text-sm font-bold text-text-main group-hover:text-lolazor-sky transition">
              Salmon Qahhorov
            </span>
          </a>
        </div>

      </div>
    </footer>
  );
}