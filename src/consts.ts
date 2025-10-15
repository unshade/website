import type { Site, Page, Links, Socials } from "@types"

// Global
export const SITE: Site = {
  TITLE: "Noé Steiner",
  DESCRIPTION: "Welcome to Noé Steiner's portfolio and blog.",
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

// Search Page
export const SEARCH: Page = {
  TITLE: "Search",
  DESCRIPTION: "Search all posts and projects by keyword.",
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

