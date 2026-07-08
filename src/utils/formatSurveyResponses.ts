import { SurveyResponsesOutputSchema } from "@/constants/surveySchema";

export function formatSurveyResponses(
  surveyResponses: Partial<SurveyResponsesOutputSchema>
) {
  const lines: string[] = [];

  if (surveyResponses.HeartConditionDetails) {
    lines.push("Heart Condition Details:");
    lines.push(surveyResponses.HeartConditionDetails);
    lines.push("");
  }
  if (surveyResponses.ScalpConditionsDetails) {
    lines.push("Scalp Condition Details:");
    lines.push(surveyResponses.ScalpConditionsDetails);
    lines.push("");
  }
  if (surveyResponses.BloodPressureConditionsDetails) {
    lines.push("Blood Pressure Condition Details:");
    lines.push(surveyResponses.BloodPressureConditionsDetails);
    lines.push("");
  }
  if (surveyResponses.AllergicReactionMinoxidilDetails) {
    lines.push("Minoxidil Allergic Reaction Details:");
    lines.push(surveyResponses.AllergicReactionMinoxidilDetails);
    lines.push("");
  }
  if (surveyResponses.AdverseReactionFinasterideDetails) {
    lines.push("Finasteride Adverse Reaction Details:");
    lines.push(surveyResponses.AdverseReactionFinasterideDetails);
    lines.push("");
  }

  lines.push("-----------------");

  // Format place of residence
  const province = surveyResponses.PlaceOfResidence?.province ?? "Unknown";
  const country = surveyResponses.PlaceOfResidence?.country ?? "Unknown";
  lines.push(`Location: ${province}, ${country}`);

  // Format date of birth
  const month = surveyResponses.DateOfBirth?.month ?? "Unknown";
  const day = surveyResponses.DateOfBirth?.day ?? "Unknown";
  const year = surveyResponses.DateOfBirth?.year ?? "Unknown";
  const dob = `${month}-${day}-${year}`;
  lines.push(`Date of Birth: ${dob}`);

  // Format hair loss and sex
  lines.push(
    `Hair Loss Experienced: ${surveyResponses.HairLossExperienced ?? "Unknown"}`
  );
  lines.push(`Biological Sex: ${surveyResponses.BiologicalSex ?? "Unknown"}`);

  // Format pregnancy status if applicable
  if (surveyResponses.PregnancyStatusConditions) {
    lines.push(
      `Pregnancy Status: ${surveyResponses.PregnancyStatusConditions}`
    );
  }

  // Format conditions and their details
  lines.push(
    `Heart Conditions: ${surveyResponses.HeartConditions ?? "Unknown"}`
  );
  lines.push(
    `Scalp Conditions: ${surveyResponses.ScalpConditions ?? "Unknown"}`
  );
  lines.push(
    `Blood Pressure Conditions: ${
      surveyResponses.BloodPressureConditions ?? "Unknown"
    }`
  );

  // Format required clinical consent confirmations
  lines.push(
    `Virtual Care & Treatment Consent: ${
      surveyResponses.VirtualCareTreatmentConsent ? "Confirmed" : "Not Confirmed"
    }`
  );
  lines.push(
    `Privacy & Information Sharing: ${
      surveyResponses.PrivacyInformationSharingConsent
        ? "Confirmed"
        : "Not Confirmed"
    }`
  );
  lines.push(
    `Accuracy Confirmation: ${
      surveyResponses.AccuracyConfirmation ? "Confirmed" : "Not Confirmed"
    }`
  );
  lines.push(
    `Ongoing Health Updates: ${
      surveyResponses.OngoingHealthUpdatesConsent
        ? "Confirmed"
        : "Not Confirmed"
    }`
  );

  lines.push(
    `Minoxidil Allergic Reaction: ${
      surveyResponses.AllergicReactionMinoxidil ?? "Unknown"
    }`
  );

  // Since only males answer this question
  if (surveyResponses.AdverseReactionFinasteride !== undefined) {
    lines.push(
      `Finasteride Adverse Reaction: ${surveyResponses.AdverseReactionFinasteride}`
    );
  }

  return lines.join("\n");
}
