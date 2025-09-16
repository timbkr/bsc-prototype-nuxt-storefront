<template>
    <div class="min-h-screen bg-[rgb(18,10,29)] flex flex-col items-center py-12 px-6">
        <div class="max-w-4xl w-full bg-[rgb(51,65,85)] shadow-lg rounded-2xl p-8">
            <!-- Header -->
            <div class="text-center mb-8">
                <h1 class="text-4xl font-bold mb-4 text-white">
                    Headless E-Commerce Performance-Prototyp
                </h1>
                <p class="text-xl text-gray-200 mb-4">
                    Dieses Projekt entstand im Rahmen meiner Bachelorarbeit in Informatik
                </p>
                <p class="text-gray-300">
                    Konzeptionierung und Evaluierung von vier verschiedenen <strong>Datenabfragestrategien</strong> in
                    einem Headless-E-Commerce-Prototyp mit Fokus auf <strong>Performance-Optimierung</strong> und
                    <strong>Datenaktualität</strong>
                </p>
            </div>
            <!-- Tech Stack & Methodik -->
            <div class="mb-8">
                <h2 class="text-2xl font-semibold mb-4 text-white">🛠️ Tech Stack & Methodik</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="bg-[rgb(30,41,59)] p-6 rounded-xl">
                        <h3 class="text-lg font-semibold text-white mb-3">Technologien</h3>
                        <ul class="space-y-2 text-gray-200">
                            <li class="flex items-center">
                                <span class="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                                Nuxt 3 + TailwindCSS
                            </li>
                            <li class="flex items-center">
                                <span class="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                                Shopify Storefront API (GraphQL)
                            </li>
                            <li class="flex items-center">
                                <span class="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                                Google Cloud Run
                            </li>
                        </ul>
                    </div>
                    <div class="bg-[rgb(30,41,59)] p-6 rounded-xl">
                        <h3 class="text-lg font-semibold text-white mb-3">Testing & Evaluation</h3>
                        <ul class="space-y-2 text-gray-200">
                            <li class="flex items-start">
                                <span class="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                                Postman (1000 sequenzielle Requests)
                            </li>
                            <li class="flex items-start">
                                <span class="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                                WebPageTest (9 Runs pro Strategie)
                            </li>
                            <li class="flex items-start">
                                <span class="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                                Realistische Datensätze (250-511 Produkte, Paginierte Abfragen)
                            </li>
                        </ul>
                    </div>
                </div>
                <p class="text-gray-200 mt-6">
                    Jede der vier Strategien implementiert eine einzigartige Kombination aus Rendering-Methoden und
                    Caching-Mechanismen, um die Einflüsse auf Performance und Datenaktualität zu untersuchen.
                </p>
            </div>
            <!-- Strategies -->
            <div class="mb-8">
                <h2 class="text-2xl font-semibold mb-4 text-white">📋 Die vier evaluierten Strategien</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="bg-[rgb(30,41,59)] p-5 rounded-xl">
                        <h3 class="text-lg font-semibold text-white mb-2">S1 (Standard SSR)</h3>
                        <p class="text-gray-300 text-sm">Direkte API-Abfrage bei jedem Seitenaufruf</p>
                    </div>
                    <div class="bg-[rgb(30,41,59)] p-5 rounded-xl">
                        <h3 class="text-lg font-semibold text-white mb-2">S2 (Enhanced SSR)</h3>
                        <p class="text-gray-300 text-sm">Server-Side Rendering mit lokalem API-Daten-Cache und Webhooks
                            zur Aktualisierung</p>
                    </div>
                    <div class="bg-[rgb(30,41,59)] p-5 rounded-xl">
                        <h3 class="text-lg font-semibold text-white mb-2">S3 (Standard SWR)</h3>
                        <p class="text-gray-300 text-sm">Stale-While-Revalidate für schnelle Auslieferung</p>
                    </div>
                    <div class="bg-[rgb(30,41,59)] p-5 rounded-xl border-2 border-green-500">
                        <h3 class="text-lg font-semibold text-white mb-2">S4 (Enhanced SWR)</h3>
                        <p class="text-gray-300 text-sm">Erweiterte SWR-Strategie mit Webhooks und
                            On-demand-Revalidation für garantierte Datenaktualität</p>
                        <span class="inline-block mt-2 px-2 py-1 bg-green-600 text-white text-xs rounded-full">Beste
                            Performance</span>
                    </div>
                </div>
            </div>
            <!-- Key Results -->
            <div class="mb-8">
                <h2 class="text-2xl font-semibold mb-4 text-white">📊 Wichtigste Erkenntnisse</h2>
                <div class="bg-[rgb(30,41,59)] p-6 rounded-xl">
                    <p class="text-gray-200 mb-6">
                        Die systematischen Messungen mit <strong>WebPageTest</strong> und <strong>Postman</strong>
                        zeigten, dass optimierte Strategien die Performance signifikant verbessern.
                    </p>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div class="text-center">
                            <div class="text-4xl font-bold text-green-400 mb-2">-457ms</div>
                            <div class="text-gray-300">Largest Contentful Paint (LCP)</div>
                            <div class="text-gray-400 text-sm">Verbesserung von S1 auf S4</div>
                        </div>
                        <div class="text-center">
                            <div class="text-4xl font-bold text-green-400 mb-2">-117ms</div>
                            <div class="text-gray-300">Time to First Byte (TTFB)</div>
                            <div class="text-gray-400 text-sm">Verbesserung von S1 auf S4</div>
                        </div>
                    </div>

                    <div class="bg-[rgb(18,10,29)] p-4 rounded-xl border-l-4 border-green-500 mb-4">
                        <p class="text-green-200">
                            Die Integration von Webhooks eliminierte das Risiko veralteter Daten, das bei einfachen
                            Caching-Ansätzen besteht.
                        </p>
                    </div>

                    <div class="bg-[rgb(18,10,29)] p-4 rounded-xl border-l-4 border-yellow-500">
                        <p class="text-yellow-200 font-semibold">
                            💡 <strong>Schlüssel-Erkenntnis:</strong> Der größte Performance-Gewinn resultiert aus der
                            Eliminierung der API-Latenz durch Caching. Die Wahl der Rendering-Methode (SSR vs. SWR) hat
                            einen geringeren Einfluss.
                        </p>
                    </div>
                </div>
            </div>
            <!-- GitHub Link -->
            <div class="text-center bg-gradient-to-r from-purple-600 to-blue-600 p-6 rounded-xl">
                <h2 class="text-2xl font-semibold text-white mb-3">Vollständige Dokumentation</h2>
                <p class="text-gray-200 mb-4">
                    Das vollständige Projekt mit detaillierter technischer Dokumentation, Code und allen Messergebnissen
                    befindet sich auf GitHub.
                </p>
                <a href="https://github.com/timbkr/bsc-prototype-nuxt-storefront" target="_blank"
                    class="transition-colors border-2 border-red-500 hover:border-orange-500 inline-block bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-lg transition-colors">
                    <div class="flex items-center">
                        <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                            <path
                                d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                        <span>Zum GitHub Repository</span>
                    </div>
                </a>
            </div>
        </div>
    </div>
</template>