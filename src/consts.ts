import type { Site, Socials } from "@types"
import type { ui } from "@i18n/ui"

// Global. TITLE/AUTHOR are a name - they don't get translated. The
// translated tagline lives in src/i18n/ui.ts under "site.description".
export const SITE: Site = {
  TITLE: "Noé Steiner",
  AUTHOR: "Noé Steiner",
}

// Nav links: canonical (English) paths + the ui.ts key for their label.
// Header/Drawer localize the href and translate the label per request.
type NavKey = Extract<keyof (typeof ui)["en"], `nav.${string}`>
export const NAV_LINKS: { key: NavKey; href: string }[] = [
  { key: "nav.home", href: "/" },
  { key: "nav.work", href: "/work" },
  { key: "nav.blog", href: "/blog" },
  { key: "nav.projects", href: "/projects" },
  { key: "nav.music", href: "/music" },
  { key: "nav.trails", href: "/hiking" },
]

// Socials - handles/URLs, not translated.
export const SOCIALS: Socials = [
  {
    NAME: "Email",
    ICON: "email",
    TEXT: "noesteiner@proton.me",
    HREF: "mailto:noesteiner@proton.me",
  },
  {
    NAME: "Github",
    ICON: "github",
    TEXT: "unshade",
    HREF: "https://github.com/unshade",
  },
  {
    NAME: "LinkedIn",
    ICON: "linkedin",
    TEXT: "noesteiner",
    HREF: "https://www.linkedin.com/in/noesteiner/",
  },
]
