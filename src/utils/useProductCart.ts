import { ProductEligibility } from "@/constants/productRecommendations";
import { SurveyResponsesOutputSchema } from "@/constants/surveySchema";
import { formatSurveyResponses } from "@/utils/formatSurveyResponses";
import { useCart } from "@shopify/hydrogen-react";
import { useEffect } from "react";

interface UseProductCartParams {
  /**
   * NB: This merchandiseId must be the ID of a specific product variant, not the overall
   * product.
   */
  merchandiseId: string;
  eligibility: ProductEligibility;
  surveyResponses: SurveyResponsesOutputSchema;
}

export function useProductCart({
  merchandiseId,
  eligibility,
  surveyResponses,
}: UseProductCartParams) {
  const { cartCreate, checkoutUrl, cartReady } = useCart();

  const surveyResponsesString = JSON.stringify(surveyResponses);

  useEffect(() => {
    if (!cartReady) return;

    const parsedSurveyResponses = JSON.parse(surveyResponsesString);
    const formattedSurveyResponses = formatSurveyResponses(
      parsedSurveyResponses
    );

    // NB: I believe if this is called multiple times, the cart should be overwritten
    // rather than updated, so we don't need to worry about multiple products being added
    // to the cart.
    cartCreate({
      lines: [{ merchandiseId, quantity: 1 }],
      attributes: [
        {
          key: "Status",
          value: eligibility,
        },
      ],
      note: formattedSurveyResponses,
    });
  }, [
    cartCreate,
    cartReady,
    eligibility,
    merchandiseId,
    surveyResponsesString,
  ]);

  return { checkoutUrl };
}
