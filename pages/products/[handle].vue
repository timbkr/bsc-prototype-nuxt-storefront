<script setup lang="ts">
const router = useRouter();
const route = useRoute();

const isAddToCartBtnLoading = useIsAddToCartBtnLoadingState();

const productData = useState('productData', () => ({} as any));
const hasVariants = useState('hasVariants', () => (false));
const variantID = useState('variantID', () => (''));
const variantQuantityInStock = useState('variantQuantityInStock', () => (0));
const amount = useState('amount', () => (1))
const featuredImage = useState('featuredImage', () => ({ src: '', alt: '' }));

const variantInStockStatus = useState('variantInStockStatus', () => ('')); // possible Values: 'infinite', 'outOfStock', 'onlyXLeft', 'inStock)'
const variantCartLineId = useState('variantCartLineId', () => (''));
const selectedOptions = useState('selectedOptions', () => ([] as Array<any>));// params: array of key value pairs: [{size: 's'},{color: 'black'})]

// ------------> INITIALIZE <------------
const cart = useCartLocalState();


//get Product Data with gql by handle + initialize refs
const { data, error } = await useGetProductByHandle(route.params.handle as string)
if (error.value) {
    console.error(error.value);
    router.push('/404');
}
else if (data.value.productByHandle) {
    productData.value = data.value.productByHandle;
    // initialize variantID to first variant (in case getSelectedOptionFromUrlQueryParams() failes, atleast one correct id ist available)
    variantID.value = productData.value.variants.edges[0].node.id;
    if (productData.value.images.edges.length > 0 && Object.keys(route.query).length <= 0) { // if image is available && noUrlQueryParam given -> set image to default [0]
        featuredImage.value.src = productData.value.images.edges[0].node.url;
        featuredImage.value.alt = productData.value.images.edges[0].node.altText;
    } else {
        featuredImage.value.src = '';
        featuredImage.value.alt = '';
    }
    getSelectedOptionFromUrlQueryParams();
}

/**
 * Gets SelectedOption / Variant from urlQueryParams or sets it to default variant if no query available
 */
async function getSelectedOptionFromUrlQueryParams() {
    selectedOptions.value = [];
    if (Object.keys(route.query).length > 0) { // if UrlQueryParams available:
        // set selectedOptions to values from UrlQueryParam
        Object.keys(route.query).forEach((key) => {
            selectedOptions.value.push({ name: key, value: route.query[key] })
        })
    } else { // if no query param available: set selectedOptions to first option
        productData.value.options.forEach((elem: any) => {
            selectedOptions.value.push({ name: elem.name, value: elem.values[0] })
        });
    }
    //Fetch Updated Variant Data from GQL and update Data (to DIsplay new Variant)
    const { data: res, error: error } = await useGetVariantBySelectedOptions(route.params.handle as string, selectedOptions.value);
    if (error.value) {
        console.log("ERROR:");
        console.error(error)
        return;
    }
    const selectedVariant = res.value.product.variantBySelectedOptions
    productData.value.variantBySelectedOptions = selectedVariant;
    updateLocalProductDataWithVariantData(selectedVariant);
}

function updateLocalProductDataWithVariantData(selectedVariant: any) {
    productData.value.price = selectedVariant.price
    if (selectedVariant.image) {
        featuredImage.value = { src: '', alt: '' };
        featuredImage.value.src = selectedVariant.image.url;
        featuredImage.value.alt = selectedVariant.image.alt ? selectedVariant.image.alt : 'Image of Product'
    }
    productData.value.availableForSale = selectedVariant.availableForSale;
    variantQuantityInStock.value = selectedVariant.quantityAvailable;
    setInStockStatus(); // call manually on init, because computed is not executed before rendering in ssr 

    // initialize Variant Values for rendering VariantSelection + addToCart cartInput param
    variantID.value = selectedVariant.id
    if (productData.value.options.length > 1) {
        hasVariants.value = true;
    }
}

const hasOptions = computed(() => {
    if (productData.value.hasOwnProperty('title')) { //if productData is available
        if (productData.value.options[0].values.length > 1) {
            // atleast one option to select available
            return true;
        } else {
            // dont show variant selection - only default option / variant available
            return false;
        }
    } return false;
})

const quantityInShoppingCart = computed(() => {
    if (cart.value) {
        if (cart.value.hasOwnProperty('id')) {
            const res = cart.value.lines.edges.find((x: any) => x.node.merchandise.id === variantID.value)
            if (res === undefined) return 0;
            else {
                variantCartLineId.value = res.node.id;
                return res.node.quantity
            }
        }
    }
    else return 0;
})

const onlyXLeft = 10; // when 'in Stock' vs 'only X Left' will be shown ( < onlyXleft)
const inStock = computed(() => {
    return setInStockStatus();
})
function setInStockStatus() {
    if (variantQuantityInStock.value <= 0) {
        if (productData.value.variantBySelectedOptions === null) { // for product with only one default variant, 
            return "";
        } else {
            if (productData.value.variantBySelectedOptions.availableForSale) {
                variantInStockStatus.value = "infinite"; // return "Infinite Amount in Stock"
                return "In Stock"
            }
            else {
                variantInStockStatus.value = "outOfStock";
                return "Variant Out of Stock"
            }
        }
    }
    if (variantQuantityInStock.value <= onlyXLeft) {
        variantInStockStatus.value = "onlyXLeft";
        return "(Only " + variantQuantityInStock.value + " left)"
    }
    variantInStockStatus.value = "inStock";
    return "In Stock"
}

async function clickSelectOption(optionsIndex: number, value: string) {
    selectedOptions.value[optionsIndex].value = value;
    // Set urlQueryParams from selectedOptions
    let tmpQueryParamObj = {} as any
    let urlQuery = "?";
    selectedOptions.value.forEach((elem, index) => {
        tmpQueryParamObj[elem.name] = elem.value;
        urlQuery += elem.name + "=" + elem.value;
        if (index < selectedOptions.value.length - 1) urlQuery += "&"
    })
    await router.push(urlQuery)
}

// refetch on Route Change instead of triggering refetch per emit (causing problem with back navigation not updating page / state)
watch(() => route.fullPath, async (newValue, oldValue) => {
    resetState();
    getSelectedOptionFromUrlQueryParams();
})
function resetState() { // Reset State (when refetching)
    hasVariants.value = false;
    amount.value = 1;
    variantID.value = '';
}


async function clickAddToCart() {
    console.log(quantityInShoppingCart.value);

    if (quantityInShoppingCart.value === 0) { // if no item of this ProductVariant is in Cart add new Cartline
        const cartInput = {
            lines: [
                {
                    quantity: amount.value,
                    merchandiseId: variantID.value,
                },
            ],
            attributes: {
                key: "cart_attribute_key",
                value: "This is a cart attribute value",
            },
        };
        cartLineAdd(cartInput)
    } else { // if ProductVariant is already in Cart, just update Cartline
        const input = {
            cartId: cart.value.id,
            lines: [{ id: variantCartLineId.value, quantity: (amount.value + quantityInShoppingCart.value) }]
        }
        cartLineUpdate(input)
    }


}

function handleClickOnImage(image: any) {
    featuredImage.value = { src: '', alt: '' };
    featuredImage.value.src = image.node.url;
    featuredImage.value.alt = image.node.alt ? image.node.alt : 'Image of Product'
}

const showPrice = computed((): String => {
    return productData.value.variantBySelectedOptions ?
        amountParser(productData.value.variantBySelectedOptions.price.amount) +
        currencyCodeParser(productData.value.variantBySelectedOptions.price.currencyCode) :
        amountParser(productData.value.priceRange.minVariantPrice.amount) +
        currencyCodeParser(productData.value.priceRange.minVariantPrice.currencyCode)
})
</script>

<template>
    <div class="productDetailsWrapper">
        <NotificationBar>
        </NotificationBar>
        <div v-if="productData.hasOwnProperty('id')" class="myContainer">
            <div class="myContainer">
                <div class="breadcrumb py-4">
                    <div>
                        <a href="#" @click="router.push('/products')" class="text-gray-400 ">>Products</a>
                        <span>
                            >{{ route.params.handle }}
                        </span>
                    </div>
                </div>

                <div class="wrapper sm:flex sm:gap-4 lg:gap-6 xl:gap-12">
                    <div class="imageBox sm:w-1/2 px-2 sm:px-4 pb-4">
                        <img :src=featuredImage.src :alt="featuredImage.alt !== '' ? featuredImage.alt : 'Image of Product'"
                            width="250" height="250" class="w-full  bg-slate-700  rounded-xl">
                        <div class="images flex py-4 gap-1">
                            <div v-for="(image, index) in productData.images.edges" @click="handleClickOnImage(image)"
                                class="cursor-pointer">
                                <img :src=image.node.url :alt="image.node.alt !== '' ? image.node.alt : 'Image of Product'"
                                    width="75" height="75" class="bg-slate-700  rounded-xl"
                                    :class="{ imgBorder: featuredImage.src === image.node.url }">
                            </div>
                        </div>
                    </div>

                    <div class="detailsBox sm:w-1/2 px-2 sm:px-4 pb-4 flex flex-col gap-4">
                        <div class="product-meta ">
                            <h2 class="text-3xl md:text-4xl titleWithoutOverflow">{{ productData.title }}</h2>
                            <h3 class="text-xl pt-4">
                                <span
                                    v-if="productData.variantBySelectedOptions && productData.variantBySelectedOptions.compareAtPrice"
                                    class="line-through text-gray-400 pr-3">{{
                                        amountParser(productData.variantBySelectedOptions.compareAtPrice.amount) +
                                        currencyCodeParser(productData.variantBySelectedOptions.compareAtPrice.currencyCode)
                                    }}</span>
                                <span class="price">
                                    {{ showPrice }}
                                </span>
                                <span class="text-green-500 pl-3"
                                    :class="{ outOfStock: variantInStockStatus === 'outOfStock', onlyXLeft: variantInStockStatus === 'onlyXLeft' }">{{
                                        inStock
                                    }}</span>
                            </h3>
                            <h4 class="text-gray-400 pt-0.5">{{ quantityInShoppingCart }} in Shopping Cart</h4>
                        </div>
                        <hr style="border-top: 1px solid grey;">

                        <div v-if="hasOptions" class="variants-container flex flex-col gap-2">
                            <div v-for="(option, outerIndex) in productData.options">
                                <div>{{ option.name }}</div>
                                <div class="flex gap-4 flex-wrap">
                                    <div v-for="(elem, index) in productData.options[outerIndex].values" class="variant ">
                                        <button class="w-12 h-12 min-w-min px-3 bg-transparent"
                                            @click="clickSelectOption(outerIndex, elem)"
                                            :class="{ activeVariant: elem === selectedOptions[outerIndex].value }">{{
                                                elem }}</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <label for="amount">Quantity:</label>
                        <div class="py-2">
                            <span class="amountInputfield border-2 flex w-min">
                                <button @click="amount > 1 ? amount-- : amount"
                                    class="border-0 bg-transparent p-3 md:p-2.5 focus:-outline-offset-2 ">➖</button>
                                <input type="number" inputmode="numeric" :value="amount"
                                    @change="amount = filterNonNumeric(amount, $event, true); ($event.target as HTMLInputElement).value = amount.toString();"
                                    class="myNumberInput text-center w-12 border-0 bg-[var(--color-bg)] focus:-outline-offset-2   "
                                    name="amount" min="0" step="1">
                                <button @click="amount++"
                                    class="border-0 bg-transparent p-3 md:p-2.5 focus:-outline-offset-2 ">➕</button>
                            </span>
                        </div>
                        <button class="w-full py-2.5 bg-orange-500 active:bg-black" @click="clickAddToCart"
                            :disabled="variantInStockStatus === 'outOfStock'"
                            :class="{ addToCartBtnDisabled: variantInStockStatus == 'outOfStock', loading: isAddToCartBtnLoading }">
                            <span v-if="!isAddToCartBtnLoading">ADD TO CART</span>
                            <span v-else>Loading</span>
                        </button>
                        <!-- <button class="w-full py-2.5 bg-cyan-600">Buy with Paypal</button> -->
                        <p>{{ productData.description }}</p>
                    </div>
                </div>

                <div class="py-4 text-center">
                    <ProductRecommendations :id="productData.id">
                    </ProductRecommendations>
                </div>

            </div>
        </div>
        <div v-else class="myContainer">
            <div class="breadcrumb py-4 ">
                <a href="#" @click="router.push('/products')" class="text-gray-400">>Products</a>
                <span>
                    >{{ route.params.handle }}
                </span>
            </div>
            <p class="text-center">⚠ Loading ...</p>

        </div>
    </div>
</template>

<style scoped>
.loading {
    background-color: grey;
}

.activeVariant {
    border-color: var(--color-text-active);
}

.addToCartBtnDisabled {
    background-color: rgb(56, 55, 55);
    /* border-color: black; */
}

.addToCartBtnDisabled:hover {
    color: white;
}

.addToCartBtnDisabled:active {
    outline: none;
    background-color: rgb(56, 55, 55);
}

.outOfStock {
    color: grey;
}

.onlyXLeft {
    color: var(--color-text-hover);
}

.imgBorder {
    border-width: 2px;
    border-color: var(--color-text-active);
    border-color: red;
}
</style>