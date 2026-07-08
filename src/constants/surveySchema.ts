import { SurveySection } from "@/constants/surveyConstants";
import { atomWithStorage } from "jotai/utils";
import { z } from "zod";

export const SurveyResponses = z.object({
  PlaceOfResidence: z.object({
    country: z.string(),
    province: z.string(),
  }),
  DateOfBirth: z.object({
    month: z
      .string()
      .refine(
        (input) => {
          if (!input) return true;
          try {
            const monthNum = parseInt(input, 10);
            return monthNum >= 1 && monthNum <= 12;
          } catch {
            return false;
          }
        },
        {
          message: "Month must be 1-12",
        }
      )
      .transform(Number),
    day: z.string().refine(
      (input) => {
        if (!input) return true;
        try {
          const dayNum = parseInt(input, 10);
          // NB: We don't check whether the day is valid for the given month.
          return dayNum >= 1 && dayNum <= 31;
        } catch {
          return false;
        }
      },
      {
        message: "Day must be 1-31",
      }
    ),
    year: z.string().refine(
      (input) => {
        if (!input) return true;
        try {
          const yearNum = parseInt(input, 10);
          const currentYear = new Date().getFullYear();
          return yearNum >= 1900 && yearNum <= currentYear;
        } catch {
          return false;
        }
      },
      {
        message: `Year must be 1900-${new Date().getFullYear()}`,
      }
    ),
  }),
  HairLossExperienced: z
    .string()
    .transform((val) => val as "Severe" | "Moderate" | "Little" | "None"),
  BiologicalSex: z.string().transform((val) => val as "Male" | "Female"),
  // Only presented if user selected "Female" in previous biological sex question.
  PregnancyStatusConditions: z.string().transform((val) => val as YesNo),
  HeartConditions: z.string().transform((val) => val as YesNo),
  HeartConditionDetails: z.string(),
  ScalpConditions: z.string().transform((val) => val as YesNo),
  ScalpConditionsDetails: z.string(),
  BloodPressureConditions: z.string().transform((val) => val as YesNo),
  BloodPressureConditionsDetails: z.string(),
  VirtualCareTreatmentConsent: z.boolean(),
  PrivacyInformationSharingConsent: z.boolean(),
  AccuracyConfirmation: z.boolean(),
  OngoingHealthUpdatesConsent: z.boolean(),
  AllergicReactionMinoxidil: z.string().transform((val) => val as YesNo),
  AllergicReactionMinoxidilDetails: z.string(),
  AdverseReactionFinasteride: z.string().transform((val) => val as YesNo),
  AdverseReactionFinasterideDetails: z.string(),
});
export type SurveyResponsesInputSchema = z.input<typeof SurveyResponses>;
export type SurveyResponsesOutputSchema = z.output<typeof SurveyResponses>;

type YesNo = "Yes" | "No";

export const DefaultSurveyResponses: SurveyResponsesInputSchema = {
  PlaceOfResidence: {
    country: "",
    province: "",
  },
  DateOfBirth: {
    month: "",
    day: "",
    year: "",
  },
  HairLossExperienced: "",
  BiologicalSex: "",
  PregnancyStatusConditions: "",
  HeartConditions: "",
  HeartConditionDetails: "",
  ScalpConditions: "",
  ScalpConditionsDetails: "",
  BloodPressureConditions: "",
  BloodPressureConditionsDetails: "",
  VirtualCareTreatmentConsent: false,
  PrivacyInformationSharingConsent: false,
  AccuracyConfirmation: false,
  OngoingHealthUpdatesConsent: false,
  AllergicReactionMinoxidil: "",
  AllergicReactionMinoxidilDetails: "",
  AdverseReactionFinasteride: "",
  AdverseReactionFinasterideDetails: "",
};

export const DetailQuestionKeys = [
  SurveySection.HeartConditionsDetails,
  SurveySection.ScalpConditionsDetails,
  SurveySection.BloodPressureConditionsDetails,
  SurveySection.AllergicReactionMinoxidilDetails,
  SurveySection.AdverseReactionFinasterideDetails,
];

export const SurveyResponsesAtom = atomWithStorage<SurveyResponsesInputSchema>(
  "survey-responses",
  DefaultSurveyResponses
);
