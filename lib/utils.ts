import type { PersonMinimal } from "@/types/api";

/** Formats an ISO date string ("2024-11-03") into Uzbek-locale readable form. */
export function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    if (Number.isNaN(date.getTime())) return dateString;
    return new Intl.DateTimeFormat("uz-UZ", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);
  } catch {
    return dateString;
  }
}

/** Formats an ISO date string into a short "3-noy 2024" style label. */
export function formatDateShort(dateString: string): string {
  try {
    const date = new Date(dateString);
    if (Number.isNaN(date.getTime())) return dateString;
    return new Intl.DateTimeFormat("uz-UZ", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(date);
  } catch {
    return dateString;
  }
}

/**
 * Normalizes a duration value into "H:MM:SS" / "MM:SS" display form.
 * Accepts either "HH:MM:SS" strings (Django DurationField) or raw seconds.
 */
export function formatDuration(duration: string): string {
  if (!duration) return "";
  if (duration.includes(":")) {
    const parts = duration.split(":").map((p) => p.trim());
    if (parts.length === 3 && parts[0] === "00") {
      return `${parts[1]}:${parts[2]}`;
    }
    return parts.join(":");
  }
  const totalSeconds = Number(duration);
  if (Number.isNaN(totalSeconds)) return duration;
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.floor(totalSeconds % 60);
  const mm = String(minutes).padStart(2, "0");
  const ss = String(seconds).padStart(2, "0");
  return hours > 0 ? `${hours}:${mm}:${ss}` : `${minutes}:${ss}`;
}

/** Returns the YouTube thumbnail URL for a given video id. */
export function youtubeThumbnail(youtubeId: string): string {
  return `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`;
}

/** Returns the YouTube embed URL, optionally starting at a given timestamp (seconds). */
export function youtubeEmbedUrl(youtubeId: string, startSeconds?: number): string {
  const base = `https://www.youtube.com/embed/${youtubeId}`;
  return startSeconds ? `${base}?start=${startSeconds}` : base;
}

/** Parses a "HH:MM:SS" / "MM:SS" timestamp label into total seconds. */
export function timestampToSeconds(timestamp: string): number {
  const parts = timestamp.split(":").map((p) => parseInt(p, 10) || 0);
  if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
  if (parts.length === 2) return parts[0] * 60 + parts[1];
  return parts[0] || 0;
}

/** Initials fallback for a person without an avatar image. */
export function initials(fullName: string): string {
  return fullName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase())
    .join("");
}

/** Joins host/guest names into a compact "A, B va C" style byline. */
export function joinNames(people: PersonMinimal[]): string {
  const names = people.map((p) => p.full_name);
  if (names.length === 0) return "";
  if (names.length === 1) return names[0];
  return `${names.slice(0, -1).join(", ")} va ${names[names.length - 1]}`;
}

export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}
