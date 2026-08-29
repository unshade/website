import { formatDate, truncateText } from "@lib/utils"
import type { CollectionEntry } from "astro:content"

type Entry =
  | CollectionEntry<"blog">
  | CollectionEntry<"projects">
  | CollectionEntry<"music">
  | CollectionEntry<"hiking">

type Props = {
  entry: Entry
  pill?: boolean
}

const PILL_LABEL: Record<Entry["collection"], string> = {
  blog: "post",
  projects: "project",
  music: "track",
  hiking: "trail",
}

export default function ArrowCard({ entry, pill }: Props) {
  const isMusic = entry.collection === "music"
  const isHiking = entry.collection === "hiking"

  return (
    <a href={`/${entry.collection}/${entry.slug}`} class="group p-4 gap-3 flex items-center border rounded-lg hover:bg-black/5 hover:dark:bg-white/10 border-black/15 dark:border-white/20 transition-colors duration-300 ease-in-out">
      <div class="w-full group-hover:text-black group-hover:dark:text-white blend">
        <div class="flex flex-wrap items-center gap-2">
          {pill &&
            <div class="text-sm capitalize px-2 py-0.5 rounded-full border border-black/15 dark:border-white/25 font-mono">
              {PILL_LABEL[entry.collection]}
            </div>
          }
          <div class="text-sm uppercase font-mono text-black/50 dark:text-white/50">
            {formatDate(entry.data.date)}
          </div>
          {isHiking && entry.data.elevation &&
            <div class="text-xs uppercase font-mono text-moss-600 dark:text-moss-400">
              ▲ {entry.data.elevation}
            </div>
          }
          {isMusic && entry.data.bpm &&
            <div class="text-xs uppercase font-mono text-ice-600 dark:text-ice-300">
              {entry.data.bpm} bpm
            </div>
          }
        </div>
        <div class="font-mono font-semibold mt-3 text-black dark:text-white line-clamp-2">
          {entry.data.title}
        </div>

        <div class="text-sm line-clamp-2">
          {entry.data.summary}
        </div>
        <ul class="flex flex-wrap mt-2 gap-1">
          {entry.data.tags.map((tag: string) => (
            <li class="text-xs uppercase font-mono py-0.5 px-2 rounded bg-black/5 dark:bg-white/20 text-black/75 dark:text-white/75">
              {truncateText(tag, 20)}
            </li>
          ))}
        </ul>
      </div>
      {isMusic ? (
        <div class="waveform shrink-0" aria-hidden="true">
          {[10, 20, 14, 26, 18, 8].map((h, i) => (
            <span style={{ height: `${h}px`, "animation-delay": `${i * 0.12}s` }} />
          ))}
        </div>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="stroke-current group-hover:stroke-black group-hover:dark:stroke-white shrink-0">
          <line x1="5" y1="12" x2="19" y2="12" class="scale-x-0 group-hover:scale-x-100 translate-x-4 group-hover:translate-x-1 transition-all duration-300 ease-in-out" />
          <polyline points="12 5 19 12 12 19" class="translate-x-0 group-hover:translate-x-1 transition-all duration-300 ease-in-out" />
        </svg>
      )}
    </a>
  )
}
