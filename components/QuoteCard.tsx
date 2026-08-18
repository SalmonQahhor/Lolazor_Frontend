import Image from "next/image";
import Link from "next/link";
import { MessageSquareQuote, Clock } from "lucide-react";
import type { Quote } from "@/types/api";
import { initials } from "@/lib/utils";

export default function QuoteCard({ quote }: { quote: Quote }) {
  const person = quote.person;

  return (
    <div className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-border/70 bg-card/40 p-6 shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-lolazor-sky/50 hover:bg-card hover:shadow-xl">
      
      {/* Dekorativ Iqtibos Ikonkasi va Vaqt */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-lolazor-sky/10 text-lolazor-sky border border-lolazor-sky/20">
          <MessageSquareQuote size={20} />
        </div>
        {quote.timestamp && (
          <span className="flex items-center gap-1.5 rounded-full bg-background/80 px-3 py-1 text-xs font-semibold text-text-muted border border-border/50">
            <Clock size={12} className="text-lolazor-sky" />
            {quote.timestamp}
          </span>
        )}
      </div>

      {/* Iqtibos Matni (Long Unbroken Word or Line Break fix) */}
      <blockquote className="mb-6 flex-1 text-base font-medium leading-relaxed text-text-main italic break-words whitespace-pre-line">
        &ldquo;{quote.text}&rdquo;
      </blockquote>

      {/* Shaxs Muallifi */}
      {person && (
        <div className="flex items-center gap-3.5 border-t border-border/50 pt-4">
          <Link href={`/people/${person.id}`} className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full border border-border/80">
            {person.avatar ? (
              <Image
                src={person.avatar}
                alt={person.full_name}
                fill
                className="object-cover"
                sizes="44px"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-lolazor-sky/10 text-sm font-black text-lolazor-sky">
                {initials(person.full_name)}
              </div>
            )}
          </Link>

          <div className="flex flex-col min-w-0">
            <Link
              href={`/people/${person.id}`}
              className="truncate text-sm font-bold text-text-main transition-colors hover:text-lolazor-sky"
            >
              {person.full_name}
            </Link>
            <span className="text-xs font-medium text-text-muted">
              {person.role === "host" ? "Boshlovchi" : "Podkast mehmoni"}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}