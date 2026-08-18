import Image from "next/image";
import { Mic2, PlayCircle, Users, ExternalLink } from "lucide-react";

export const metadata = {
  title: "Podcast haqida",
};

// Ismlardan bosh harflarni oluvchi yordamchi funksiya
const getInitials = (name: string) => {
  const parts = name.split(" ");
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return name.substring(0, 2).toUpperCase();
};

const HOSTS = [
  {
    name: "Otabek Bakirov",
    role: "Iqtisodchi & Moliya tahlilchisi",
    bio: "Jamiyatdagi makroiqtisodiy jarayonlar, bank sektori va monetar siyosat bo'yicha eng o'tkir tahlilchi. 'Bakiroo' kanali muallifi.",
    avatar: "/hosts/bakirov.jpg",
    telegram: "https://t.me/bakiroo",
  },
  {
    name: "Muhrim A'zamxo'jayev",
    role: "Jurnalist & Media-menejer",
    bio: "Tajribali jurnalist va media sohasi eksperti. O'zbekistondagi ko'plab yetakchi nashrlarda bosh muharrir bo'lib ishlagan.",
    avatar: "/hosts/muhrim.jpg",
    telegram: "https://t.me/muhrim",
  },
  {
    name: "Qobil Xidirov",
    role: "Jurnalist & Siyosiy tahlilchi",
    bio: "Mamlakatdagi eng ommabop va nufuzli ijtimoiy-siyosiy manbalardan biri bo'lmish 'Davletovuz' kanali muallifi.",
    avatar: "/hosts/davletov.jpg",
    telegram: "https://t.me/davletovuz",
  },
  {
    name: "Laziz Hamidov",
    role: "Boshlovchi & Moderator",
    bio: "Media-ekspert va podkast moderatori. Suhbat davomida bahslarni mo'tadillashtiruvchi hamda muhokamani yo'naltiruvchi.",
    avatar: "/hosts/laziz.jpg",
    telegram: "https://t.me/lazizhamidov",
  },
  {
    name: "Xushnudbek Xudoyberdiyev",
    role: "Huquqshunos & Jamoat arbobi",
    bio: "Qonunchilik va huquqiy islohotlar bo'yicha ekspert, faol huquqshunos. 'Xushnudbek' telegram kanali muallifi.",
    avatar: "/hosts/xushnudbek.jpg",
    telegram: "https://t.me/xushnudbek",
  },
];

export default function AboutPage() {
  return (
    <div className="container-lolazor py-12 pb-24 sm:py-20">
      <div className="mx-auto max-w-5xl">
        
        {/* Asosiy Sarlavha */}
        <div className="text-center">
          <span className="eyebrow flex items-center justify-center gap-2">
            <Mic2 size={14} className="text-lolazor-sky" />
            LOLAZOR HAQIDA
          </span>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-text-main sm:text-5xl lg:text-6xl">
            Biz <span className="text-lolazor-sky">kimmiz?</span>
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-text-muted sm:text-lg">
            Lolazor — bu jamiyatdagi siyosiy, iqtisodiy va ijtimoiy o'zgarishlarni teran tahlil qiluvchi, erkin va mustaqil podkast maydoni. Bizning maqsadimiz — turli soha ekspertlari bilan ochiq suhbatlar qurish va voqeliklarga turli rakursdan nazar tashlash.
          </p>
        </div>

        {/* Jamoa Illustratsiyasi */}
        <div className="relative mt-12 overflow-hidden rounded-3xl border border-border/80 bg-card p-2 shadow-2xl transition duration-300 hover:border-lolazor-sky/40">
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-[#f8f9fa] dark:bg-white/5">
            <Image
              src="/lolazor-team.png"
              alt="Lolazor Jamoasi"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* Boshlovchilar bloki (Flexbox markazlashgan joylashuvi) */}
        <section className="mt-24">
          <div className="mb-12 text-center sm:text-left">
            <span className="eyebrow flex items-center justify-center gap-2 sm:justify-start">
              <Users size={14} className="text-lolazor-sky" />
              DOIMIY BOSHLOVCHILAR
            </span>
            <h2 className="mt-2 text-3xl font-extrabold text-text-main sm:text-4xl">
              Podkast loyihasi <span className="text-lolazor-sky">mualliflari</span>
            </h2>
          </div>

          {/* Grid o'rniga Flexbox ishlatildi, shunda pastki 2 ta kartochka markazda turadi */}
          <div className="flex flex-wrap justify-center gap-6 lg:gap-8">
            {HOSTS.map((host) => (
              <div
                key={host.name}
                className="group flex w-full max-w-sm flex-col overflow-hidden rounded-[2rem] border border-border/80 bg-card shadow-lg transition-all duration-300 hover:-translate-y-1.5 hover:border-lolazor-sky/50 hover:shadow-[0_10px_40px_-10px_rgba(56,189,248,0.2)] sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1.4rem)]"
              >
                {/* Rasm qismi */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted/20">
                  <Image
                    src={host.avatar}
                    alt={host.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  
                  {/* Fallback yozuv */}
                  <div className="absolute inset-0 -z-10 flex items-center justify-center bg-lolazor-sky/5 text-5xl font-black tracking-widest text-lolazor-sky/20">
                    {getInitials(host.name)}
                  </div>
                  
                  {/* O'tish gradienti */}
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-card to-transparent" />

                  {/* Telegram tugmasi */}
                  <a
                    href={host.telegram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-black/40 text-white shadow-lg backdrop-blur-md transition-all hover:scale-110 hover:bg-lolazor-sky"
                    title={`${host.name} - Telegram kanali`}
                  >
                    <ExternalLink size={18} />
                  </a>
                </div>

                {/* Ma'lumot qismi */}
                <div className="relative z-10 flex flex-1 flex-col p-6 pt-2">
                  <h3 className="text-2xl font-extrabold text-text-main transition group-hover:text-lolazor-sky">
                    {host.name}
                  </h3>
                  
                  <span className="mt-2 inline-flex w-max items-center rounded-full bg-lolazor-sky/10 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-lolazor-sky">
                    {host.role}
                  </span>
                  
                  <p className="mt-4 text-sm leading-relaxed text-text-muted">
                    {host.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Maqsad va Tamoyillar */}
        <div className="mt-24 grid grid-cols-1 gap-8 sm:grid-cols-2">
          <div className="flex flex-col items-center rounded-3xl border border-border bg-card p-8 text-center shadow-sm transition hover:border-border/80 sm:items-start sm:text-left">
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-lolazor-sky/10 text-lolazor-sky">
              <PlayCircle size={28} />
            </div>
            <h3 className="text-xl font-bold text-text-main">Erkin Fikr</h3>
            <p className="mt-3 text-sm leading-relaxed text-text-muted">
              Biz hech qanday senzurasiz, jamiyat uchun eng muhim va og'riqli mavzularni ko'tarib chiqamiz. Ochiqlik — bizning asosiy prinsipimiz.
            </p>
          </div>

          <div className="flex flex-col items-center rounded-3xl border border-border bg-card p-8 text-center shadow-sm transition hover:border-border/80 sm:items-start sm:text-left">
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-lolazor-sky/10 text-lolazor-sky">
              <Users size={28} />
            </div>
            <h3 className="text-xl font-bold text-text-main">Kuchli Jamoa</h3>
            <p className="mt-3 text-sm leading-relaxed text-text-muted">
              O'zbekistonning eng kuchli ekspertlari, jurnalistlari va iqtisodchilari bitta stolda jamlanadi. Birgalikda haqiqatni izlaymiz.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}