import {
  StoreDomain,
  StorefrontApiVersion,
  StorefrontToken,
} from "@/utils/env";
import { GraphQLClient } from "graphql-request";

const StorefrontApiUrl = `https://${StoreDomain}/api/${StorefrontApiVersion}/graphql.json`;

export const StorefrontApi = new GraphQLClient(StorefrontApiUrl, {
  headers: {
    "X-Shopify-Storefront-Access-Token": StorefrontToken!,
  },
});
