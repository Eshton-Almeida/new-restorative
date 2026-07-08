import { ProductEligibility } from "@/constants/productRecommendations";
import { SurveySection } from "@/constants/surveyConstants";
import { SurveyResponsesOutputSchema } from "@/constants/surveySchema";
import { useSurveyState } from "@/constants/surveyState";
import { useEffect } from "react";

export function useAutoTransitionSurveyOnce({
  transition,
  currentSection,
  nextSection,
}: UseAutoTransitionSurveyParams) {
  const { transitionedSections, transitionSurvey, setTransitionedSections } =
    useSurveyState();

  useEffect(() => {
    if (!transition || transitionedSections.includes(currentSection)) return;

    transitionSurvey(nextSection);
    setTransitionedSections((prev) => [...prev, currentSection]);
  }, [
    transition,
    currentSection,
    nextSection,
    transitionedSections,
    setTransitionedSections,
    transitionSurvey,
  ]);
}
export interface UseAutoTransitionSurveyParams {
  currentSection: SurveySection;

  transition?: boolean;
  nextSection: SurveySection;
}

/**
 * In general, recommend Minoxidil (MC) for both men & women, with the possibility of also
 * adding Finasteride (F) for men only.
 * - MC 12.5% +/- F for men
 * - MC 8% + Caffeine for women
 *
 * If the user answered yes to any condition-related question (provided details), may need
 * to show an additional info page prior to product recommendation to indicate some
 * follow-up or review may be required, but they can pay now. Or it can be on the same
 * page.
 */
export function getProductRecommendation(
  surveyResponses: SurveyResponsesOutputSchema
) {
  if (surveyResponses.BiologicalSex === "Male") {
    // For males, w/o any contraindications we recommend MCF.
    // If they are allergic to F, we recommend MC.
    let productRecommendation = SurveySection.ProductRecommendation_MCF_125;
    if (surveyResponses.AdverseReactionFinasterideDetails) {
      productRecommendation = SurveySection.ProductRecommendation_MC_125;
    }

    return productRecommendation;
  }

  // For females, we always recommend MC_Caffeine.
  const productRecommendation = SurveySection.ProductRecommendation_MC_8;

  return productRecommendation;
}

export function getProductEligibility(
  surveyResponses: SurveyResponsesOutputSchema
) {
  let eligibility: ProductEligibility = ProductEligibility.Eligible;

  // If they answered "Yes" to any contraindication questions and therefore provided
  // details, their eligibility changes from Eligible -> Maybe.
  if (surveyResponses.HeartConditionDetails) {
    eligibility = ProductEligibility.Review;
  }
  if (surveyResponses.ScalpConditionsDetails) {
    eligibility = ProductEligibility.Review;
  }
  if (surveyResponses.BloodPressureConditionsDetails) {
    eligibility = ProductEligibility.Review;
  }
  if (surveyResponses.AllergicReactionMinoxidilDetails) {
    eligibility = ProductEligibility.Review;
  }

  return eligibility;
}
