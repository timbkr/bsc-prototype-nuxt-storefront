<script setup lang="ts">
const cart = useCartLocalState();

const isCartEmpty = computed(() => {
    if ((!cart.value || JSON.stringify(cart.value) === '{}') || (cart.value.lines === undefined || cart.value.lines.edges.length <= 0))
        return true;
    return false;
})
async function changeQuantity(lineItem: any, newQuantity: number) {
    const cartLineUpdateInput = {
        id: lineItem.node.id,
        quantity: newQuantity
    }
    const { data: cartRes, error } = await useUpdateCartLines(cart.value.id, [cartLineUpdateInput]);
    if (error.value) {
        console.error(error.value);
        return;
    }
    if (cartRes.value.userErrors.length > 0) {
        console.error(cartRes.value.userErrors[0].message);
        showNotificationBar('error', cartRes.value.userErrors[0].message);
    }
    updateLocalCart(cartRes.value.cart)
}

async function removeItem(lineItem: any) {
    const { data: cartRes, error } = await useRemoveCartLines(cart.value.id, [lineItem.node.id]);
    if (error.value) {
        console.error(error.value);
        return;
    }
    if (cartRes.value.userErrors.length > 0) {
        console.error(cartRes.value.userErrors[0].message);
        showNotificationBar('error', cartRes.value.userErrors[0].message);
    } else {
        showNotificationBar('success', 'Item successfully removed from Cart')
    }
    updateLocalCart(cartRes.value.cart)
}
</script>

<template>
    <div>
        <NotificationBar :isOnCartPage="true">
        </NotificationBar>
        <div class="myContainer">
            <h2 class="text-4xl md:text-5xl text-center py-4 md:py-8">CART</h2>
            <div>
                <!-- If Cart is initialized AND has lineItems  -->
                <div class="wrapper md:flex md:gap-8 ">
                    <div v-if="!isCartEmpty"
                        class="lineItems md:w-[67%]">
                        <CartLineItem v-for="lineItem in cart.lines.edges" :lineItem="lineItem"
                            @changeQuantity="changeQuantity" @removeItem="removeItem">
                        </CartLineItem>
                    </div>
                    <div v-else class="lineItems md:w-[67%]">

                    </div>
                    <div class="checkoutWrapper md:w-[33%]">
                        <div class="checkout  flex flex-col gap-4 bg-slate-600 p-6 my-4  rounded-md md:mt-0">
                            <div class="bold flex text-xl">
                                <div class="w-1/2">TOTAL</div>
                                <div v-if="!cart" class="w-1/2 text-right">0.00€</div>
                                <div v-else class="w-1/2 text-right">{{ amountParser(cart?.cost.totalAmount.amount) +
            currencyCodeParser(cart?.cost.totalAmount.currencyCode) }}</div>
                            </div>
                            <p class="text-center">Shipping & and Taxes are calculated in Checkout</p>
                            <button :disabled="isCartEmpty" class="w-full bg-lime-700"
                                :class="{ 'cursor-not-allowed': isCartEmpty }"><a class="w-full inline-block py-4"
                                    :href="cart?.checkoutUrl" :class="{'cursor-not-allowed': isCartEmpty, 'pointer-events-none': isCartEmpty}">Checkout</a></button>
                        </div>
                        <div class="paymentOptionsBanner text-center">
                            <p>We Accept:</p>
                            <p>AmexIcon, ApplePayIcon, GpayIcon,...</p>
                        </div>
                    </div>
                </div>
                <!-- <div v-else class="noItemsInCart text-center">
                    <h3>Your Cart has no items</h3>
                    <button class="bg-green-700 py-2 px-4 my-6" @click="router.push('/products')">Continue
                        Shopping</button>
                </div> -->
            </div>
        </div>
    </div>
</template>

<style scoped></style>