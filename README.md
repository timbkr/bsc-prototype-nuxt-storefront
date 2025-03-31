# Environment Variables that need to be set:

(.env File in devMode, depends on hosting in production)

To Fetch Products from Shopify:
Shopify GraphQL-Storefront-API credentials are needed to fetch Products from shopify
NUXT_PUBLIC_STORE_URL=https://YOUR-STORE-ADRESS.myshopify.com/admin/api/;
NUXT_PUBLIC_STOREFRONT_ACCESS_TOKEN=YOUR-STOREFRONT-API-ACCESS-TOKEN;

Webhooks:
Shopify GraphQL-Storefront-API credentials are needed to fetch Products from shopify
NUXT_ADMIN_API_URL=https://YOUR-STORE-ADRESS.myshopify.com/admin/api/
NUXT_ADMIN_API_ACCESS_TOKEN=YOUR-ADMIN-API-ACCESS-TOKEN

Specify CallbackURL for Webhook routes ("/webhook/products/\*\*")
Needed Env Vars:

DevMode:
only in devMode needed when wanting to use Webhooks (for /products3(ssr with cache) + /products4 (ssg)):
NGROK_AUTHTOKEN=YOUR-NGROK-AUTHTOKEN

(optional) to force use of ngrok and not NUXT_DEPLOY_URL in production + preview
NUXT_FORCE_NGROK_URL=http://localhost:3000

Production:
in production if wanting to use Webhooks:
NUXT_DEPLOY_URL=YOUR-DEPLOY-URL

# Nuxt 3 Minimal Starter

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install the dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm run preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

Locally build and preview production build:
```bash
# npm
npm run build; npm run preview
```
