import { initGqlStorefrontClient } from "~/graphql-api/utils/initGqlStorefrontClient";

export default defineNuxtPlugin(() => {
    const graphQLClient = initGqlStorefrontClient();
    return { provide: { graphQLClient } };
});
