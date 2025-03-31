export async function initEmptyProductsCache() {
    return await useStorage().setItem("products", []);
}

export async function getProductsFromCache() {
    return await useStorage().getItem("products");
}

export async function updateProductsCache(updatedProductAR: Array<any>) {
    return await useStorage().setItem("products", updatedProductAR);
}

export async function refetchProductsCache() {
    console.log("Server: fetch + fill productsCache:");
    try {
        const res = (await getAllProducts()) as [];
        return await useStorage().setItem("products", res);
    } catch (e) {
        console.warn("Error - refetchProductsCache(): " + e);
    }
}

export async function addProductToCache(newProduct: any) {
    try {
        const products: any[] = (await getProductsFromCache()) as any[];
        console.log(
            "Add new Product to Cache (length = " + products.length + ")"
        );
        products.push(newProduct);
        console.log(`Product added! (length = ${products.length})`);
        return await useStorage().setItem("products", products);
    } catch (e) {
        console.log("Error - addProductToCache(): " + e);
    }
}

export async function deleteProduct(id: string) {
    try {
        const products: any[] = (await getProductsFromCache()) as any[];
        const productIndex = products.findIndex(
            // (elem) => elem.id === "gid://shopify/Product/" + body.id
            (elem) => elem.id === id
        );
        if (productIndex !== 1) {
            products.splice(productIndex, 1);
            console.log(`Product deleted! (length = ${products.length})`);
        }
        return await useStorage().setItem("products", products);
    } catch (e) {
        console.log("Error - deleteProduct(): " + e);
    }
}
