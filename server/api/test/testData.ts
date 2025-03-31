export default defineEventHandler( async (event) => {
    console.time("Execution Time api/testData ->$fetch('/api/cachedData')");
    const products = await $fetch('/api/cachedData');
    console.timeEnd("Execution Time api/testData ->$fetch('/api/cachedData')");

    console.time("Execution Time $fetch('www.google.com')");
    const google = await $fetch('http://www.google.com');
    console.timeEnd("Execution Time $fetch('www.google.com')");  
    
    console.time("Execution Time $fetch('jsonplaceholder')");
    const jsonplaceholder = await $fetch('https://jsonplaceholder.typicode.com/todos/1');
    console.timeEnd("Execution Time $fetch('jsonplaceholder')");
    return {data: 'testData'};
})

/**
 * zu Testen / Lesen: mit routeroules möglich im root folder product request zu cachen (ssr routeRule auf /pages/products3) und zu benutzen (als ssr)?
 * oder muss man doch im server folder cachen?
 * 
 */

/**
 * https://nuxt.com/docs/api/utils/dollarfetch
 * During server-side rendering, calling $fetch to fetch your internal API routes will directly call the relevant function (emulating the request), saving an additional API call.
 * 
 * https://youtu.be/g6BVCBkRelw?si=AmScL-U-2z7v67zR&t=1542
 * Doesnt hit network layer, will direcelty execute api route as its a function
 */