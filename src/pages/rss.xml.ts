import { buildFeed } from "@lib/rss"

type Context = {
  site: string
}

export async function GET(context: Context) {
  return buildFeed("en", context.site)
}
