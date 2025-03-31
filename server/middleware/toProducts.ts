export default defineEventHandler(async (event) => {
    /**
     * Not Needed when using nuxt.config.ts RouteRules 'redirect'
   
    const urlObj = getRequestURL(event);
    console.log("Server Middleware - New request: " + urlObj);
    if (urlObj.pathname === "/") {
        console.log("Server-Redirect from '/' to '/products'");
        await sendRedirect(event, "/products");
    } 
     */
});

//Good Read: https://deltener.com/blog/creating-redirects-with-nuxt/
