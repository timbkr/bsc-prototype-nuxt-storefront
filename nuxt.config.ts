// https://nuxt.com/docs/api/configuration/nuxt-config
// https://nuxt.com/docs/guide/going-further/runtime-config
export default defineNuxtConfig({
    // devServer: {
    //     port: 3034
    // },
    //automatically imported from .dotenv file (if having same name + 'NUXT' prefix +  'PUBLIC' prefix for public env vars)
    app: {
        head: {
            title: "Nuxt-Shopify-Storefront",
            htmlAttrs: {
                lang: "en",
            },
            meta: [
                { charset: "UTF-8" },
                {
                    name: "viewport",
                    content: "width=device-width, initial-scale=1.0",
                },
                {
                    hid: "description",
                    name: "description",
                    content: "Nuxt-Shopify-Storefront",
                },
            ],
        },
    },
    runtimeConfig: {
        admin_api_url: "",
        admin_api_access_token: "",
        deploy_url: "", //doesnt need to be private, but can
        force_ngrok_url: "",
        public: {
            storefront_access_token: "",
            store_url: "",
            // myTest: process.env.myTest
        },
    },
    routeRules: {
        "/": { redirect: "/about" },
        "/s3": { swr: true }, // Stale While Revalidate (revalidate in background and send updated content with next response)
        "/s4": { swr: true }, // Stale While Revalidate (revalidate in background and send updated content with next response)
        "/nopag/s3": { swr: true }, // Stale While Revalidate (revalidate in background and send updated content with next response)
        "/nopag/s4": { swr: true }, // Stale While Revalidate (revalidate in background and send updated content with next response)
        // "/ssg_test": { prerender: true }, // static site generated (only at build time, not in dev environment)
    },
    // webpack: {
    //     extractCSS: true,
    // },
    devtools: { enabled: true },
    modules: ["@nuxtjs/tailwindcss"],
    imports: {
        dirs: ["graphql-api/*"], // Enable auto-discovery within given folders
    },
});
