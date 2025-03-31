export const useCartLocalState = () => useState<any>("cartLocal", () => {});
export const useIsAddToCartBtnLoadingState = () =>
    useState("isAddToCartBtnLoading", () => false);

/**
 * probably possible to use .client Component for Cart instead of using watcheffect
 */
export async function initializeCart() {
    console.log("initialize cart");

    const cartLocal = useCartLocalState();
    //get cartID + cart from Localstorage
    const localStorage_cartID = localStorage.getItem("cartID");
    const localStorage_cart = localStorage.getItem("cart");

    if (localStorage_cart) {
        //initialize Local Cart with data from Localstorage
        try {
            cartLocal.value = JSON.parse(localStorage_cart);
        } catch (e) {
            console.error(e);
        }
    }
    if (localStorage_cartID) {
        // request Cart from Shopify
        const { data: cartRes, error } = await useGetCartByID(
            localStorage_cartID
        );
        const stopWatchResponse = watchEffect(() => {
            if (error.value) {
                console.log(error.value);
                stopWatchResponse();
            }
            if (cartRes.value) {
                //compare Local and Fetched Cart and only update LocalCart if it differs from fetched Cart
                if (
                    JSON.stringify(cartLocal.value) !==
                    JSON.stringify(cartRes.value.cart)
                ) {
                    cartLocal.value = cartRes.value.cart;
                    localStorage.setItem(
                        "cart",
                        JSON.stringify(cartLocal.value)
                    );
                }
                stopWatchResponse();
            }
        });
    }
}

// used when no CartLineItem of ProductVariant exists
export async function cartLineAdd(cartInput: object) {
    const isAddToCartBtnLoading = useIsAddToCartBtnLoadingState();
    const cartLocal = useCartLocalState();
    closeNotificationBar();
    isAddToCartBtnLoading.value = true;
    if (!cartLocal.value || !cartLocal.value.hasOwnProperty("id")) {
        //if no cart exists: create new Cart with lineItem when no carts exists for user
        const { data: res, error } = await useCreateCart(cartInput);
        if (error.value) {
            showNotificationBar("error", error.value.message);
            isAddToCartBtnLoading.value = false;
            return;
        }
        handleCartMutation(res.value, true);
    } else {
        // else addCartLine to existing cart
        const { data: res, error } = await useAddCartLines(
            cartLocal.value.id,
            cartInput
        );
        if (error.value) {
            showNotificationBar("error", error.value.message);
            isAddToCartBtnLoading.value = false;
            return;
        }
        handleCartMutation(res.value);
    }
}

// used when CartLineItem of ProductVariant exists
export async function cartLineUpdate(input: any) {
    const isAddToCartBtnLoading = useIsAddToCartBtnLoadingState();
    closeNotificationBar();
    isAddToCartBtnLoading.value = true;
    const { data: res, error } = await useUpdateCartLines(
        input.cartId,
        input.lines
    );
    if (error.value) {
        showNotificationBar("error", error.value.message);
        isAddToCartBtnLoading.value = false;
    }
    handleCartMutation(res.value);
}

/*  - update cartLocal & localStorage Cart (for session restore), 
    - Errorhandling (on UserError: throw Error to show notificationBar with errorMessage ),
    - showNotificationBar on success + set addToCartBtnLoadingState to false (completed) */
export function handleCartMutation(res: any, setLocalStorageCartID?: boolean) {
    const isAddToCartBtnLoading = useIsAddToCartBtnLoadingState();
    const cartLocal = useCartLocalState();
    cartLocal.value = res.cart;
    localStorage.setItem("cart", JSON.stringify(cartLocal.value));
    if (setLocalStorageCartID) {
        localStorage.setItem("cartID", cartLocal.value.id);
    }
    if (res.userErrors.length > 0) {
        throw new Error(res.userErrors[0].message);
    }
    showNotificationBar("success", "PRODUCT ADDED TO SHOPPING CART!");
    isAddToCartBtnLoading.value = false;
}

export function updateLocalCart(newCart: object) {
    const cartLocal = useCartLocalState();
    cartLocal.value = newCart;
    localStorage.setItem("cart", JSON.stringify(cartLocal.value));
}
