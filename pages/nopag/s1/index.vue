<script setup lang="ts">

const PRODUCTS_PER_PAGINATION_FETCH = 250 //250 max
const products = ref([]);

/** ---------------------------------- GET PRODUCTS ---------------------------------- 
 *  ----- Get ALL Products from Shopify (on every Request) --------
    -----------------------------------------------------------------------------------*/

/** ToDo: 
 *  Maybe force full page rerender on every visit to ensure products getting fetched on Server for performance comparison, 
 * now Products are getting fetched first on Server, then after hydration / navigation on client, which is okay too (normal nuxt behaviour)
 */

const { data: res, error: errorProducts, pending: pendingProducts, refresh: refreshProducts } = await useGetAllProducts(PRODUCTS_PER_PAGINATION_FETCH, '');
if (errorProducts.value) {
    console.log("error /s1 = " + errorProducts.value);
} else if (res.value) {
    products.value = res.value as [];
}

</script>

<template>
    <div>
        <ProductsPageLayoutNoPagination :products="products">
            <template #title>S1 - No Clientside Pagination</template>
            <!-- <template #description>
                <p>SSR - Fetch ALL Products from Shopify on every Request</p>
            </template>
            <template #collapsibleTitle>More Infos..</template>
            <template #collapsibleContent>
                <p><span class="bg-green-800">Working:</span>Fetche bei jedem Request alle Produkte auf Server,
                    PaginationNavigation dann auf
                    Client</p>
                <p>Right Now: fetche 250 per Request until all fetched</p>
                <p class="bg-red-900"><span class=" bg-red-600">To Fix: </span>Code aufräumen / unnötige Methoden /
                    Snippets
                    entfernen </p>
                <p class="bg-red-900"><span class=" bg-red-600">To Fix: </span>Bei Client Navigation, erst
                    navigieren nach
                    verändern der Bilder </p>
            </template> -->
        </ProductsPageLayoutNoPagination>
    </div>
</template>

<style scoped></style>
