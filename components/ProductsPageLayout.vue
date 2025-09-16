<script setup lang="ts">
import { setFilterAndSortValuesFromURLQueryString } from '@/utils/state/productsFilterState'

const props = defineProps({ products: { type: Array, required: true }, PRODUCTS_PER_PAGE: { type: Number, required: false } })

const route = useRoute()

const currentPage = ref(1);

const PRODUCTS_PER_PAGE = ref(24);


console.log("render /" + (route.name as string));

onMounted(async () => {
    console.log("MOUNTED /" + (route.name as string));
})

onBeforeUnmount(() => {
    console.log("UNMOUNT /" + (route.name as string));

})

async function init() {
    setFilterAndSortValuesFromURLQueryString(route);
    setCurrentPageFromURLQueryString();
}
init();

function setCurrentPageFromURLQueryString() {
    //set CurrentPage to url query (?page=X) or redirect to 404 (after Products are fetched)
    if (route.query.page) {
        if (parseInt(route.query.page as string) > Math.ceil(props.products.length / PRODUCTS_PER_PAGE.value)) {
            // router.replace('/404')
        }
        currentPage.value = parseInt(route.query.page as string);
    }
}

const getProductsBycurrentPage = computed(() => {
    return props.products.slice((currentPage.value * PRODUCTS_PER_PAGE.value - PRODUCTS_PER_PAGE.value), PRODUCTS_PER_PAGE.value * currentPage.value)
})

const maxPages = computed(() => {
    return Math.ceil(props.products.length / PRODUCTS_PER_PAGE.value);
})
const getPageList = computed(() => { /* 1 .. 3 4 [5] 6 7 .. 13 */
    let ar = [];
    if (currentPage.value > 2) ar = Array.from({ length: 5 }, (v, i) => currentPage.value + i - 2);
    else if (currentPage.value > 1) ar = Array.from({ length: 5 }, (v, i) => currentPage.value + i - 1);
    else ar = Array.from({ length: 5 }, (v, i) => currentPage.value + i); // when currentPage.value <= 0
    ar = ar.filter((page) => page <= maxPages.value) // remove pages without products
    return ar
})

async function clickPageNumber(pageNumber: number) {
    window.scrollTo(0, 0);
}


watch(() => route.query, async (newValue: any, oldValue: any) => {
    //if old and new Query is the same except page value (if only currentPage value changed)
    if (queryIsEqualExceptPage(oldValue, newValue) && oldValue.page !== newValue.page) {
        //if just page is different, no refetch needed, just change currentPage
        if (newValue.page === undefined) {
            currentPage.value = 1;
        } else {
            currentPage.value = parseInt(newValue.page);
        }
        return
    }
})

function queryIsEqualExceptPage(oldValue: any, newValue: any) {
    //remove page attribute, then compare objects (convert into string first)
    let oldRestAsString, newRestAsString;
    if (oldValue.page) {
        const { page, ...rest } = oldValue;
        oldRestAsString = JSON.stringify(rest);
    } else oldRestAsString = JSON.stringify(oldValue);
    if (newValue.page) {
        const { page, ...rest } = newValue;
        newRestAsString = JSON.stringify(rest);
    } else newRestAsString = JSON.stringify(newValue);

    if (oldRestAsString === newRestAsString) {
        return true
    } else return false;
}


</script>

<template>
    <div class="text-center">
        <h2 class="text-center text-4xl pt-4">
            <slot name="title">#title</slot>
        </h2>

        <div class="utilBar text-center py-4 md:py-6 flex justify-around items-center">
            <div class="productAmount">
                {{ products.length }} products
            </div>
        </div>

        <div class="products-wrapper-grid">
            <ProductCard v-if="products" v-for="(product, index) in getProductsBycurrentPage" :product="product">
            </ProductCard>
        </div>
        <div class="paginationBar flex justify-center items-center pt-6">
            <div v-if="currentPage > 3" @click="clickPageNumber(1)" class="pageItem cursor-pointer">
                <NuxtLink :href="route.path + buildAndEncodeUrlQueryString('', '', 1)"
                    :class="{ active: 1 === currentPage }" class="paginationLink p-2 px-4">1
                    ..</NuxtLink>
            </div>
            <div v-for="(page, index) in getPageList" @click="clickPageNumber(page)"
                class="pageItem cursor-pointer test">
                <NuxtLink :href="route.path + buildAndEncodeUrlQueryString('', '', page)"
                    :class="{ active: page === currentPage }" class="paginationLink p-2 px-4">{{
                        page }}</NuxtLink>
            </div>
            <div v-if="currentPage < maxPages - 2" @click="clickPageNumber(maxPages)" class="pageItem cursor-pointer">
                <NuxtLink :href="route.path + buildAndEncodeUrlQueryString('', '', maxPages)"
                    :class="{ active: maxPages === currentPage }" class=" paginationLink p-2 px-4"> ..
                    {{ maxPages }}</NuxtLink>
            </div>
        </div>
    </div>
</template>


<style scoped>
/* Vue / CSS Transition */
.v-enter-active,
.v-leave-active {
    opacity: 1;
    transition: opacity 0.15s ease-in-out, transform 0.15s ease-in-out;
    transform: translateY(0);
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
    transform: translateY(-10px);
}

/* ----------------------------- */

.products-wrapper {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: center;
}

.pageItem {
    /* display: flex; */
    justify-content: center;
    align-items: center;
}

.paginationLink {
    text-align: center;
}

.products-wrapper-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(8rem, 1fr));
    gap: 0.75rem;
}

.paginationLink.active {
    background-color: rgb(108, 3, 3);
    border-radius: 8px;
}

.paginationLink:hover {
    color: var(--color-text);
}

.paginationLink.active:hover {
    color: var(--color-text);
}

.paginationLink:active {
    outline: 0px solid var(--color-outline);
}

/* Larger min-width of grid cell width larger screen */
@media (min-width: 426px) {
    .products-wrapper-grid {
        grid-template-columns: repeat(auto-fit, minmax(11rem, 1fr));
        gap: 1.5rem;
    }
}

@media (min-width: 640px) {
    .paginationLink:hover {
        color: var(--color-text-hover);
        text-decoration: underline;
        text-underline-offset: 8px;
    }
}

@media (min-width: 1024px) {
    .products-wrapper-grid {
        grid-template-columns: repeat(auto-fit, minmax(13rem, 1fr));
    }
}
</style>