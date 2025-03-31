/**
 * Doesnt fetch Shopify on request, just returns Products from Cache.
 * Cache gets updated on Serverstartup (Plugin: 'init', Util: 'productsCacheUtil.ts') and on Webhook trigger
 * Used in '/products3 + /products5'
 */

export default defineEventHandler(async (event) => {
    console.log("Server API: '/getAllCachedProducts'");

    /**
     *  get + return Products from (local in memory) ProductsCache (without fetch to Shopify StorefrontAPI)
     */
    console.time("Execution Time FetchAllProducts");
    const products = await getProductsFromCache();
    console.timeEnd("Execution Time FetchAllProducts");
    //if for some reason productsCache is not initialized, try to fill cache else return empty productsArray
    if (!products) {
        console.log(
            "for some reason productsCache is not initialized, trying to fill cache. if not successful return empty productsArray"
        );
        return await refetchProductsCache()
            .then((products) => products)
            .catch((error) => []);
    } else {
        console.log(
            "cached products.length = " + (products as Array<any>).length
        );
    }

    return products;
});
