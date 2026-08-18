"use client";

import { useState, useEffect } from "react";
import { MessageSquare, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { sendTelegramMessage } from "./actions";

export default function FeedbackPage() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    if (cooldown <= 0) return;

    const timer = setInterval(() => {
      setCooldown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [cooldown]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (cooldown > 0) return;

    setLoading(true);
    setStatus("idle");
    setErrorMessage("");

    const formData = new FormData(e.currentTarget);
    const res = await sendTelegramMessage(formData);

    setLoading(false);
    if (res.success) {
      setStatus("success");
      e.currentTarget.reset();
      setCooldown(30); 
    } else {
      setStatus("error");
      setErrorMessage(res.error || "Noma'lum xatolik yuz berdi.");
    }
  }

  return (
    <div className="container-lolazor py-12 pb-24 sm:py-20">
      <div className="mx-auto max-w-2xl">
        
        {/* Sarlavha qismi */}
        <div className="mb-10 text-center">
          <span className="eyebrow flex items-center justify-center gap-2">
            <MessageSquare size={14} className="text-lolazor-sky" />
            LOLAZOR PODKAST
          </span>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-text-main sm:text-6xl">
            Fikr va <span className="text-amber-500">takliflar</span>
          </h1>
          <p className="mt-4 text-sm text-text-muted sm:text-base">
            Savol, taklif, xatolik yoki yangi g&apos;oyangiz bo&apos;lsa, shu yerda yozib qoldiring.
          </p>
        </div>

        {/* Forma */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 rounded-3xl border border-border/80 bg-card p-6 shadow-xl sm:p-10">
          
          {/* Xabar maydoni */}
          <div>
            <label htmlFor="message" className="mb-2 block text-sm font-bold text-text-main">
              Xabar
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              placeholder="Nima demoqchi edingiz?"
              className="w-full resize-none rounded-2xl border border-border bg-background p-4 text-sm text-text-main placeholder:text-text-muted/60 outline-none transition focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10"
            />
            <p className="mt-2 text-[11px] font-medium text-text-muted sm:text-xs">
              Fikr-mulohazangiz anonim qolishi mumkin. Javob olishni istasangiz, pastda aloqa ma&apos;lumotingizni ham qoldiring.
            </p>
          </div>

          {/* Ism va Aloqa maydonlari */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="mb-2 block text-sm font-bold text-text-main">
                Ism <span className="text-text-muted/60 font-medium">(ixtiyoriy)</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Ismingiz"
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-text-main placeholder:text-text-muted/60 outline-none transition focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10"
              />
            </div>

            <div>
              <label htmlFor="contact" className="mb-2 block text-sm font-bold text-text-main">
                Aloqa <span className="text-text-muted/60 font-medium">(ixtiyoriy)</span>
              </label>
              <input
                type="text"
                id="contact"
                name="contact"
                placeholder="@telegram / email"
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-text-main placeholder:text-text-muted/60 outline-none transition focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10"
              />
            </div>
          </div>

          {/* Xabarnomalar */}
          {status === "success" && (
            <div className="flex items-center gap-2 rounded-xl bg-green-500/10 p-4 text-sm font-semibold text-green-500">
              <CheckCircle size={18} />
              Xabaringiz muvaffaqiyatli yuborildi. Rahmat!
            </div>
          )}
          
          {status === "error" && (
            <div className="flex items-center gap-2 rounded-xl bg-red-500/10 p-4 text-sm font-semibold text-red-500">
              <AlertCircle size={18} />
              {errorMessage}
            </div>
          )}

          {/* Taymerli Yuborish Tugmasi */}
          <button
            type="submit"
            disabled={loading || cooldown > 0}
            className="mt-2 flex w-full items-center justify-center rounded-xl bg-[#F59E0B] py-3.5 text-sm font-bold text-black shadow-md transition-all hover:bg-[#F59E0B]/90 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <Loader2 size={16} className="animate-spin" /> Yuborilmoqda...
              </span>
            ) : cooldown > 0 ? (
              `Kuting (${cooldown}s)`
            ) : (
              "Yuborish"
            )}
          </button>
        </form>

      </div>
    </div>
  );
}