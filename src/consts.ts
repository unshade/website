import type { Site, Page, Links, Socials } from "@types"

// Global
export const SITE: Site = {
  TITLE: "Noé Steiner",
  DESCRIPTION: "Software engineer working in cloud infrastructure. Also making tracks in FL Studio and chasing ridgelines in the Alps.",
  AUTHOR: "Noé Steiner",
}

// Work Page
export const WORK: Page = {
  TITLE: "Work",
  DESCRIPTION: "Places I have worked.",
}

// Blog Page
export const BLOG: Page = {
  TITLE: "Blog",
  DESCRIPTION: "Writing on topics I am passionate about.",
}

// Projects Page
export const PROJECTS: Page = {
  TITLE: "Projects",
  DESCRIPTION: "Recent projects I have worked on.",
}

// Music Page
export const MUSIC: Page = {
  TITLE: "Music",
  DESCRIPTION: "Tracks made in FL Studio, in whatever genre felt right that week.",
}

// Hiking Page
export const HIKING: Page = {
  TITLE: "Trails",
  DESCRIPTION: "Hikes in the Alps, mostly for the photos and the quiet.",
}

// Search Page
export const SEARCH: Page = {
  TITLE: "Search",
  DESCRIPTION: "Search all posts, projects, tracks, and trails by keyword.",
}

// Links
export const LINKS: Links = [
  {
    TEXT: "Home",
    HREF: "/",
  },
  {
    TEXT: "Work",
    HREF: "/work",
  },
  {
    TEXT: "Blog",
    HREF: "/blog",
  },
  {
    TEXT: "Projects",
    HREF: "/projects",
  },
  {
    TEXT: "Music",
    HREF: "/music",
  },
  {
    TEXT: "Trails",
    HREF: "/hiking",
  },
]

// Socials
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
