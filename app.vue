<script setup lang="ts">
import '~/assets/css/main.css'

const cartLocal = useCartLocalState();

// needed if we use <a> instead of nuxtLink (to force SSR even on subsequent navigation)
const pageActive = useState('pageActive', () => 'products');

if (process.client) {
  // turned off for performance-testing of the individual strategies s1-s4 (to prevent clienside graphql request)
  initializeCart();
}

const isWebhookActive = useState('isWebhookActive', () => false);
if (process.server) {
  // to ensure it only gets called via nuxt server direct api call (direct function call, no network request)
  const { data } = await useFetch('/api/webhook/getStatus');
  isWebhookActive.value = data.value ?? false;
  console.log("isWebhookActive = " + isWebhookActive.value);
}

</script>

<template>
  <div id="app">
    <header class="bg-slate-700 z-50 rounded-b-md">
      <nav class="header-grid">
        <div class="nav-left flex justify-end items-center gap-8">
          <nuxt-link to="/s1" class="navLink">S1</nuxt-link>
          <nuxt-link to="/s2" class="navLink">S2</nuxt-link>
          <nuxt-link to="/s3" class="navLink">S3</nuxt-link>
          <nuxt-link to="/s4" class="navLink">S4</nuxt-link>
        </div>
        <div class="nav-mid navbarHeight">
          <img alt="Nuxt logo" class="logo" src="/nuxt-icon-green.svg" width="45" height="45" />
        </div>
        <div class="nav-right flex items-center justify-between gap-8">
          <div class="wrapper">
            <nuxt-link to="/about" class="navLink">About</nuxt-link>
          </div>
          <div class="wrapper">
            <nuxt-link to="/cart" class="navLink cartAnchor">
              <span class="cartLink">Cart</span>
              <ClientOnly>
                <span class="cartQuantity">{{ cartLocal?.hasOwnProperty('id') ? cartLocal.totalQuantity : 0 }}</span>
                <template #fallback>
                  <span class="cartQuantity">0</span>
                </template>
              </ClientOnly>
            </nuxt-link>
          </div>
        </div>
      </nav>
    </header>
    <main>
      <NuxtLoadingIndicator></NuxtLoadingIndicator>
      <NuxtPage class="myContainer"></NuxtPage>
    </main>
    <footer class="text-center">Made with ❤️ by Tim Becker | {{ new Date().getFullYear() }}</footer>
  </div>
</template>

<style scoped>
.cartQuantity {
  display: inline-block;
  text-align: center;
  background-color: black;
  border-radius: 48px;
  padding: 0.1rem 0.5rem;

  position: relative;
  bottom: 10px;
  right: 1px;
  min-width: 32px;
}

.navLink {
  border-radius: 0.5rem;
  padding: 1rem 0.625rem;
}

.navLink:hover {
  background-color: #461e25;
}

.navLink:active {
  outline: none;
}

/* prevent sticky hover on mobile (not needed, just remove bg color on .router-link-active:hover) */
@media (hover: none) {
  .navLink:hover {
    background-color: transparent;
  }
}

.router-link-active {
  color: var(--color-text-active);
}

.header-grid {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 0rem;
  justify-content: stretch;
  padding: 0 5%;
}

.navbarHeight {
  height: 4rem;
}

.nav-mid {
  display: flex;
  align-items: center;
  padding: 0 1.25rem;
}

.nav-left,
.nav-right {
  gap: 0;
}

@media (min-width: 768px) {

  .logo {
    width: 75px;
  }

  .header-grid {
    gap: 2rem;
    padding: 1rem 5%;
  }
}

@media (min-width: 1024px) {}

/* css for responsive Cart Quantity Batch */
@media (max-width: 456px) {
  .header-grid {
    padding: 0 0;
  }

  .nav-mid {
    padding: 0;
  }

  .nav-left {
    justify-content: center;
  }

  .nav-right {
    justify-content: space-around;
  }

  .cartLink {
    padding-right: 22px;
  }

  .cartQuantity {
    position: absolute;
  }

  .cartAnchor {
    padding: 0;
  }
}

@media (max-width: 340px) {
  .header-grid {
    padding: 0 5%;
  }

  .cartLink {
    display: none;
  }

  .cartQuantity {
    position: initial;
  }

  .navLink {
    padding: 0;
  }
}
</style>