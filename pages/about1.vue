<template>
  <div class="min-h-screen bg-[rgb(18,10,29)] flex flex-col items-center py-12 px-6">
    <div class="max-w-3xl w-full bg-[rgb(51,65,85)] shadow-lg rounded-2xl p-8">
      <!-- Titel -->
      <h1 class="text-3xl font-bold mb-4 text-center text-white">
        Headless E-Commerce Performance Prototype
      </h1>

      <!-- Intro -->
      <p class="text-white mb-6 text-center">
        Dieses Projekt entstand im Rahmen meiner <strong>Bachelorarbeit</strong>.  
        Es untersucht verschiedene <strong>Datenabfragestrategien</strong> für ein
        Headless-E-Commerce-Frontend mit <strong>Nuxt 3</strong> und der
        <strong>Shopify Storefront API</strong>.
      </p>

      <!-- Features -->
      <h2 class="text-xl font-semibold mb-3 text-white">📌 Features</h2>
      <ul class="list-disc list-inside space-y-1 text-white mb-6">
        <li>Vergleich von SSR & SWR-Strategien</li>
        <li>Caching & Webhooks für schnellere Antwortzeiten</li>
        <li>Performance-Messungen (Postman, WebPageTest)</li>
        <li>Eigene Seite pro Strategie (<code>/s1</code> – <code>/s4</code>)</li>
      </ul>

      <!-- Ergebnisse -->
      <h2 class="text-xl font-semibold mb-3 text-white">📊 Ergebnisse</h2>
      <p class="text-white mb-4">
        Cache-basierte Strategien (S2, S3, S4) verbessern die Ladezeiten deutlich.  
        Webhook-Strategien (S2, S4) sorgen zudem für aktuelle Daten.  
        Die beste Kombination aus Performance und Aktualität bietet <strong>S4</strong>.
      </p>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <img src="/assets/images/postman-combined.png" alt="Performance Chart 1" class="rounded-xl shadow" />
        <img src="/assets/images/webpagetest-combined.png" alt="Performance Chart 2" class="rounded-xl shadow" />
      </div>

      <!-- Tech Stack -->
      <h2 class="text-xl font-semibold mb-3 text-white">🛠️ Tech Stack</h2>
      <ul class="list-disc list-inside space-y-1 text-white mb-6">
        <li>Nuxt 3 + TailwindCSS</li>
        <li>Shopify Storefront API (GraphQL)</li>
        <li>Lighthouse, WebPageTest, Postman</li>
        <li>Deployment: Vercel / Heroku</li>
      </ul>

      <!-- Weiterentwicklung -->
      <h2 class="text-xl font-semibold mb-3 text-white">🔮 Weiterentwicklung</h2>
      <ul class="list-disc list-inside space-y-1 text-white">
        <li>Integration weiterer Shopsysteme</li>
        <li>Vergleich mit anderen Frameworks (Next.js, Remix)</li>
        <li>Hybride Strategien für bessere Performance</li>
      </ul>
    </div>
  </div>
</template>