import { AlertTriangle, Inbox, Loader2 } from "lucide-react";

export function LoadingState({ label = "Yuklanmoqda..." }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-24 text-text-muted">
      <Loader2 size={28} className="animate-spin text-lolazor-sky" />
      <p className="text-sm">{label}</p>
    </div>
  );
}

export function ErrorState({
  message,
  onRetry,
}: {
  message: string;
  onRetry?: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-border bg-card py-16 px-6 text-center">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10 text-red-400">
        <AlertTriangle size={22} />
      </span>
      <p className="max-w-sm text-sm text-text-muted">{message}</p>
      {onRetry && (
        <button type="button" onClick={onRetry} className="btn-secondary mt-2">
          Qayta urinish
        </button>
      )}
    </div>
  );
}

export function EmptyState({
  title = "Hech narsa topilmadi",
  message = "Boshqa filtr yoki qidiruv so'zini sinab ko'ring.",
}: {
  title?: string;
  message?: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-border py-16 px-6 text-center">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-background text-text-muted">
        <Inbox size={22} />
      </span>
      <h3 className="text-sm font-semibold text-text-main">{title}</h3>
      <p className="max-w-sm text-sm text-text-muted">{message}</p>
    </div>
  );
}
