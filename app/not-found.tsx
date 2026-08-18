import Link from "next/link";
import { Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="container-lolazor flex flex-col items-center justify-center gap-4 py-32 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-lolazor-sky/10 text-lolazor-sky">
        <Compass size={26} />
      </span>
      <h1 className="text-2xl font-bold text-text-main">Sahifa topilmadi</h1>
      <p className="max-w-sm text-sm text-text-muted">
        Siz izlagan sahifa mavjud emas yoki ko&apos;chirilgan bo&apos;lishi mumkin.
      </p>
      <Link href="/" className="btn-primary mt-2">
        Bosh sahifaga qaytish
      </Link>
    </div>
  );
}
