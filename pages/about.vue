<script>

</script>

<template>
  <div class="about-page">
    <h1>About This Project</h1>
    <p>
      This project is a Headless E-Commerce prototype developed as part of my Bachelor's thesis.
      It uses <strong>Nuxt.js</strong> for the frontend and the <strong>Shopify Storefront API</strong> for the backend.
    </p>
    <p>
      The primary goal of this project was to design and evaluate the performance and data freshness of four
      data-fetching strategies for a product listing page. These strategies employed two rendering methods—server-side
      rendering (SSR) and stale-while-revalidate
      (SWR)—along with a local data cache approach (using Webhooks to ensure data freshness), using product data fetched
      from Shopify's backend within a realistic
      e-commerce scenario.
    </p>
    <h2>Data-Fetching Strategies</h2>
    <ul>
      <li><strong>S1:</strong> SSR with direct API requests (Standard)</li>
      <li><strong>S2:</strong> SSR with API data caching and Webhooks (Enhanced)</li>
      <li><strong>S3:</strong> SWR with direct API requests (Standard)</li>
      <li><strong>S4:</strong> SWR with initial cache population, on-demand revalidation, API data caching, and webhooks
        (Enhanced)</li>
    </ul>
    <p>
      Each strategy was evaluated based on performance and data freshness using:
    </p>
    <ul>
      <li>Server-side response times (measured with Postman, 1000 sequential requests, average response time)</li>
      <li>Web performance metrics (measured with WebPageTest, 9 runs per strategy, average values)</li>
    </ul>


    <h2>Evaluation Results</h2>

    <h3>Performance - Most Important Findings</h3>
    <p>
      The most significant improvements from S1 (Standard SSR) to S4 (Enhanced SWR) are:
    </p>
    <ul>
      <li><strong>Time to First Byte (TTFB):</strong> Improved by <strong>117ms</strong>.</li>
      <li><strong>Largest Contentful Paint (LCP):</strong> Reduced by <strong>457ms</strong>, demonstrating faster page
        rendering.</li>
    </ul>

    <p>
      The tests were conducted using two datasets: one with 250 products (single API request) and another with 511
      products
      (three paginated API requests, due to the backend API's limit of 250 products per request). This setup reflects
      realistic
      e-commerce scenarios with varying data sizes.
    </p>

    <div class="diagrams flex">
      <figure>
        <img src="/assets/images/postman-combined.png"
          alt="Diagram showing average server response times from Postman tests" />
        <figcaption>Average server response times from Postman tests (1000 sequential requests)</figcaption>
      </figure>
      <figure>
        <img src="/assets/images/webpagetest-combined.png"
          alt="Diagram showing average web performance metrics from WebPageTest" />
        <figcaption>Average web performance metrics from WebPageTest (9 test runs per strategy)</figcaption>
      </figure>
    </div>

    <h3>Data Freshness</h3>
    <p>
      The data freshness of the strategies was also evaluated. The results show:
    </p>
    <ul>
      <li><strong>S1, S2, and S4:</strong> All strategies delivered fresh data consistently, with S2 and S4 leveraging
        Webhooks to ensure data accuracy.</li>
      <li><strong>S3:</strong> Did not consistently deliver fresh data, highlighting the limitations of a Standard
        SWR-Implementation with direct API
        requests without Webhooks and on-demand revalidation.</li>
    </ul>
    <p>
      These findings confirm that the use of Webhooks in S2 and S4 (as well as on-demand revalidation in S4) works
      correctly to maintain data freshness.
    </p>

    <h2>Conclusion</h2>
    <p>
      The evaluation confirms that optimized data-fetching strategies, particularly the use of caching mechanisms +
      webhooks (S2,
      S4)
      and on-demand revalidation (S4), significantly improve both performance and data freshness in headless e-commerce
      systems.
    </p>
    <p>
      Key recommendations include:
    </p>
    <ul>
      <li><strong>Eliminating API latency:</strong> API caching (S1 → S2) provides the largest performance boost,
        especially for large or paginated datasets.</li>
      <li><strong>Optimizing rendering methods:</strong> SWR with on-demand revalidation (S2 → S4) offers additional
        fine-tuning for performance and scalability.</li>
    </ul>
    <p>
      These improvements are not only technically impactful but also economically relevant, as even small performance
      gains
      (e.g., TTFB >100ms, LCP >450ms) can positively influence conversion rates and revenue in e-commerce.
    </p>
    <p>
      In summary, adopting advanced data-fetching strategies is a practical and effective approach to enhance the
      performance
      and user experience of headless e-commerce platforms.
    </p>

    <h2>Key Features</h2>
    <ul>
      <li>Real-world use case: Product listing page with dynamic data fetching</li>
      <li>Unified HTML and CSS for consistent performance testing</li>
      <li>Focus on caching and rendering optimizations</li>
      <li>Evaluation of four distinct data-fetching strategies (SSR and SWR)</li>
      <li>Integration with Shopify Storefront API for realistic e-commerce scenarios</li>
      <li>Support for paginated API responses (handling datasets with 250+ products)</li>
      <li>Performance testing with Postman (server-side) and WebPageTest (client-side)</li>
      <li>Implementation of Webhooks for real-time data freshness</li>
    </ul>
    
    <h2>Why This Matters</h2>
    <p>
      This project demonstrates the impact of advanced caching and rendering techniques on
      performance and scalability in modern web applications. It highlights the trade-offs
      between data freshness and response times, providing valuable insights for building
      high-performance e-commerce platforms.
    </p>
    <p>
      If you'd like to learn more or discuss this project, feel free to reach out!
    </p>

    <h2>Future Research Opportunities</h2>
    <p>
      This study opens up several avenues for future research, including:
    </p>
    <ul>
      <li><strong>Impact of data size vs. pagination:</strong> Investigating how varying data sizes and pagination
        strategies affect performance and scalability.</li>
      <li><strong>Hybrid approaches:</strong> Exploring server- and client-side optimizations, such as initially
        fetching and delivering products server-side, followed by client-side lazy loading of additional products.</li>
    </ul>
    <p>
      These directions could provide deeper insights into optimizing data-fetching strategies for complex e-commerce
      scenarios.
    </p>
  </div>
</template>



<style scoped>
.about-page {
  padding: 2rem;
  font-family: Arial, sans-serif;
  line-height: 1.6;
}

h1,
h2 {
  color: #333;
}

ul {
  margin: 1rem 0;
  padding-left: 1.5rem;
}

li {
  margin-bottom: 0.5rem;
}
</style>