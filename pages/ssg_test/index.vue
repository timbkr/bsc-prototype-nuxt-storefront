<script setup lang="ts">

const PRODUCTS_PER_PAGINATION_FETCH = 250 //250 max
const products = ref([]);

/** ---------------------------------- GET PRODUCTS ---------------------------------- 
 *  ----- RouteRoule: prerender (SSG) - Get Products from Shopify --------
    -----------------------------------------------------------------------------------*/

const { data: res, error: errorProducts, pending: pendingProducts, refresh: refreshProducts } = await useGetAllProducts(PRODUCTS_PER_PAGINATION_FETCH, '');
if (errorProducts.value) {
    console.log("error /products6 = " + errorProducts.value);
} else if (res.value) {
    products.value = res.value as [];
}

</script>

<template>
    <div>
        <ProductsPageLayout :products="products">
            <template #title>Products 6</template>
            <template #description>
                <p>SSG (RouteRoule: prerender)  - Get Products from Shopify</p>
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
            </template>
        </ProductsPageLayout>
    </div>
</template>

<style scoped></style>
