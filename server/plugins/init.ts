import { setGqlStorefrontClient } from "../utils/gqlStorefrontClientUtil";
import { initGqlStorefrontClient } from "~/graphql-api/utils/initGqlStorefrontClient";

// Initialize GQL Storefront Client + ProductsCache
export default defineNitroPlugin(async (nitroApp) => {
    // ----------- Just for Testing: -----------
    // console.log('Nitro plugin', nitroApp)

    // nitroApp.hooks.hookOnce("request", (event) => {
    //     console.log("hook request", event.path, { event });
    //     console.log(getRequestURL(event));
    // });

    // nitroApp.products = 2;
    // console.log("nitroApp.products ="+nitroApp.products);

    //------------------------------------------------------------
    // Init empty In Memory ProductsCache
    await initEmptyProductsCache();

    // Initialize GQL Storefront Client
    const graphQLSfClient = initGqlStorefrontClient();
    if (graphQLSfClient) {
        setGqlStorefrontClient(graphQLSfClient);

        //Initialize In Memory ProductsCache with all Products from Shopify (Storefront API)
        await refetchProductsCache();
    }

    // Inititalize SWR cache to get cached Response even on first Page Visist after Serverstartup
    // await $fetch("/s3");
    await $fetch("/s4");
});
