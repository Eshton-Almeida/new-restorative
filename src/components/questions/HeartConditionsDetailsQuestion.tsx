import { SurveyQuestionLayout } from "@/components/ui/SurveyQuestionLayout";
import { SurveySection } from "@/constants/surveyConstants";
import { useSurveyForm } from "@/constants/surveyForm";

export function HeartConditionsDetailsQuestion() {
  const { watch, setValue } = useSurveyForm();
  const response = watch("HeartConditionDetails");

  return (
    <SurveyQuestionLayout
      header="Please describe your heart conditions"
      description="This helps us ensure your treatment plan is safe for you."
      currentSection={SurveySection.HeartConditionsDetails}
      nextSection={SurveySection.ScalpConditions}
      backSection={SurveySection.HeartConditions}
      disableNext={!Boolean(response)}
    >
      <textarea
        value={response}
        onChange={(e) => setValue("HeartConditionDetails", e.target.value)}
        placeholder="Please provide details about your heart conditions..."
      />
    </SurveyQuestionLayout>
  );
}
