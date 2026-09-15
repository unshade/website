import type { CollectionEntry } from "astro:content"
import { createEffect, createSignal } from "solid-js"
import Fuse from "fuse.js"
import ArrowCard from "@components/ArrowCard"
import SearchBar from "@components/SearchBar"
import { useTranslations, type Lang } from "@i18n/ui"

type Entry =
  | CollectionEntry<"blog">
  | CollectionEntry<"projects">
  | CollectionEntry<"music">
  | CollectionEntry<"hiking">

type Props = {
  data: Entry[]
  lang: Lang
}

export default function Search({ data, lang }: Props) {
  const t = useTranslations(lang)
  const [query, setQuery] = createSignal("")
  const [results, setResults] = createSignal<Entry[]>([])

  const fuse = new Fuse(data, {
    keys: ["id", "data.title", "data.summary", "data.tags"],
    includeMatches: true,
    minMatchCharLength: 2,
    threshold: 0.4,
  })

  createEffect(() => {
    if (query().length < 2) {
      setResults([])
    } else {
      setResults(fuse.search(query()).map((result) => result.item))
    }
  })

  const onSearchInput = (e: Event) => {
    const target = e.target as HTMLInputElement
    setQuery(target.value)
  }

  return (
    <div class="flex flex-col">
      <SearchBar onSearchInput={onSearchInput} query={query} setQuery={setQuery} placeholderText={t("search.placeholder")} />

      {(query().length >= 2 && results().length >= 1) && (
        <div class="mt-12">
          <div class="text-sm uppercase mb-2">
            {t("search.foundFor", { n: results().length, q: query() })}
          </div>
          <ul class="flex flex-col gap-3">
            {results().map(result => (
              <li>
                <ArrowCard entry={result} pill={true} lang={lang} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
