<script setup lang="ts">

const PRODUCTS_PER_PAGINATION_FETCH = 250 //250 max
const products = ref([]);

/** ---------------------------------- GET PRODUCTS ---------------------------------- 
 *                          ----- SWR fetch from shopify --------
 * Stale While Revalidate (revalidate in background and send updated content with next response)
 * configured in nuxt.config.ts - routeRoules -> '/products4': { swr: true }
    -----------------------------------------------------------------------------------*/

const { data: res, error: errorProducts, pending: pendingProducts, refresh: refreshProducts } = await useGetAllProducts(PRODUCTS_PER_PAGINATION_FETCH, '');
if (errorProducts.value) {
    console.log("/s3 = " + errorProducts.value);
} else if (res.value) {
    products.value = res.value as [];
}

</script>

<template>
    <div>
        <ProductsPageLayoutNoPagination :products="products">
            <template #title>S3 - NoPag</template>
            <!-- <template #description>
                <p>SWR - fetch from shopify</p>
            </template>
            <template #collapsibleTitle>More Infos..</template>
            <template #collapsibleContent>
                <span class="bg-green-800">Working: </span>
                <p>* Stale While Revalidate (revalidate in background and send updated content with next response)
                </p>
                <p><span class="bg-green-800">Right Now:</span>Fetche bei jedem Request alle Produkte auf Server,
                    PaginationNavigation dann auf
                    Client</p>
                <p>Right Now: fetche 250 per Request until all fetched</p>
                <p class="bg-red-900"><span class=" bg-red-600">To Fix: </span>Code aufräumen / unnötige Methoden /
                    Snippets
                    entfernen </p>
            </template> -->
        </ProductsPageLayoutNoPagination>
    </div>
</template>

<style scoped></style>