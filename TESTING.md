# Performance-Tests & Methodik

Dieses Dokument beschreibt das Vorgehen zur Evaluierung der Strategien (S1–S4).  

---

## Datengrundlage
Die Tests wurden mit zwei Datensätzen im Shopify-Backend durchgeführt:  
- **250 Produkte** → eine API-Abfrage (keine Pagination notwendig).  
- **511 Produkte** → drei API-Abfragen (API-Pagination: max. 250 Produkte pro Request).  

---

## Postman – Serverseitige Performance
- **1000 Anfragen pro Strategie**.  
- Gemessen: **durchschnittliche Response Time** (Zeit bis vollständiges HTML).  
- **Umgebungen:**
  - Lokal (kontrollierte Umgebung ohne Netzwerkeinflüsse).  
  - Gehostet (Heroku ECO-Dyno).  
- Für beide Datensätze (250 und 511 Produkte).  

---

## WebPageTest – Clientseitige Performance
- **9 Testläufe pro Strategie**.  
- Standort: Frankfurt (Germany).  
- Browser: Chrome.  
- Verbindung: Kabel (5/1 Mbps, 25ms RTT).  
- Ansicht: First View Only.  
- Metriken:
  - **TTFB** (Time to First Byte)  
  - **Start Render**  
  - **FCP** (First Contentful Paint)  
  - **LCP** (Largest Contentful Paint)  
  - **Speed Index**  

---

## Testbedingungen
- Einheitliche Hosting-Umgebung (Heroku ECO-Dyno).  
- Keine parallelen Prozesse oder Nutzerzugriffe.  
- Einheitliche Testeinstellungen bei WebPageTest.  
 **Warenkorbfunktionalität deaktiviert**: Um die Testergebnisse der Strategien nicht zu verfälschen, wurden die clientseitigen GraphQL-Requests des Warenkorbs in der Datei `./app.vue` deaktiviert.

---

## Kombination der Methoden
- **Postman:** Kontrolle der **serverseitigen Performance** (viele Iterationen, statistisch belastbar).  
- **WebPageTest:** Analyse der **Nutzererfahrung** (realistische Client-Sicht).  

Durch diese Kombination lassen sich die Strategien umfassend bewerten.

---

👉 Details zu Ergebnissen siehe [RESULTS.md](./RESULTS.md).