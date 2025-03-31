import { gql, GraphQLClient } from "graphql-request";
import {
    getProducts,
    getCartByID,
    getProductByHandle,
    getProductRecommendations,
    getVariantBySelectedOptions,
} from "../utils/gqlUtils";
// import { getFirstXProducts } from '~/graphql-api/utils/gqlUtils'

/**
 * ---------------------------------------- Products ----------------------------------------
 */
export async function useGetFirstXProducts(numberOfProducts: globalThis.Ref) {
    const { $graphQLClient } = useNuxtApp();
    const { data, error, refresh, pending } = await useAsyncData(
        "firstXProducts",
        () => { 
            if(!$graphQLClient) return Promise.reject("Reject useGetFirstXProducts() - $graphQLCLient === null, check if all needed environment variables are set!");
            return getFirstXProducts($graphQLClient, numberOfProducts.value)},
        {
            // watch: [numberOfProducts]
        }
    );
    return { data, error, refresh, pending };
}

export async function useGetProducts(
    first: number,
    after: string,
    customFilterANDSortQuery?: string
) {
    const { $graphQLClient } = useNuxtApp();
    const { data, error, refresh, pending } = await useAsyncData(
        "getProducts",
        () =>{
            if(!$graphQLClient) return Promise.reject("Reject useProducts() - $graphQLCLient === null, check if all needed environment variables are set!");
            return getProducts(
                $graphQLClient,
                first,
                after,
                customFilterANDSortQuery || ""
            )}
    );
    return { data, error, refresh, pending };
}


// Fetch all Products via cursor based pagination and return concated array
export async function useGetAllProducts(
    first: number,
    customFilterANDSortQuery?: string
) {
    const { $graphQLClient } = useNuxtApp();
    const { data, error, refresh, pending } = await useAsyncData(
        "getAllProducts",
        async () => {
            return new Promise(async (resolve, reject) => {
                if(!$graphQLClient) return reject("Reject useGetAllProducts() - $graphQLCLient === null, check if all needed environment variables are set!")
                try {
                    let products = <any>[];
                    let res = await getProducts(
                        $graphQLClient,
                        first,
                        "",
                        customFilterANDSortQuery || ""
                    );
                    products = res.products.nodes;
                    while (res.products.pageInfo.hasNextPage) {
                        const endCursor = res.products.pageInfo.endCursor;
                        res = await getProducts(
                            $graphQLClient,
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
                    console.warn("ERROR - useGetAllProducts()")
                    return reject(err);
                }
            });
        }
    );
    return { data, error, refresh, pending };
}

export async function useGetProductByHandle(handle: string) {
    const { $graphQLClient } = useNuxtApp();
    const { data, error, refresh, pending } = await useAsyncData(
        "getProductByHandle",
        () =>{
            if(!$graphQLClient) return Promise.reject("Reject useGetProductByHandle() - $graphQLCLient === null, check if all needed environment variables are set!");
            return getProductByHandle($graphQLClient, handle)
        } 
    );
    return { data, error, refresh, pending };
}

export async function useGetVariantBySelectedOptions(
    handle: String,
    selectedOptionsInput: Array<any>
) {
    const { $graphQLClient } = useNuxtApp();
    const { data, error, refresh, pending } = await useAsyncData(
        "getVariantBySelectedOptions",
        () =>{
            if(!$graphQLClient) return Promise.reject("Reject useGetVariantBySelectedOptions() - $graphQLCLient === null, check if all needed environment variables are set!");
            return getVariantBySelectedOptions(
                $graphQLClient,
                handle,
                selectedOptionsInput
            )
        }
    );
    return { data, error, refresh, pending };
}

export async function useGetProductRecommendations(id: string) {
    const { $graphQLClient } = useNuxtApp();
    const { data, error, refresh, pending } = await useAsyncData(
        "getProductRecommendations",
        () => { 
            if(!$graphQLClient) return Promise.reject("Reject useGetProductRecommendations() - $graphQLCLient === null, check if all needed environment variables are set!");
            return getProductRecommendations($graphQLClient, id) 
        }
        // {
        //      watch: [id]
        // }
    );
    return { data, error, refresh, pending };
}

/**
 * ---------------------------------------- Cart Management ----------------------------------------
 */

export async function useGetCartByID(cartID: string) {
    const { $graphQLClient } = useNuxtApp();
    const { data, error, refresh, pending } = await useAsyncData(
        "useGetCartByID",
        () => { 
            if(!$graphQLClient) return Promise.reject("Reject useGetCartByID() - $graphQLCLient === null, check if all needed environment variables are set!");
            return getCartByID($graphQLClient, cartID)
        }
    );
    return { data, error, refresh, pending };
}

export async function useCreateCart(cartInput: Object) {
    const { $graphQLClient } = useNuxtApp();
    const { data, error, refresh, pending } = await useAsyncData(
        "useCreateCart",
        () => { 
            if(!$graphQLClient) return Promise.reject("Reject useCreateCart() - $graphQLCLient === null, check if all needed environment variables are set!");
            return createCart($graphQLClient, cartInput)
        }
    );
    return { data, error, refresh, pending };
}

export async function useAddCartLines(cartID: string, cartInput: Object) {
    const { $graphQLClient } = useNuxtApp();
    const { data, error, refresh, pending } = await useAsyncData(
        "useAddCartLines",
        () => {
         if(!$graphQLClient) return Promise.reject("Reject useAddCartLines() - $graphQLCLient === null, check if all needed environment variables are set!");
         return addCartLines($graphQLClient, cartID, cartInput)
        }
    );
    return { data, error, refresh, pending };
}

export async function useRemoveCartLines(
    cartID: string,
    lineIDs: Array<string>
) {
    const { $graphQLClient } = useNuxtApp();
    const { data, error, refresh, pending } = await useAsyncData(
        "useRemoveCartLines",
        () => {
         if(!$graphQLClient) return Promise.reject("Reject useRemoveCartLines() - $graphQLCLient === null, check if all needed environment variables are set!");
         return removeCartLines($graphQLClient, cartID, lineIDs)
        }
    );
    return { data, error, refresh, pending };
}

export async function useUpdateCartLines(cartID: string, lines: Array<object>) {
    const { $graphQLClient } = useNuxtApp();
    const { data, error, refresh, pending } = await useAsyncData(
        "useUpdateCartLines",
        () => {
            if(!$graphQLClient) return Promise.reject("Reject useUpdateCartLines() - $graphQLCLient === null, check if all needed environment variables are set!");
            return updateCartLines($graphQLClient, cartID, lines)
        }
    );
    return { data, error, refresh, pending };
}
