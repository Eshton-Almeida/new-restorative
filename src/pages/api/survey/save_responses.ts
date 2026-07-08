import { AdminApiVersion, StoreDomain } from "@/utils/env";
import { gql, GraphQLClient } from "graphql-request";
import { NextApiRequest, NextApiResponse } from "next";

export type SaveSurveyResponsesRequestBody = {
  customerId: string;
  surveyResponses: string;
  productEligibility: string;
  recommendedProduct: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log(req);
  const {
    customerId,
    surveyResponses,
    productEligibility,
    recommendedProduct,
  } = req.body as SaveSurveyResponsesRequestBody;

  console.log({
    customerId,
    surveyResponses,
    productEligibility,
    recommendedProduct,
  });

  // NB: This *overrides* existing fields (not a PATCH).
  const response = await AdminApi.request(document, {
    customerId: `gid://shopify/Customer/${customerId}`,
    surveyResponses,
    tags: [productEligibility, recommendedProduct],
  });

  res.status(200).json(response);
}

const AdminApi = new GraphQLClient(
  `https://${StoreDomain}/admin/api/${AdminApiVersion}/graphql.json`,
  {
    headers: {
      "X-Shopify-Access-Token": process.env.SHOPIFY_ADMIN_API_KEY!,
    },
  }
);

const document = gql`
  mutation updateCustomerWithSurveyResponses(
    $customerId: ID!
    $surveyResponses: String!
    $tags: [String!]!
  ) {
    customerUpdate(
      input: { id: $customerId, tags: $tags, note: $surveyResponses }
    ) {
      customer {
        id
      }
      userErrors {
        message
      }
    }
  }
`;
