<script setup lang="ts">


const products = ref([]);

/** ---------------------------------- GET PRODUCTS ---------------------------------- 
 *                          ----- SSR - Using ProductCache --------
 *  -> Dont fetch products from shopify, instead use local(server) in memory ProductsCache to render page
 *  -> ProductsCache is always kept up to date via Webhook triggers from Shopify 
 * 
    -----------------------------------------------------------------------------------*/

/** 
 *  - get Products from (in memory) Server-ProductsCache (without fetch to Shopify StorefrontAPI)
 *  - on SSR no network call is made instead we utilize Nuxt Direct API Calls (see: https://nuxt.com/docs/guide/concepts/server-engine#direct-api-calls)
 * */

const { data: res, error: errorProducts, pending: pendingProducts, refresh: refreshProducts } = await useFetch('/api/getAllCachedProducts');
if (errorProducts.value) {
    console.log("/s2 = " + errorProducts.value);
} else if (res.value) {
    products.value = res.value as [];
}
</script>

<template>
    <div>
        <ProductsPageLayout :products="products">
            <template #title>S2</template>

        </ProductsPageLayout>
    </div>
</template>

<style scoped></style>