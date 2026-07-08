import { StorefrontApi } from "@/hooks/storefront/apiClient";
import { Product } from "@shopify/hydrogen-react/storefront-api-types";
import { gql } from "graphql-request";
import useSWR from "swr";

const document = gql`
  query getProductById($id: ID!) {
    product(id: $id) {
      title
      descriptionHtml
      priceRange {
        maxVariantPrice {
          amount
          currencyCode
        }
      }
      featuredImage {
        url
        altText
        height
        width
      }
      variants(first: 1) {
        nodes {
          id
        }
      }
    }
  }
`;

export async function getProductDetails(id: string) {
  const response: { product: Product } = await StorefrontApi.request(document, {
    id,
  });
  return response.product;
}

export function useProductDetails(id: string) {
  return useSWR(`product-details-${id}`, () => getProductDetails(id));
}
