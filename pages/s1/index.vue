<script setup lang="ts">

const PRODUCTS_PER_PAGINATION_FETCH = 250 //250 max
const products = ref([]);

/** ---------------------------------- GET PRODUCTS ---------------------------------- 
 *  ----- Get ALL Products from Shopify (on every Request) --------
    -----------------------------------------------------------------------------------*/


const { data: res, error: errorProducts, pending: pendingProducts, refresh: refreshProducts } = await useGetAllProducts(PRODUCTS_PER_PAGINATION_FETCH, '');
if (errorProducts.value) {
    console.log("error /s1 = " + errorProducts.value);
} else if (res.value) {
    products.value = res.value as [];
}

</script>

<template>
    <div>
        <ProductsPageLayout :products="products">
            <template #title>S1</template>
        </ProductsPageLayout>
    </div>
</template>

<style scoped></style>
