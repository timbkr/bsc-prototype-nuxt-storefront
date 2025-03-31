import { gql, GraphQLClient } from "graphql-request";

/**
 * DEV Environment: uses ngrok to get public URL to make Webhooks working
 * Production Env: uses hardcoded (in runtimeConfig)
 */

export default defineNitroPlugin(async (nitroApp) => {
    const config = useRuntimeConfig();

    // // Making use of NUXTs built in environment variable suppport:
    const url = config.admin_api_url; // "https://YOUR-STORE-ADRESS.myshopify.com/admin/api/";

    const adminAPI_AccessToken = config.admin_api_access_token; // "YOUR-ADMIN-API-ACCESS-TOKEN";

    if (
        !url ||
        !adminAPI_AccessToken ||
        url === "" ||
        adminAPI_AccessToken === ""
    ) {
        console.warn(
            "Shopify Admin-API GraphQL Client not initialized! Needed Environment Variables not set!\n Therefore no WebhookSubscription is established!"
        );
        return null;
    }

    const API_VERISON = "2024-04";
    const endpoint = url + API_VERISON + "/graphql.json";

    const graphQLClient = new GraphQLClient(endpoint, {
        headers: {
            "X-Shopify-Access-Token": adminAPI_AccessToken,
        },
    });

    let callbackUrl = "";

    if (process.env.NODE_ENV === "prerender") {
        console.log(
            "process.env.NODE_ENV = prerender -> exiting subscribeToWebhooks()"
        );
        return;
    }
    if (
        process.env.NODE_ENV === "development" ||
        config.force_ngrok_url ||
        config.force_ngrok_url !== ""
    ) {
        console.log(
            "process.env.NODE_ENV = " +
                process.env.NODE_ENV +
                "-> use ngrok to receive webhook triggers"
        );
        //use ngrok to get app online and to receive webhook triggers
        try {
            callbackUrl = await useNgrok();
        } catch (e) {
            console.log("ngrok failed:");
            console.log(e);
            return;
        }
    } else if (process.env.NODE_ENV === "production") {
        const deployURL = config.deploy_url;
        console.log(
            "process.env.NODE_ENV = " +
                process.env.NODE_ENV +
                "-> use NUXT_DEPLOY_URL env Var to receive webhook triggers "
        );
        if (!deployURL || deployURL === "") {
            console.log(
                "ERROR: no NUXT_DEPLOY_URL environment variable is set --> Webhooks not active!"
            );
            return;
        }
        console.log("Webhook Callback URL = " + deployURL);
        callbackUrl = deployURL;
    }
    if (!callbackUrl || callbackUrl === "") {
        console.log("No Webhook callbackURL set, abort webhook subscription");
        return;
    }

    //remove ending '/' from callbackURL
    if (callbackUrl.endsWith("/")) {
        callbackUrl = callbackUrl.slice(0, callbackUrl.length - 1);
    }

    const queryVars = [];
    queryVars.push(
        createQueryVar(
            callbackUrl + "/api/webhook/products/create",
            "PRODUCTS_CREATE"
        )
    );
    queryVars.push(
        createQueryVar(
            callbackUrl + "/api/webhook/products/delete",
            "PRODUCTS_DELETE"
        )
    );
    queryVars.push(
        createQueryVar(
            callbackUrl + "/api/webhook/products/update",
            "PRODUCTS_UPDATE"
        )
    );

    const query = gql`
        mutation webhookSubscriptionCreate(
            $topic: WebhookSubscriptionTopic!
            $webhookSubscription: WebhookSubscriptionInput!
        ) {
            webhookSubscriptionCreate(
                topic: $topic
                webhookSubscription: $webhookSubscription
            ) {
                webhookSubscription {
                    id
                    topic
                    format
                    includeFields
                    endpoint {
                        __typename
                        ... on WebhookHttpEndpoint {
                            callbackUrl
                        }
                    }
                }
                userErrors {
                    field
                    message
                }
            }
        }
    `;

    try {
        queryVars.forEach(async (queryVar) => {
            console.log(
                "subscribe webhook '" +
                    queryVar.topic +
                    "' to " +
                    queryVar.webhookSubscription.callbackUrl
            );

            const res: any = await graphQLClient.request(query, queryVar);
            console.log("res = " + JSON.stringify(res) + "\n");

            // if Webhook Subscription worked or Webhook is already subscribed for the topic from same url
            if (res.webhookSubscriptionCreate.webhookSubscription) {
                setWebhookStatus(true);
            } else if (
                res.webhookSubscriptionCreate.userErrors[0]?.message ===
                "Address for this topic has already been taken"
            ) {
                console.log(
                    "Webhook is already subscribed for this url & topic"
                );
                setWebhookStatus(true);
            }
        });
        // Possibility Batch Requests:
        // const res = await graphQLClient.batchRequests([
        //     {document: query, variables: queryVars[0]},
        //     {document: query, variables: queryVars[1]},
        //     {document: query, variables: queryVars[2]},
        // ])
        //     console.log(JSON.stringify(res)+"\n");
    } catch (error: any) {
        console.log("Error - subscribeToWebhooks.ts:");
        console.log(error);
        // throw new Error(error);
    }
});

async function useNgrok(): Promise<string> {
    const config = useRuntimeConfig();

    //somehow hacky solution to get apps port in dev environment but works, cant find another solution to get port inside a serverplugin :/
    let urlString;
    if (config.force_ngrok_url || config.force_ngrok_url !== "") {
        urlString = config.force_ngrok_url;
    } else {
        urlString = JSON.parse(process.env.__NUXT_DEV__ as string).proxy.url;
    }
    const urlTmp = new URL(urlString);
    const port = urlTmp.port;
    console.log("port = " + port);

    if (!process.env.NGROK_AUTHTOKEN || process.env.NGROK_AUTHTOKEN === "") {
        console.log(
            "ERROR: NO NGROK AUTH TOKEN IS SET! --> Webhooks not active!"
        );
    }
    // dynamically import ngrok in dev mode because its installed as dev dependency and would throw an error in production with top level import
    const ngrok = await import("@ngrok/ngrok");
    // Get Endpoint online with ngrok
    const listener = await ngrok.forward({
        addr: port,
        authtoken_from_env: true,
    });
    // Output ngrok url to console
    console.log(`Ingress established at: ${listener.url()}`);

    return listener.url() || config.app.baseURL;
}

function createQueryVar(callbackUrl: string, topic: string) {
    return {
        topic: topic.toUpperCase(),
        webhookSubscription: {
            callbackUrl: callbackUrl,
            format: "JSON",
            includeFields: [],
        },
    };
}
