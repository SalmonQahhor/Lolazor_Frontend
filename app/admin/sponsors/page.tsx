"use client";

import { useEffect, useState } from "react";
import { BarChart3, MousePointerClick, Tag, ExternalLink } from "lucide-react";
import { LoadingState, ErrorState } from "@/components/StateBanners";

interface SponsorStat {
  id: number;
  name: string;
  promo_code: string | null;
  total_clicks: number;
}

export default function SponsorDashboardPage() {
  const [stats, setStats] = useState<SponsorStat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // API manzilingizni to'g'rilab yozing
    fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api/v1'}/sponsors/analytics/`)
      .then((res) => {
        if (!res.ok) throw new Error("Statistikani yuklab bo'lmadi");
        return res.json();
      })
      .then((data) => {
        setStats(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container-lolazor py-12 pb-24 sm:py-16">
      
      {/* Sarlavha */}
      <div className="mb-10 text-center sm:text-left">
        <span className="eyebrow flex items-center justify-center gap-2 sm:justify-start">
          <BarChart3 size={14} className="text-lolazor-sky" />
          HOMIYLAR STATISTIKASI
        </span>
        <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-text-main sm:text-5xl">
          Reklama <span className="text-lolazor-sky">samaradorligi</span>
        </h1>
        <p className="mt-4 text-sm text-text-muted sm:text-base">
          Lolazor podkastidagi homiylik havolalari orqali o'tgan foydalanuvchilarning real vaqtdagi hisoboti.
        </p>
      </div>

      {loading && <LoadingState label="Statistika yuklanmoqda..." />}
      {!loading && error && <ErrorState message={error} />}

      {/* Kartochkalar (Glassmorphism uslubida) */}
      {!loading && !error && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8">
          {stats.map((item) => (
            <div key={item.id} className="group flex flex-col justify-between overflow-hidden rounded-[2rem] border border-border/80 bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-lolazor-sky/40 hover:shadow-lg">
              
              <div className="flex items-center justify-between border-b border-border/60 pb-5">
                <h3 className="text-xl font-bold text-text-main group-hover:text-lolazor-sky transition-colors">
                  {item.name}
                </h3>
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-lolazor-sky/10 text-lolazor-sky transition-transform duration-300 group-hover:scale-110 group-hover:bg-lolazor-sky group-hover:text-background">
                  <MousePointerClick size={18} />
                </span>
              </div>

              <div className="mt-6 flex flex-col gap-1">
                <span className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                  Jami havola bosishlar
                </span>
                <span className="text-4xl font-black text-text-main">
                  {item.total_clicks.toLocaleString()} <span className="text-lg text-lolazor-sky">marta</span>
                </span>
              </div>

              {item.promo_code ? (
                <div className="mt-6 flex items-center justify-between rounded-xl bg-background px-4 py-3 border border-border/50">
                  <span className="flex items-center gap-1.5 text-xs font-bold text-text-muted">
                    <Tag size={14} /> Promokod:
                  </span>
                  <span className="font-mono text-sm font-bold text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-md">
                    {item.promo_code}
                  </span>
                </div>
              ) : (
                <div className="mt-6 flex h-11 items-center justify-center rounded-xl bg-background/50 border border-dashed border-border/50">
                  <span className="text-xs font-medium text-text-muted">Promokod mavjud emas</span>
                </div>
              )}
              
            </div>
          ))}
        </div>
      )}
    </div>
  );
}