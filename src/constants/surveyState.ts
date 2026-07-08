import { useSurveyForm } from "@/constants/surveyForm";
import { atom, useAtom } from "jotai";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { SurveySection } from "./surveyConstants";

export function useSurveyState() {
  const [transitionedSections, setTransitionedSections] =
    useAtom(TransitionedSections);

  const { pathname, push } = useRouter();

  const { reset } = useSurveyForm();

  const transitionSurvey = useCallback(
    async (section: SurveySection | null) => {
      if (!section) return;
      await push(SurveySectionToPath[section]);
    },
    [push]
  );

  const resetSurvey = useCallback(() => {
    reset();
    setTransitionedSections([]);
  }, [reset, setTransitionedSections]);

  const section = PathToSurveySection[pathname];

  return {
    section,
    transitionedSections,
    transitionSurvey,
    setTransitionedSections,
    resetSurvey,
  };
}

const SurveySectionToPath: Record<SurveySection, string> = {
  [SurveySection.Start]: "/",
  [SurveySection.PlaceOfResidence]: "/location",
  [SurveySection.RestrictedLocation]: "/location/not-available",
  [SurveySection.DateOfBirth]: "/dob",
  [SurveySection.RestrictedAge]: "/dob/not-available",
  [SurveySection.BiologicalSex]: "/biological-sex",
  [SurveySection.HairLossExperienced]: "/hair-loss",
  [SurveySection.PregnancyStatusConditions]: "/pregnancy-status",
  [SurveySection.RestrictedPregnancyStatus]: "/pregnancy-status/not-available",
  [SurveySection.HeartConditions]: "/heart-conditions",
  [SurveySection.HeartConditionsDetails]: "/heart-conditions/details",
  [SurveySection.ScalpConditions]: "/scalp-conditions",
  [SurveySection.ScalpConditionsDetails]: "/scalp-conditions/details",
  [SurveySection.BloodPressureConditions]: "/blood-pressure-conditions",
  [SurveySection.BloodPressureConditionsDetails]:
    "/blood-pressure-conditions/details",
  [SurveySection.ClinicalConsent]: "/clinical-consent",
  [SurveySection.AllergicReactionMinoxidil]: "/minoxidil-conditions",
  [SurveySection.AllergicReactionMinoxidilDetails]:
    "/minoxidil-conditions/details",
  [SurveySection.AdverseReactionFinasteride]: "/finasteride-conditions",
  [SurveySection.AdverseReactionFinasterideDetails]:
    "/finasteride-conditions/details",
  [SurveySection.ProductRecommendation_MC_125]: "/product/mc-125",
  [SurveySection.ProductRecommendation_MCF_125]: "/product/mcf-125",
  [SurveySection.ProductRecommendation_MC_8]: "/product/mc-8",
};

export const PathToSurveySection: Record<string, SurveySection> = {
  "/": SurveySection.Start,
  "/location": SurveySection.PlaceOfResidence,
  "/dob": SurveySection.DateOfBirth,
  "/biological-sex": SurveySection.BiologicalSex,
  "/dob/not-available": SurveySection.RestrictedAge,
  "/hair-loss": SurveySection.HairLossExperienced,
  "/pregnancy-status": SurveySection.PregnancyStatusConditions,
  "/pregnancy-status/not-available": SurveySection.RestrictedPregnancyStatus,
  "/heart-conditions": SurveySection.HeartConditions,
  "/heart-conditions/details": SurveySection.HeartConditionsDetails,
  "/scalp-conditions": SurveySection.ScalpConditions,
  "/scalp-conditions/details": SurveySection.ScalpConditionsDetails,
  "/blood-pressure-conditions": SurveySection.BloodPressureConditions,
  "/blood-pressure-conditions/details":
    SurveySection.BloodPressureConditionsDetails,
  "/clinical-consent": SurveySection.ClinicalConsent,
  "/minoxidil-conditions": SurveySection.AllergicReactionMinoxidil,
  "/minoxidil-conditions/details":
    SurveySection.AllergicReactionMinoxidilDetails,
  "/finasteride-conditions": SurveySection.AdverseReactionFinasteride,
  "/finasteride-conditions/details":
    SurveySection.AdverseReactionFinasterideDetails,
  "/product/minoxidil": SurveySection.ProductRecommendation_MC_125,
  "/product/finasteride": SurveySection.ProductRecommendation_MCF_125,
};

const TransitionedSections = atom<SurveySection[]>([]);
