<script setup lang="ts">

const isWebhookActive = useState('isWebhookActive')
const products = ref([]);

/** ---------------------------------- GET PRODUCTS ---------------------------------- 
 *  ----- SWR + onDemand-Regeneration - Using ProductCache + Webhooks   --------
 * 
 *   ---> configured in nuxt.config.ts -> routeRoules
    -----------------------------------------------------------------------------------*/

/** 
 *  - get Products from (in memory) Server-ProductsCache (without fetch to Shopify StorefrontAPI)
 *  - on SSR no network call is made instead we utilize Nuxt Direct API Calls (see: https://nuxt.com/docs/guide/concepts/server-engine#direct-api-calls)
 * */

const { data: res, error: errorProducts, pending: pendingProducts, refresh: refreshProducts } = await useFetch('/api/getAllCachedProducts');
if (errorProducts.value) {
    console.log("/s4 = " + errorProducts.value);
} else if (res.value) {
    products.value = res.value as [];
}
</script>

<template>
    <div>
        <ProductsPageLayout :products="products">
            <template #title>S4</template>
        </ProductsPageLayout>
    </div>
</template>

<style scoped></style>