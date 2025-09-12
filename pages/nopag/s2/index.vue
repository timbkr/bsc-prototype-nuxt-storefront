<script setup lang="ts">

// const isWebhookActive = useState('isWebhookActive')
const products = ref([]);

/** ---------------------------------- GET PRODUCTS ---------------------------------- 
 *                          ----- SSR - Using ProductCache --------
 *  -> Dont fetch products from shopify, instead use local(server) in memory ProductsCache to render page
 *  -> ProductsCache is always kept up to date via Webhook triggers from Shopify 
 * 
    -----------------------------------------------------------------------------------*/

/** ToDo: 
 *  Maybe force full page rerender on every visit to ensure products getting fetched on Server for performance comparison, 
 * now Products are getting fetched first on Server, then after hydration / navigation on client, which is okay too (normal nuxt behaviour)
 */

// const { data: res, error: errorP#roducts, pending: pendingProducts, refresh: refreshProducts } = await useGetAllProducts(PRODUCTS_PER_PAGINATION_FETCH, '');

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
        <ProductsPageLayoutNoPagination :products="products">
            <template #title>S2 - No Clientside Pagination</template>
            <!-- <template #description>
                <p>SSR - Using ProductCache + Webhooks <span>(Status =
                        <span v-if="isWebhookActive" class="bg-green-800">Subscribed)</span>
                        <span v-else class="bg-red-800">NOT Subscribed)</span>
                    </span>
                </p>
            </template>
            <template #collapsibleTitle>More Infos..</template>
            <template #collapsibleContent>
                <span class="bg-green-800">Working: </span>
                <p>- get Products from (in memory) Server-ProductsCache (without fetch to Shopify StorefrontAPI)</p>
                <p>- to render the page on SSR no network call is made instead we utilize Nuxt Direct API Calls to
                    call
                    ProductsCache on Server</p>
                <p>- In Memory (on Server) ProductsCache is managed/always kept up to date via Webhook triggers from
                    Shopify
                </p>
                <p class="bg-red-900"><span class=" bg-red-600">To Fix: </span>Code aufräumen / unnötige Methoden /
                    Snippets
                    entfernen </p>
            </template> -->
        </ProductsPageLayoutNoPagination>
    </div>
</template>

<style scoped></style>