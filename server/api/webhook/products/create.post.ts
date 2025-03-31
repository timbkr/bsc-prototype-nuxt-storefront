export default defineEventHandler(async (event) => {
    console.log("/server/api -> request at: /api/webhook/products/create");

    const body = await readBody(event);

    //parse admin api create/product into our used products format equal to storefront api
    const newProduct = parseProductBody(body);

    console.log("newProduct = ");
    console.log(newProduct);
    
    //check if product with id is available
    const cachedProducts = await getProductsFromCache() as Array<any>;
    const productIndex = cachedProducts.findIndex((elem) => elem.id === "gid://shopify/Product/"+body.id)
    if(productIndex === -1) {
        //add new product to cached products ar
        console.log("add new product to cached products ar");
        await addProductToCache(newProduct);
    }else{
        //TODO: check if something has changed ->

        //Update with new product:
        console.log("Update Product in Cache! (with id = "+body.id+")")
        cachedProducts[productIndex] = newProduct;
        await updateProductsCache(cachedProducts)
    }

    //trigger swr/isr update/revalidation to realize on-Demand-SWR
    await $fetch("/s4");
    // await $fetch("/products8");


    return { response: "create -> All Good" };

    // 1. HTTP (POST) Endpoint Bereitstellen (entweder via filename suffix .post, oder so testen)
    // 2. JSON Data auslesen
    // 3. before responding: verify that Webhook was sent from Shopify, by calculating a digital signature
    // 4. respond by sending a 200 OK response
    // 5. process Webhook (update cache / rebuild '/product' pages)
});
