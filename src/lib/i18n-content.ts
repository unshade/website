import { getCollection } from "astro:content"
import type { Lang } from "@i18n/ui"

export type CollectionName = "work" | "blog" | "projects" | "music" | "hiking" | "legal"

/**
 * Content collections are organized as <collection>/<lang>/<real-slug> so
 * a single collection definition can hold both languages side by side.
 * This pulls just one language's entries and exposes `realSlug` (the
 * lang-prefix stripped slug) for building routes/links.
 */
export async function getLocalizedCollection<C extends CollectionName>(collection: C, lang: Lang) {
  const entries = await getCollection(collection, (entry: { slug: string }) =>
    entry.slug.startsWith(`${lang}/`),
  )
  return entries.map((entry) => ({
    ...entry,
    realSlug: entry.slug.slice(lang.length + 1),
  }))
}
