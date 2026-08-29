import { buildFeed } from "@lib/rss"

type Context = {
  site: string
}

export async function GET(context: Context) {
  return buildFeed("fr", context.site)
}
