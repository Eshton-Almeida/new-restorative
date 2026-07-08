import { SurveyQuestionLayout } from "@/components/ui/SurveyQuestionLayout";
import { SurveySection } from "@/constants/surveyConstants";
import { useSurveyForm } from "@/constants/surveyForm";

export function ScalpConditionsDetailsQuestion() {
  const { watch, setValue } = useSurveyForm();
  const response = watch("ScalpConditionsDetails");

  return (
    <SurveyQuestionLayout
      header="Please describe your scalp condition(s)."
      description="This helps us ensure the treatment won't cause any adverse reactions."
      currentSection={SurveySection.ScalpConditionsDetails}
      nextSection={SurveySection.BloodPressureConditions}
      backSection={SurveySection.ScalpConditions}
      disableNext={!response}
    >
      <textarea
        value={response}
        onChange={(e) => setValue("ScalpConditionsDetails", e.target.value)}
        placeholder="Provide details..."
      />
    </SurveyQuestionLayout>
  );
}
