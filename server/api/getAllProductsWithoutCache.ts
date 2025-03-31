/**
 * Gets all Products from Shopify StorefrontAPI
 * Used in '/products'
 */
export default defineEventHandler(async (event) => {
    console.log("Server API: '/getAllProductsWithoutCache'");
    
    console.time("Execution Time FetchAllProducts");
    const products = await getAllProducts(250, "");
    console.timeEnd("Execution Time FetchAllProducts");
    
    return products;
});

