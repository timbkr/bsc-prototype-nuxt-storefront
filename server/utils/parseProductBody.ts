export function parseProductBody(body: any) {
  console.log("body = ");
  console.log(body);
    const newProduct = {
        id: body.admin_graphql_api_id,
        title: body.title,
        description: convertToPlain(body.body_html),
        handle: body.handle,
        featuredImage: getFeaturedImage(body),
        priceRange: {
            minVariantPrice: {
                amount: getMinVariantPrice(body.variants),
                currencyCode: "EUR", //CurrentlyHardcoded, for internation use have to find a way to get it dynamically
            },
        },
        variants: {
            edges: createVariantsArray(body.variants),
        },
    };

    return newProduct;
}

/**
 * ------------- Helper / Utility Functions: -----------------
 */

function getFeaturedImage(body: any) {
  console.log("body.images = " + body.images )
    if (body.images && body.images[0]) {
        return {
            url: body.images[0].src ? body.images[0].src : null,
            altText: body.images[0].alt ? body.images[0].alt : null,
        };
    }
    return null;
}

function getMinVariantPrice(variants: any): number {
    let minVariantPrice = 0.0;
    (variants as Array<any>)?.forEach((elem) => {
        if (
            parseFloat(elem.price) < minVariantPrice ||
            minVariantPrice === 0.0
        ) {
            minVariantPrice = elem.price;
        }
    });
    return minVariantPrice;
}

function createVariantsArray(variants: any): Array<any> {
    const res: any[] = [];
    console.log(variants);
    (variants as Array<any>)?.forEach((elem) => {
        const variant = {
            title: elem.title,
            images: elem.image
                ? {
                      url: elem.image?.url,
                      altText: elem.image?.altText,
                  }
                : null,
        };
        res.push(variant);
    });
    return res;
}

function convertToPlain(html: string) {
    if (!html) return "";
    const myHTML = html;
    const strippedHtml = myHTML.replace(/<[^>]+>/g, "");
    console.log("strippedHtml = ");
    console.log(strippedHtml);
    return strippedHtml;
}

// API SCHEMAS used to create parseFunction:
/*
Storefront_Product_Schema_shouldBeLikesThis = {
    "id": "gid://shopify/Product/8520488485109",
    "title": "test8cdssdddddXXxx",
    "description": "my description",
    "handle": "test8c",
    "featuredImage": {
      "url": "https://cdn.shopify.com/s/files/1/0695/8376/5749/files/pexels-photo-346529.jpg?v=1714805365",
      "altText": null
    },
    "priceRange": {
      "minVariantPrice": {
        "amount": "10.0",
        "currencyCode": "EUR"
      }
    },
    "variants": {
      "edges": [
        {
          "node": {
            "title": "s",
            "image": {
              "url": "https://cdn.shopify.com/s/files/1/0695/8376/5749/files/pexels-photo-346529.jpg?v=1714805365",
              "altText": null
            }
          }
        },
        {
          "node": {
            "title": "m",
            "image": {
              "url": "https://cdn.shopify.com/s/files/1/0695/8376/5749/files/pexels-photo-346529.jpg?v=1714805365",
              "altText": null
            }
          }
        },
        {
          "node": {
            "title": "l",
            "image": {
              "url": "https://cdn.shopify.com/s/files/1/0695/8376/5749/files/pexels-photo-346529.jpg?v=1714805365",
              "altText": null
            }
          }
        }
      ]
    }
  }
  
 WebhookPayload_body =
  {
    admin_graphql_api_id: 'gid://shopify/Product/8520488485109',
    body_html: '<p>my</p>\n<p>description</p>',
    created_at: '2024-05-03T02:33:39-04:00',
    handle: 'test8c',
    id: 8520488485109,
    product_type: '',
    published_at: '2024-05-03T02:33:39-04:00',
    template_suffix: '',
    title: 'test8cdssdddddXXxx',
    updated_at: '2024-05-07T02:16:16-04:00',
    vendor: 'tb-bsc-thesis',
    status: 'active',
    published_scope: 'global',
    tags: '',
    variants: [
      {
        admin_graphql_api_id: 'gid://shopify/ProductVariant/45281987068149',
        barcode: '',
        compare_at_price: null,
        created_at: '2024-05-04T02:37:05-04:00',
        fulfillment_service: 'manual',
        id: 45281987068149,
        inventory_management: 'shopify',
        inventory_policy: 'deny',
        position: 4,
        price: '10.00',
        product_id: 8520488485109,
        sku: '',
        taxable: true,
        title: 's',
        updated_at: '2024-05-04T02:37:05-04:00',
        option1: 's',
        option2: null,
        option3: null,
        grams: 0,
        image_id: null,
        weight: 0,
        weight_unit: 'kg',
        inventory_item_id: 47379515670773,
        inventory_quantity: 1,
        old_inventory_quantity: 1,
        requires_shipping: true
      },
      {
        admin_graphql_api_id: 'gid://shopify/ProductVariant/45281987100917',
        barcode: '',
        compare_at_price: null,
        created_at: '2024-05-04T02:37:05-04:00',
        fulfillment_service: 'manual',
        id: 45281987100917,
        inventory_management: 'shopify',
        inventory_policy: 'deny',
        position: 5,
        price: '10.00',
        product_id: 8520488485109,
        sku: '',
        taxable: true,
        title: 'm',
        updated_at: '2024-05-04T02:37:05-04:00',
        option1: 'm',
        option2: null,
        option3: null,
        grams: 0,
        image_id: null,
        weight: 0,
        weight_unit: 'kg',
        inventory_item_id: 47379515703541,
        inventory_quantity: 1,
        old_inventory_quantity: 1,
        requires_shipping: true
      },
      {
        admin_graphql_api_id: 'gid://shopify/ProductVariant/45281987133685',
        barcode: '',
        compare_at_price: null,
        created_at: '2024-05-04T02:37:05-04:00',
        fulfillment_service: 'manual',
        id: 45281987133685,
        inventory_management: 'shopify',
        inventory_policy: 'deny',
        position: 6,
        price: '15.00',
        product_id: 8520488485109,
        sku: '',
        taxable: true,
        title: 'l',
        updated_at: '2024-05-07T02:16:16-04:00',
        option1: 'l',
        option2: null,
        option3: null,
        grams: 0,
        image_id: null,
        weight: 0,
        weight_unit: 'kg',
        inventory_item_id: 47379515736309,
        inventory_quantity: 1,
        old_inventory_quantity: 1,
        requires_shipping: true
      }
    ],
    options: [
      {
        name: 'Größe',
        id: 10872052449525,
        product_id: 8520488485109,
        position: 1,
        values: [Array]
      }
    ],
    images: [
      {
        id: 40668352774389,
        product_id: 8520488485109,
        position: 1,
        created_at: '2024-05-04T02:49:24-04:00',
        updated_at: '2024-05-04T02:49:25-04:00',
        alt: null,
        width: 600,
        height: 400,
        src: 'https://cdn.shopify.com/s/files/1/0695/8376/5749/files/pexels-photo-346529.jpg?v=1714805365',
        variant_ids: [],
        admin_graphql_api_id: 'gid://shopify/ProductImage/40668352774389'
      }
    ],
    image: {
      id: 40668352774389,
      product_id: 8520488485109,
      position: 1,
      created_at: '2024-05-04T02:49:24-04:00',
      updated_at: '2024-05-04T02:49:25-04:00',
      alt: null,
      width: 600,
      height: 400,
      src: 'https://cdn.shopify.com/s/files/1/0695/8376/5749/files/pexels-photo-346529.jpg?v=1714805365',
      variant_ids: [],
      admin_graphql_api_id: 'gid://shopify/ProductImage/40668352774389'
    },
    variant_gids: [
      {
        admin_graphql_api_id: 'gid://shopify/ProductVariant/45281987068149'
      },
      {
        admin_graphql_api_id: 'gid://shopify/ProductVariant/45281987100917'
      },
      {
        admin_graphql_api_id: 'gid://shopify/ProductVariant/45281987133685'
      }
    ]
  }  
*/
