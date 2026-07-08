import { SurveyQuestionLayout } from "@/components/ui/SurveyQuestionLayout";
import { SurveySection } from "@/constants/surveyConstants";
import { useSurveyForm } from "@/constants/surveyForm";

export function BloodPressureConditionsDetailsQuestion() {
  const { watch, setValue } = useSurveyForm();
  const response = watch("BloodPressureConditionsDetails");

  return (
    <SurveyQuestionLayout
      header="Please describe your blood pressure conditions"
      description="This helps us ensure your treatment plan is safe for you."
      currentSection={SurveySection.BloodPressureConditionsDetails}
      nextSection={SurveySection.ClinicalConsent}
      backSection={SurveySection.BloodPressureConditions}
      disableNext={!response}
    >
      <textarea
        value={response}
        onChange={(e) =>
          setValue("BloodPressureConditionsDetails", e.target.value)
        }
        placeholder="Please provide details about your blood pressure conditions..."
      />
    </SurveyQuestionLayout>
  );
}
