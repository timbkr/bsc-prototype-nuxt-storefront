import { gql, GraphQLClient } from "graphql-request";
import { getProducts } from "~/graphql-api/utils/gqlUtils";

/**
 * Get + Set GQL Storefront Client
 */
let gqlStorefrontClient: GraphQLClient;

export function setGqlStorefrontClient(client: GraphQLClient) {
    gqlStorefrontClient = client;
}

export function getGqlStorefrontClient() {
    return gqlStorefrontClient;
}

/**
 * GQL Requests (using: '~/graphql-api/utils/gqlUtils')
 */
export const getAllProducts = async (
    first: number = 250,
    customFilterANDSortQuery: string = ""
) => {
    const graphQLClient = getGqlStorefrontClient();
    if(!graphQLClient) return Promise.reject("Server-getAllProducts() -> no graphQLClient initialized -> possible no env vars are set");
    return new Promise(async (resolve, reject) => {
        try {
            let products = <any>[];
            let res = await getProducts(
                graphQLClient,
                first,
                "",
                customFilterANDSortQuery
            );
            products = res.products.nodes;
            while (res.products.pageInfo.hasNextPage) {
                const endCursor = res.products.pageInfo.endCursor;
                res = await getProducts(
                    graphQLClient,
                    first,
                    endCursor,
                    customFilterANDSortQuery || ""
                );
                products = products.concat(res.products.nodes);
            }
            console.log("products.length");
            console.log(products.length);
            return resolve(products);
        } catch (err) {
            return reject(err);
        }
    });
};

export const getProductByID = async (productID: string) => {
    const graphQLClient = getGqlStorefrontClient();

    const variables = {
      id: `gid://shopify/Product/${productID}`
    }
    
    const query = gql`
        query getProductById($id: ID!) {
            product(id: $id) {
                id
                title
                description
                handle
                featuredImage {
                    url
                    altText
                }
                priceRange {
                    minVariantPrice {
                        amount
                        currencyCode
                    }
                }
                variants(first: 10) {
                    edges {
                        node {
                            title
                            image {
                                url
                                altText
                            }
                        }
                    }
                }
            }
        }
    `;
    try {
        const res = await graphQLClient.request(query,variables) as any;
        console.log("getProductByID:");
        console.log(res);
        return res;
    } catch (error: any) {
        console.log("Error - getProductByID:");
        console.log(error);
    }
};
