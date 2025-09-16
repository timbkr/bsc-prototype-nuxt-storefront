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
        <ProductsPageLayout :products="products">
            <template #title>S3</template>
        </ProductsPageLayout>
    </div>
</template>

<style scoped></style>