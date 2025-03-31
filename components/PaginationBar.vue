<script setup lang="ts">
const props = defineProps(['products','productsPerPage','currentPage'])

const router = useRouter()
const route = useRoute()

const currentPage = useState('currentPage', () => 1);

const maxPages = computed(() => {
    return Math.ceil(props.products.length / props.productsPerPage);
})
const getPageList = computed(() => { /* 1 .. 3 4 [5] 6 7 .. 13 */
    let ar = [];
    if (props.currentPage > 2) ar = Array.from({ length: 5 }, (v, i) => props.currentPage + i - 2);
    else if (props.currentPage > 1) ar = Array.from({ length: 5 }, (v, i) => props.currentPage + i - 1);
    else ar = Array.from({ length: 5 }, (v, i) => props.currentPage + i); // when currentPage <= 0
    ar = ar.filter((page) => page <= maxPages) // remove pages without products
    return ar
})

async function clickPageNumber(pageNumber: number) {
    // ToDo: dont change prop value!!!
    currentPage.value = pageNumber
    // add page to urlqueryString
    router.push({ path: route.fullPath, query: { query: route.query.query, sort: route.query.sort, page: props.currentPage.toString() } })
    window.scrollTo(0, 0);
}
</script>

<template>
            <div class="paginationBar flex justify-center items-center pt-6">
                <div v-if="currentPage > 3" @click="clickPageNumber(1)" class="pageItem cursor-pointer">
                    <a :class="{ active: 1 === currentPage }" class="paginationLink p-2 px-4">1
                        ..</a>
                </div>
                <div v-for="(page, index) in getPageList" @click="clickPageNumber(page)"
                    class="pageItem cursor-pointer test">
                    <a :class="{ active: page === currentPage }" class="paginationLink p-2 px-4">{{
                page }}</a>
                </div>
                <div v-if="currentPage < maxPages - 2" @click="clickPageNumber(maxPages)"
                    class="pageItem cursor-pointer">
                    <a :class="{ active: maxPages === currentPage }" class=" paginationLink p-2 px-4"> ..
                        {{ maxPages }}</a>
                </div>
            </div>
</template>
