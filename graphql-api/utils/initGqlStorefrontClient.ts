import { GraphQLClient } from "graphql-request";

// Used 1x On Server + 1x On Client
export function initGqlStorefrontClient() {
    const config = useRuntimeConfig();

    // Making use of NUXTs built in environment variable suppport:
    const url = config.public.store_url; // "https://YOUR-STORE-ADRESS.myshopify.com/api/";
    const storefrontAccessToken = config.public.storefront_access_token; // "YOUR-STOREFRONT-ACCESS-TOKEN";
    if (
        !url ||
        !storefrontAccessToken ||
        url === "" ||
        storefrontAccessToken === ""
    ) {
        console.warn(
            "Shopify Storefront-API GraphQL Client not initialized! Needed Environment Variables not set!"
        );
        return null;
    }

    const API_VERISON = "2024-04";
    const endpoint = url + API_VERISON + "/graphql.json";

    const graphQLClient = new GraphQLClient(endpoint, {
        headers: {
            "X-Shopify-Storefront-Access-Token": storefrontAccessToken,
        },
    });

    console.log("initGqlStorefrontClient();")

    return graphQLClient;
}
