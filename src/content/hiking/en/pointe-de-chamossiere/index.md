---
title: "Pointe de Chamossière"
summary: "A hike in the Chablais, in the Portes du Soleil."
date: "Aug 22 2026"
draft: false
tags:
  - alps
  - chablais
  - day hike
location: "Chablais, near Morzine and Samoëns (FR)"
elevation: "1,889 m"
distance: "5.4 km"
duration: "1h19"
---

From the top, the panorama opens up fully: Mont Blanc on the skyline, Samoëns and Sixt-Fer-à-Cheval tucked in the valley below, and directly across, the sharp outline of the Pointe des Avoudrues (2,666 m). One of the better payoff-per-effort viewpoints in the Portes du Soleil.

A very easy, well-marked hike. Anyone can do this one, no technical difficulty at all. Park at the Lac de Joux Plane and start from there.

<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
<style>
  #hike-map { height: 420px; }
  /* Match Leaflet's default chrome to the site's own button/border style
     instead of the stock stark-white boxes. */
  #hike-map .leaflet-control-zoom {
    border: none;
    box-shadow: none;
  }
  #hike-map .leaflet-control-zoom a {
    width: 30px;
    height: 30px;
    line-height: 28px;
    border-radius: 8px !important;
    border: 1px solid rgba(11, 15, 19, 0.15);
    background: rgba(238, 243, 244, 0.9);
    color: #0b0f13;
    margin-bottom: 6px;
    box-shadow: none;
  }
  #hike-map .leaflet-control-attribution {
    background: rgba(238, 243, 244, 0.75);
    border-radius: 6px 0 0 0;
    font-size: 10px;
    padding: 1px 6px;
  }
  html.dark #hike-map .leaflet-control-zoom a {
    border-color: rgba(238, 243, 244, 0.2);
    background: rgba(11, 15, 19, 0.85);
    color: #eef3f4;
  }
  html.dark #hike-map .leaflet-control-attribution {
    background: rgba(11, 15, 19, 0.75);
    color: rgba(238, 243, 244, 0.6);
  }
  html.dark #hike-map .leaflet-control-attribution a {
    color: #82c8e0;
  }
  /* A muted, twilight-toned map in dark mode rather than a raw color
     inversion - grayscale first and desaturate after so it stays soft
     instead of garish. */
  html.dark #hike-map .leaflet-tile-pane {
    filter: grayscale(0.3) invert(1) hue-rotate(180deg) brightness(0.92) contrast(0.85) saturate(0.7);
  }
</style>

<div class="p-1.5 rounded-xl border border-black/10 dark:border-white/15 bg-black/[0.02] dark:bg-white/[0.03] shadow-sm">
  <div id="hike-map" class="w-full rounded-lg overflow-hidden"></div>
</div>

<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
<script src="https://unpkg.com/leaflet-gpx@2.2.0/gpx.js"></script>
<script>
  (function () {
    var map = L.map("hike-map", { scrollWheelZoom: false, zoomControl: false });
    L.control.zoom({ position: "topleft" }).addTo(map);

    L.tileLayer("https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png", {
      maxZoom: 17,
      attribution:
        'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
    }).addTo(map);

    new L.GPX("/gpx/pointe-de-chamossiere.gpx", {
      async: true,
      polyline_options: { color: "#3e8ead", weight: 5, opacity: 0.9, lineJoin: "round" },
    })
      .on("loaded", function (e) {
        map.fitBounds(e.target.getBounds(), { padding: [24, 24] });
      })
      .addTo(map);
  })();
</script>

<p class="text-sm text-black/50 dark:text-white/50 mt-8 mb-2">Also tracked on Strava:</p>
<div class="max-w-xs p-1.5 rounded-xl border border-black/10 dark:border-white/15 bg-black/[0.02] dark:bg-white/[0.03]">
  <div class="strava-embed-placeholder" data-embed-type="activity" data-embed-id="19946691739" data-style="standard" data-from-embed="false" data-token="QKN4NWBP6xx_ei6DEUAq5sWVcgZ305_pf3Hx5bjlgGQ"></div>
  <script src="https://strava-embeds.com/embed.js"></script>
</div>
