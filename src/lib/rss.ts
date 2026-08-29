import rss from "@astrojs/rss"
import { SITE } from "@consts"
import { getLocalizedCollection } from "@lib/i18n-content"
import { localizePath, useTranslations, type Lang } from "@i18n/ui"

export async function buildFeed(lang: Lang, site: string | URL) {
  const posts = await getLocalizedCollection("blog", lang)
  const projects = await getLocalizedCollection("projects", lang)
  const music = await getLocalizedCollection("music", lang)
  const hiking = await getLocalizedCollection("hiking", lang)

  const items = [...posts, ...projects, ...music, ...hiking].filter((item) => !item.data.draft)

  items.sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime())

  const t = useTranslations(lang)

  return rss({
    title: SITE.TITLE,
    description: t("site.description"),
    site,
    items: items.map((item) => ({
      title: item.data.title,
      description: item.data.summary,
      pubDate: item.data.date,
      link: `${localizePath(lang, `/${item.collection}/${item.realSlug}`)}/`,
    })),
  })
}
