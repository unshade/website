export const languages = {
  en: "English",
  fr: "Français",
} as const

export type Lang = keyof typeof languages

export const defaultLang: Lang = "en"

/** Canonical (English) path -> locale-prefixed path. English stays
 * unprefixed at the root; every other locale gets a /{lang} prefix. */
export function localizePath(lang: Lang, path: string): string {
  if (lang === defaultLang) return path
  return path === "/" ? `/${lang}` : `/${lang}${path}`
}

/** Reverse of localizePath - reads the locale off a request URL. */
export function getLangFromUrl(url: URL): Lang {
  const [, maybeLang] = url.pathname.split("/")
  if (maybeLang && maybeLang in languages) return maybeLang as Lang
  return defaultLang
}

/** Astro.currentLocale is typed as `string | undefined` - narrow it down
 * to our actual Lang union so it can flow into typed helpers below. */
export function getCurrentLang(currentLocale: string | undefined): Lang {
  return currentLocale === "fr" ? "fr" : defaultLang
}

/** Strip a content-collection slug's leading "en/" / "fr/" segment,
 * e.g. "en/my-post" -> "my-post". Collections are organized as
 * <collection>/<lang>/<real-slug> so a single collection can hold both
 * translations side by side. */
export function unlocalizeSlug(slug: string): string {
  return slug.replace(/^(en|fr)\//, "")
}

export const ui = {
  en: {
    "nav.home": "Home",
    "nav.work": "Work",
    "nav.blog": "Blog",
    "nav.projects": "Projects",
    "nav.music": "Music",
    "nav.trails": "Trails",
    "nav.search": "Search",

    "site.description":
      "Software engineer working in cloud infrastructure. Also making tracks in FL Studio and chasing ridgelines in the Alps.",

    "page.work.title": "Work",
    "page.work.description": "Places I have worked.",
    "page.blog.title": "Blog",
    "page.blog.description": "Writing on topics I am passionate about.",
    "page.projects.title": "Projects",
    "page.projects.description": "Recent projects I have worked on.",
    "page.music.title": "Music",
    "page.music.description": "Tracks made in FL Studio, in whatever genre felt right that week.",
    "page.hiking.title": "Trails",
    "page.hiking.description": "Hikes in the Alps, mostly for the photos and the quiet.",
    "page.search.title": "Search",
    "page.search.description": "Search all posts, projects, tracks, and trails by keyword.",

    "hero.whoami": "whoami",
    "hero.role": "Software Engineer @ Infomaniak | The Ethical Cloud 🇨🇭",
    "hero.pillar.infra": "infra & go",
    "hero.pillar.music": "FL Studio",
    "hero.pillar.trails": "alpine trails",
    "hero.cta.blog": "Read my blog",
    "hero.cta.work": "View my work",

    "home.about.p1":
      "I'm a <b><i>Software Engineer</i></b> specialized in cloud infrastructure. I currently work at <b><i>Infomaniak | The Ethical Cloud 🇨🇭</i></b>, building Kubernetes operators, Terraform/OpenTofu providers, and Go microservices for cloud-native systems that try to stay both reliable and honest about how they handle your data.",
    "home.about.p2":
      "Most of my day is <b><i>Go</i></b>, <b><i>Kubernetes</i></b>, and infrastructure as code, the kind of work where the win condition is \"nobody noticed anything happened.\" I like systems that are boring in production and interesting to build.",
    "home.about.p3.pre":
      "Outside of a terminal, I'm usually in one of two places: FL Studio, layering synths and field recordings into whatever genre I'm currently obsessed with, or somewhere above 2,000 meters in the Alps with a camera, chasing a ridgeline before the light changes. Both ended up with their own sections on this site, see",
    "home.about.p3.and": "and",
    "home.about.p4":
      "This blog is where the three overlap: infra write-ups, project notes, the occasional track, and trip reports from wherever I hiked last.",

    "home.recentPosts": "/recent_posts",
    "home.allPosts": "All posts",
    "home.recentTracks": "/recent_tracks",
    "home.allTracks": "All tracks",
    "home.recentProjects": "/recent_projects",
    "home.allProjects": "All projects",
    "home.recentTrails": "/recent_trails",
    "home.allTrails": "All trails",

    "home.builtWith": "/built_with",
    "home.builtWithNote": "Performing reactivity and statefulness, special guest",

    "home.connect": "/lets_connect",
    "home.connectNote": "Reach out to me via email or on social media.",

    "footer.allSystemsNormal": "all systems normal",
    "footer.terms": "Terms",
    "footer.privacy": "Privacy",
    "footer.rights": "All rights reserved",
    "footer.backToTop": "Back to top",

    "search.placeholder": "What are you looking for?",
    "search.placeholder.posts": "Search posts",
    "search.placeholder.projects": "Search projects",
    "search.placeholder.tracks": "Search tracks",
    "search.placeholder.trails": "Search trails",
    "search.foundFor": "Found {n} results for '{q}'",
    "search.tags": "Tags",
    "search.showing": "SHOWING {n} OF {total} {name}",
    "search.ascending": "ASCENDING",
    "search.descending": "DESCENDING",
    "search.name.posts": "posts",
    "search.name.projects": "projects",
    "search.name.tracks": "tracks",
    "search.name.trails": "trails",

    "article.backTo": "Back to",
    "article.prev": "Prev",
    "article.next": "Next",
    "article.readingTime": "{n} min read",
    "article.demo": "See Demo",
    "article.repo": "See Repository",
    "article.listen": "Listen to the track",
    "article.watch": "Watch the video",

    "pill.blog": "post",
    "pill.projects": "project",
    "pill.music": "track",
    "pill.hiking": "trail",

    "music.listenOn": "Listen on",

    "work.section.experience": "/experience",
    "work.section.education": "/education",
    "work.date.present": "Present",

    "legal.lastUpdated": "Last updated:",

    "lang.switch": "FR",
  },
  fr: {
    "nav.home": "Accueil",
    "nav.work": "Parcours",
    "nav.blog": "Blog",
    "nav.projects": "Projets",
    "nav.music": "Musique",
    "nav.trails": "Rando",
    "nav.search": "Recherche",

    "site.description":
      "Ingénieur logiciel dans l'infrastructure cloud. Je fais aussi des morceaux sur FL Studio et je cours les crêtes des Alpes.",

    "page.work.title": "Parcours",
    "page.work.description": "Les endroits où j'ai travaillé.",
    "page.blog.title": "Blog",
    "page.blog.description": "J'écris sur ce qui me passionne.",
    "page.projects.title": "Projets",
    "page.projects.description": "Mes projets récents.",
    "page.music.title": "Musique",
    "page.music.description": "Des morceaux faits sur FL Studio, dans le genre qui me tentait cette semaine-là.",
    "page.hiking.title": "Rando",
    "page.hiking.description": "Des randos dans les Alpes, surtout pour les photos et le calme.",
    "page.search.title": "Recherche",
    "page.search.description": "Cherchez parmi les articles, projets, morceaux et randos par mot-clé.",

    "hero.whoami": "whoami",
    "hero.role": "Ingénieur logiciel @ Infomaniak | The Ethical Cloud 🇨🇭",
    "hero.pillar.infra": "infra & go",
    "hero.pillar.music": "FL Studio",
    "hero.pillar.trails": "rando alpine",
    "hero.cta.blog": "Lire mon blog",
    "hero.cta.work": "Voir mon parcours",

    "home.about.p1":
      "Je suis <b><i>ingénieur logiciel</i></b>, spécialisé en infrastructure cloud. Je travaille actuellement chez <b><i>Infomaniak | The Ethical Cloud 🇨🇭</i></b>, où je construis des opérateurs Kubernetes, des providers Terraform/OpenTofu et des microservices Go pour des systèmes cloud-native censés rester à la fois fiables et honnêtes sur la façon dont ils traitent vos données.",
    "home.about.p2":
      "L'essentiel de mes journées, c'est du <b><i>Go</i></b>, du <b><i>Kubernetes</i></b> et de l'infrastructure as code : le genre de travail où la victoire, c'est que « personne n'a rien remarqué ». J'aime les systèmes ennuyeux en production et intéressants à construire.",
    "home.about.p3.pre":
      "En dehors d'un terminal, je suis généralement dans un de ces deux endroits : sur FL Studio, à empiler des synthés et des field recordings dans le genre musical qui m'obsède du moment, ou à plus de 2 000 mètres dans les Alpes avec un appareil photo, à courir après une crête avant que la lumière change. Les deux ont fini par avoir leur propre section sur ce site, voir",
    "home.about.p3.and": "et",
    "home.about.p4":
      "Ce blog, c'est là où les trois se rejoignent : des articles sur l'infra, des notes de projets, un morceau de temps en temps, et des comptes-rendus de la dernière rando en date.",

    "home.recentPosts": "/articles_recents",
    "home.allPosts": "Tous les articles",
    "home.recentTracks": "/morceaux_recents",
    "home.allTracks": "Tous les morceaux",
    "home.recentProjects": "/projets_recents",
    "home.allProjects": "Tous les projets",
    "home.recentTrails": "/randos_recentes",
    "home.allTrails": "Toutes les randos",

    "home.builtWith": "/construit_avec",
    "home.builtWithNote": "Pour la réactivité et la gestion d'état, invité spécial",

    "home.connect": "/me_contacter",
    "home.connectNote": "Contactez-moi par e-mail ou sur les réseaux sociaux.",

    "footer.allSystemsNormal": "tous les systèmes sont normaux",
    "footer.terms": "Conditions",
    "footer.privacy": "Confidentialité",
    "footer.rights": "Tous droits réservés",
    "footer.backToTop": "Retour en haut",

    "search.placeholder": "Que cherchez-vous ?",
    "search.placeholder.posts": "Chercher un article",
    "search.placeholder.projects": "Chercher un projet",
    "search.placeholder.tracks": "Chercher un morceau",
    "search.placeholder.trails": "Chercher une rando",
    "search.foundFor": "{n} résultats trouvés pour « {q} »",
    "search.tags": "Tags",
    "search.showing": "{n} SUR {total} {name} AFFICHÉS",
    "search.ascending": "CROISSANT",
    "search.descending": "DÉCROISSANT",
    "search.name.posts": "articles",
    "search.name.projects": "projets",
    "search.name.tracks": "morceaux",
    "search.name.trails": "randos",

    "article.backTo": "Retour à",
    "article.prev": "Précédent",
    "article.next": "Suivant",
    "article.readingTime": "{n} min de lecture",
    "article.demo": "Voir la démo",
    "article.repo": "Voir le dépôt",
    "article.listen": "Écouter le morceau",
    "article.watch": "Voir la vidéo",

    "pill.blog": "article",
    "pill.projects": "projet",
    "pill.music": "morceau",
    "pill.hiking": "rando",

    "music.listenOn": "Écouter sur",

    "work.section.experience": "/experience",
    "work.section.education": "/formation",
    "work.date.present": "Aujourd'hui",

    "legal.lastUpdated": "Dernière mise à jour :",

    "lang.switch": "EN",
  },
} as const

export function useTranslations(lang: Lang) {
  return function t(key: keyof (typeof ui)[typeof defaultLang], vars?: Record<string, string | number>): string {
    let str: string = ui[lang][key] ?? ui[defaultLang][key]
    if (vars) {
      for (const [k, v] of Object.entries(vars)) {
        str = str.replace(`{${k}}`, String(v))
      }
    }
    return str
  }
}
