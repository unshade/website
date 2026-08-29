import rss from "@astrojs/rss"
import { getCollection } from "astro:content"
import { SITE } from "@consts"

type Context = {
  site: string
}

export async function GET(context: Context) {
	const posts = await getCollection("blog")
  const projects = await getCollection("projects")
  const music = await getCollection("music")
  const hiking = await getCollection("hiking")

  const items = [...posts, ...projects, ...music, ...hiking]

  items.sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime())

  return rss({
    title: SITE.TITLE,
    description: SITE.DESCRIPTION,
    site: context.site,
    items: items.map((item) => ({
      title: item.data.title,
      description: item.data.summary,
      pubDate: item.data.date,
      link: `/${item.collection}/${item.slug}/`,
    })),
  })
}
