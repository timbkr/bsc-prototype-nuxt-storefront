export default defineEventHandler(async (event) => {
    console.log("/server/api -> request at: /api/webhook/products/delete");

    const body = await readBody(event);

    //check if product with id is available
    const cachedProducts = (await getProductsFromCache()) as Array<any>;
    const productIndex = cachedProducts.findIndex(
        (elem) => elem.id === "gid://shopify/Product/" + body.id
    );
    if (productIndex !== -1) {
        //deleteProduct:
        await deleteProduct("gid://shopify/Product/" + body.id);

        //trigger swr/isr update/revalidation to realize on-Demand-SWR
        await $fetch("/s4");
        // await $fetch("/products8");

    }else{
        console.log("/webhook/products/delete: Can't find product with index = "+body.id+". Therefore can't delete from ProductsCache")
    }


    return { response: "delete -> All Good" };

    // 1. HTTP (POST) Endpoint Bereitstellen (entweder via filename suffix .post, oder so testen)
    // 2. JSON Data auslesen
    // 3. before responding: verify that Webhook was sent from Shopify, by calculating a digital signature
    // 4. respond by sending a 200 OK response
    // 5. process Webhook (update cache / rebuild '/product' pages)
});
