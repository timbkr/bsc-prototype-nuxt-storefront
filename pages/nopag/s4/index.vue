<script setup lang="ts">

// const isWebhookActive = useState('isWebhookActive')
const products = ref([]);

/** ---------------------------------- GET PRODUCTS ---------------------------------- 
 *  ----- SWR + onDemand-Regeneration - Using ProductCache + Webhooks   --------
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
        <ProductsPageLayoutNoPagination :products="products">
            <template #title>S4 - No Clientside Pagination</template>
            <!-- <template #description>
                <p>SWR + initial cache fill + On-Demand-Revalidation - Using ProductCache + Webhooks <span>(Status =
                        <span v-if="isWebhookActive" class="bg-green-800">Subscribed)</span>
                        <span v-else class="bg-red-800">NOT Subscribed)</span>
                    </span></p>
            </template>
            <template #collapsibleTitle>More Infos..</template>
            <template #collapsibleContent>
                <span class="bg-green-800">Working: </span>
                <p>Cached with SWR</p>
                <p>kept up to date via onDemand-Revalidation (trigger manuall revalidate on webhook trigger (on demand
                    swr))</p>
                <p>- get Products from (in memory) Server-ProductsCache (without fetch to Shopify StorefrontAPI)</p>
                <p>- to render the page no network call is made instead we utilize Nuxt Direct API Calls to call
                    ProductsCache on Server</p>
                <p>- In Memory (on Server) ProductsCache is managed/always kept up to date via Webhook triggers from
                    Shopify</p>
                <p class="bg-red-900"><span class=" bg-red-600">To Fix: </span>Code aufräumen / unnötige
                    Methoden /
                    Snippets
                    entfernen </p>
            </template> -->
        </ProductsPageLayoutNoPagination>
    </div>
</template>

<style scoped></style>