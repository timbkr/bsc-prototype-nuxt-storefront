<script setup lang="ts">

const props = defineProps<{ product: any }>();

</script>

<template>
    <NuxtLink :to="'/products/' + product.handle"
        class="productCard flex flex-col gap-4 text-center py-0 sm:py-0 cursor-pointer rounded-md" tabindex="0">
        <div class="imgContainer flex-1 flex items-center ">
            <img class="w-full" width="200" height="200" :src="product.featuredImage ? product.featuredImage.url : '#'"
                :alt="product.featuredImage?.altText ? product.featuredImage.altText : 'Image of Product'">
        </div>
        <div class="flex-1 flex  justify-center items-center px-1 sm:px-2 lg:px-3">
            <p class="title titleWithoutOverflow text-sm sm:text-base">
                {{ product.title }}
            </p>
        </div>
        <p class="price pb-4">{{ amountParser(product.priceRange.minVariantPrice.amount) +
        currencyCodeParser(product.priceRange.minVariantPrice.currencyCode) }}</p>
    </NuxtLink>
</template>

<style scoped>
a:hover .price

/* , a:hover .title */
    {
    color: var(--color-text);
}

/* a:hover .title {
    color: var(--color-text-hover);
} */

.productCard {
    background-color: #1f2731;
    background-color: #334155;
    justify-self: center;
    max-width: 29rem;
}

.productCard:active {
    outline: 2px solid var(--color-outline);
    border: 1px solid transparent;
}

.hoverTitle:active {
    outline: none;
}

.imgContainer img {
    border-top-left-radius: 0.375rem;
    border-top-right-radius: 0.375rem;
}

/* dont show hoverEffect on Mobile */
@media(min-width: 640px) {
    .productCard:hover {
        background-color: #334155;
        background-color: #3d3728;
    }

    /* .hoverTitle {
        color: var(--color-text-hover);
    } */
}
</style>