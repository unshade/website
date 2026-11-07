// Click-to-load for third-party embeds (Spotify, SoundCloud, Strava...).
//
// Markup, written in the markdown:
//   <div class="consent-embed" data-provider="Spotify">
//     <template><iframe src="https://open.spotify.com/..."></iframe></template>
//   </div>
//
// Nothing inside <template> is loaded until the visitor clicks, so no request
// (and no cookie) reaches the provider before they agree. "Always load"
// remembers the choice per provider in localStorage; the privacy page can
// reset it. Also drives the analytics opt-out on that page.
;(function () {
  var PREFIX = "consent:"
  var UMAMI_OPT_OUT = "umami.disabled" // read by the Umami tracker itself

  var STRINGS = {
    en: {
      notice: "This {provider} content is hosted by {provider}. Loading it sends your IP address to {provider}, which may also set cookies.",
      load: "Load",
      always: "Always load {provider}",
      privacy: "Privacy policy",
      privacyHref: "/legal/privacy/",
      reset: "Forget my choices for embedded content",
      resetDone: "Done - embedded content will ask again.",
      resetNone: "No choices saved for embedded content.",
      counted: "Your visits are counted in the anonymous statistics.",
      notCounted: "Your visits are not counted in the statistics (on this browser).",
      optOut: "Don't count my visits",
      optIn: "Count my visits again",
    },
    fr: {
      notice: "Ce contenu {provider} est hébergé par {provider}. Le charger envoie votre adresse IP à {provider}, qui peut aussi déposer des cookies.",
      load: "Charger",
      always: "Toujours charger {provider}",
      privacy: "Politique de confidentialité",
      privacyHref: "/fr/legal/privacy/",
      reset: "Oublier mes choix pour les contenus intégrés",
      resetDone: "C'est fait - les contenus intégrés redemanderont.",
      resetNone: "Aucun choix enregistré pour les contenus intégrés.",
      counted: "Vos visites sont comptées dans les statistiques anonymes.",
      notCounted: "Vos visites ne sont pas comptées dans les statistiques (sur ce navigateur).",
      optOut: "Ne pas compter mes visites",
      optIn: "Compter à nouveau mes visites",
    },
  }

  function strings() {
    return STRINGS[document.documentElement.lang === "fr" ? "fr" : "en"]
  }

  function fill(text, provider) {
    return text.split("{provider}").join(provider)
  }

  // localStorage can throw (private mode, blocked storage) - treat as empty.
  function store(action, key, value) {
    try {
      if (action === "get") return localStorage.getItem(key)
      if (action === "set") localStorage.setItem(key, value)
      if (action === "remove") localStorage.removeItem(key)
    } catch (e) {
      return null
    }
    return null
  }

  function load(box) {
    var template = box.querySelector("template")
    if (!template) return
    var content = template.content.cloneNode(true)
    // Scripts cloned from a <template> don't run; recreate them so they do.
    content.querySelectorAll("script").forEach(function (old) {
      var script = document.createElement("script")
      for (var i = 0; i < old.attributes.length; i++) {
        script.setAttribute(old.attributes[i].name, old.attributes[i].value)
      }
      script.text = old.text
      old.replaceWith(script)
    })
    box.replaceWith(content)
  }

  function button(label, className, onClick) {
    var el = document.createElement("button")
    el.type = "button"
    el.className = className
    el.textContent = label
    el.addEventListener("click", onClick)
    return el
  }

  function setupEmbed(box) {
    if (box.dataset.ready) return
    box.dataset.ready = "1"
    var provider = box.dataset.provider || "?"

    if (store("get", PREFIX + provider) === "granted") {
      load(box)
      return
    }

    // Reserve roughly the player's height so the page doesn't jump on load.
    var frame = box.querySelector("template").content.querySelector("iframe")
    if (frame && frame.getAttribute("height")) {
      box.style.minHeight = frame.getAttribute("height") + "px"
    }

    var s = strings()
    var notice = document.createElement("p")
    notice.className = "consent-embed-notice"
    notice.textContent = fill(s.notice, provider) + " "
    var link = document.createElement("a")
    link.href = s.privacyHref
    link.textContent = s.privacy
    notice.appendChild(link)

    var actions = document.createElement("div")
    actions.className = "consent-embed-actions"
    actions.appendChild(button(s.load, "consent-btn consent-btn-primary", function () {
      load(box)
    }))
    actions.appendChild(button(fill(s.always, provider), "consent-btn", function () {
      store("set", PREFIX + provider, "granted")
      // Load every embed from this provider on the page, not just this one.
      document.querySelectorAll('.consent-embed[data-provider="' + provider + '"]').forEach(load)
    }))

    box.appendChild(notice)
    box.appendChild(actions)
  }

  // <div data-privacy-controls></div> on the privacy page.
  function setupControls(container) {
    if (container.dataset.ready) return
    container.dataset.ready = "1"
    var s = strings()

    var status = document.createElement("p")
    var toggle = button("", "consent-btn consent-btn-primary", function () {
      if (store("get", UMAMI_OPT_OUT)) store("remove", UMAMI_OPT_OUT)
      else store("set", UMAMI_OPT_OUT, "1")
      render()
    })
    function render() {
      var optedOut = !!store("get", UMAMI_OPT_OUT)
      status.textContent = optedOut ? s.notCounted : s.counted
      toggle.textContent = optedOut ? s.optIn : s.optOut
    }
    render()

    var resetStatus = document.createElement("p")
    var reset = button(s.reset, "consent-btn", function () {
      var keys = []
      try {
        for (var i = 0; i < localStorage.length; i++) {
          var key = localStorage.key(i)
          if (key && key.indexOf(PREFIX) === 0) keys.push(key)
        }
      } catch (e) {}
      keys.forEach(function (key) { store("remove", key) })
      resetStatus.textContent = keys.length ? s.resetDone : s.resetNone
    })

    var actions = document.createElement("div")
    actions.className = "consent-embed-actions"
    actions.appendChild(toggle)
    actions.appendChild(reset)

    container.appendChild(status)
    container.appendChild(actions)
    container.appendChild(resetStatus)
  }

  function init() {
    document.querySelectorAll(".consent-embed").forEach(setupEmbed)
    document.querySelectorAll("[data-privacy-controls]").forEach(setupControls)
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init)
  else init()
  document.addEventListener("astro:after-swap", init)
})()
