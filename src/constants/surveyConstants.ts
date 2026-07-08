export enum SurveySection {
  Start = "Start",

  // NB: Make sure question enum values match SurveyQuestion enum in @surveySchema.ts
  PlaceOfResidence = "PlaceOfResidence",
  RestrictedLocation = "RestrictedLocation",

  DateOfBirth = "DateOfBirth",
  RestrictedAge = "RestrictedAge",

  HairLossExperienced = "HairLossExperienced",
  BiologicalSex = "BiologicalSex",

  PregnancyStatusConditions = "PregnancyStatusConditions",
  RestrictedPregnancyStatus = "RestrictedPregnancyStatus",

  HeartConditions = "HeartConditions",
  HeartConditionsDetails = "HeartConditionsDetails",

  ScalpConditions = "ScalpConditions",
  ScalpConditionsDetails = "ScalpConditionsDetails",

  BloodPressureConditions = "BloodPressureConditions",
  BloodPressureConditionsDetails = "BloodPressureConditionsDetails",

  ClinicalConsent = "ClinicalConsent",

  AllergicReactionMinoxidil = "AllergicReactionMinoxidil",
  AllergicReactionMinoxidilDetails = "AllergicReactionMinoxidilDetails",

  AdverseReactionFinasteride = "AdverseReactionFinasteride",
  AdverseReactionFinasterideDetails = "AdverseReactionFinasterideDetails",

  ProductRecommendation_MC_125 = "ProductRecommendation_MC_125",
  ProductRecommendation_MCF_125 = "ProductRecommendation_MCF_125",
  ProductRecommendation_MC_8 = "ProductRecommendation_MC_8",
}
