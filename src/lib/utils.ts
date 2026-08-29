import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date, lang: "en" | "fr" = "en") {
  return Intl.DateTimeFormat(lang === "fr" ? "fr-FR" : "en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric"
  }).format(date)
}

export function readingTime(html: string, lang: "en" | "fr" = "en") {
  const textOnly = html.replace(/<[^>]+>/g, "")
  const wordCount = textOnly.split(/\s+/).length
  const readingTimeMinutes = ((wordCount / 200) + 1).toFixed()
  return lang === "fr" ? `${readingTimeMinutes} min de lecture` : `${readingTimeMinutes} min read`
}


export function truncateText(str: string, maxLength: number): string {
  const ellipsis = '…';

  if (str.length <= maxLength) return str;

  const trimmed = str.trimEnd();
  if (trimmed.length <= maxLength) return trimmed;

  const cutoff = maxLength - ellipsis.length;
  let sliced = str.slice(0, cutoff).trimEnd();

  return sliced + ellipsis;
}