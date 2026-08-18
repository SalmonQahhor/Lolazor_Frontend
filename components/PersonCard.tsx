import Link from "next/link";
import Image from "next/image";
import { Instagram } from "lucide-react";
import type { Person } from "@/types/api";
import { initials } from "@/lib/utils";

export default function PersonCard({ person }: { person: Person }) {
  // Endi username ni to'g'ridan-to'g'ri olamiz, ortiqcha URL kesish shart emas
  const igHandle = person.instagram ? `@${person.instagram.replace('@', '')}` : "";

  return (
    <Link
      href={`/people/${person.id}`}
      className="group relative flex aspect-[3/4] w-full flex-col overflow-hidden rounded-2xl bg-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-lolazor-sky/20"
    >
      {/* Orqa fon rasmi (Next.js Image orqali optimizatsiya qilingan) */}
      {person.avatar ? (
        <Image
          src={person.avatar}
          alt={person.full_name}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <div className="absolute inset-0 flex h-full w-full items-center justify-center bg-lolazor-sky/10 text-4xl font-black text-lolazor-sky/40">
          {initials(person.full_name)}
        </div>
      )}

      {/* To'q Gradient Overlay (Matn va bio o'qilishi oson bo'lishi uchun) */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-100" />

      {/* Yuqori o'ng burchakdagi Instagram ikonkasi */}
      {igHandle && (
        <div className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-black/40 backdrop-blur-md transition group-hover:bg-[#E1306C]">
          <Instagram size={15} className="text-white" />
        </div>
      )}

      {/* Pastki qism: Ism, Bio va Nik */}
      <div className="absolute bottom-0 left-0 flex w-full flex-col p-4 sm:p-5">
        <h3 className="text-lg font-extrabold leading-tight text-white transition-colors group-hover:text-lolazor-sky sm:text-xl">
          {person.full_name}
        </h3>
        
        {/* Mehmon haqida izoh (faqat 2 qator ko'rinadi, ortig'i kesiladi) */}
        {person.bio && (
          <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-white/70">
            {person.bio}
          </p>
        )}
        
        {/* Instagram Handle */}
        {igHandle && (
          <span className="mt-2 inline-flex items-center text-xs font-semibold text-lolazor-sky/90">
            {igHandle}
          </span>
        )}
      </div>
    </Link>
  );
}