import {
  ProductEligibility,
  ProductRecommendation,
} from "@/constants/productRecommendations";
import { SurveyResponsesOutputSchema } from "@/constants/surveySchema";
import { SaveSurveyResponsesRequestBody } from "@/pages/api/survey/save_responses";
import { formatSurveyResponses } from "@/utils/formatSurveyResponses";
import useSWR from "swr";

interface SaveSurveyResponsesProps {
  customerId: string | null;

  surveyResponses: SurveyResponsesOutputSchema;

  recommendedProduct: ProductRecommendation;
  productEligibility: ProductEligibility;
}

export function useSaveSurveyResponses({
  customerId,
  surveyResponses,
  recommendedProduct,
  productEligibility,
}: SaveSurveyResponsesProps) {
  const formattedSurveyResponses = formatSurveyResponses(surveyResponses);

  const result = useSWR("save-survey-responses", async () => {
    if (!customerId) {
      throw new Error("Customer ID is required");
    }

    const response = await fetch("/api/survey/save_responses", {
      method: "POST",
      body: JSON.stringify({
        customerId,
        surveyResponses: formattedSurveyResponses,
        productEligibility,
        recommendedProduct,
      } satisfies SaveSurveyResponsesRequestBody),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to save survey responses");
    }

    return response.json();
  });

  return result;
}
