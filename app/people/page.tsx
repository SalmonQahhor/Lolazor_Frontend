"use client";

import { Suspense, useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { getPeople, ApiError } from "@/lib/api";
import type { Person } from "@/types/api";
import PersonCard from "@/components/PersonCard";
import { EmptyState, ErrorState, LoadingState } from "@/components/StateBanners";
import { useDebounce } from "@/hooks/useDebounce";

export default function PeoplePage() {
  return (
    <Suspense fallback={<LoadingState label="Yuklanmoqda..." />}>
      <PeoplePageContent />
    </Suspense>
  );
}

function PeoplePageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchInput, setSearchInput] = useState(searchParams.get("search") || "");
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const debouncedSearch = useDebounce(searchInput, 600);
  const search = searchParams.get("search") || "";

  const updateParams = useCallback(
    (updates: Record<string, string | null>) => {
      const next = new URLSearchParams(searchParams.toString());
      Object.entries(updates).forEach(([key, value]) => {
        if (value === null || value === "") next.delete(key);
        else next.set(key, value);
      });
      router.push(`/people?${next.toString()}`);
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
        const res = await getPeople({
          search: search || undefined,
          ordering: "-episodes_count",
        });
        if (!cancelled) setPeople(res.results);
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof ApiError ? err.message : "Odamlarni yuklab bo'lmadi.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, [search]);

  return (
    <div className="container-lolazor py-10 pb-24 sm:py-16">
      <header className="mb-14 flex flex-col items-center justify-center text-center">
        <span className="mb-4 text-[11px] font-bold uppercase tracking-widest text-lolazor-sky">
          PODKAST MEHMONLARI
        </span>
        <h1 className="text-5xl font-extrabold tracking-tight text-text-main sm:text-6xl md:text-7xl">
          Suhbatdoshlar <span className="text-lolazor-sky">ro&apos;yxati</span>
        </h1>
      </header>

      <div className="mb-10 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div className="relative w-full md:w-[340px]">
          <Search size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-text-muted" />
          <input
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            type="search"
            placeholder="Mehmon ismini qidiring..."
            className="w-full rounded-full border border-border/50 bg-card/40 py-3 pl-12 pr-4 text-sm text-text-main placeholder:text-text-muted outline-none transition focus:border-lolazor-sky focus:bg-card hover:bg-card/60"
          />
        </div>

        <div className="hidden text-sm font-medium text-text-muted lg:block">
          {people.length} kishi
        </div>
      </div>

      {loading && <LoadingState label="Mehmonlar yuklanmoqda..." />}
      {!loading && error && <ErrorState message={error} />}
      {!loading && !error && people.length === 0 && <EmptyState />}

      {!loading && !error && people.length > 0 && (
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 xl:gap-6">
          {people.map((person) => (
            <PersonCard key={person.id} person={person} />
          ))}
        </div>
      )}
    </div>
  );
}