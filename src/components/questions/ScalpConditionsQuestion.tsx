import { SurveySingleSelectContentView } from "@/components/ui/SurveyQuestionInputs";
import { SurveyQuestionLayout } from "@/components/ui/SurveyQuestionLayout";
import { yesNoOptions } from "@/constants/commonOptions";
import { SurveySection } from "@/constants/surveyConstants";
import { useSurveyForm } from "@/constants/surveyForm";

export function ScalpConditionsQuestion() {
  const { watch, setValue } = useSurveyForm();
  const response = watch("ScalpConditions");

  const nextSection =
    response === "Yes"
      ? SurveySection.ScalpConditionsDetails
      : SurveySection.BloodPressureConditions;

  return (
    <SurveyQuestionLayout
      header="Do you have any scalp conditions or irritation?"
      description="This helps us ensure the treatment won't cause any adverse reactions."
      transition={Boolean(response)}
      currentSection={SurveySection.ScalpConditions}
      nextSection={nextSection}
      backSection={SurveySection.HeartConditions}
    >
      <SurveySingleSelectContentView
        value={response}
        onValueChange={(value) => setValue("ScalpConditions", value)}
        options={yesNoOptions}
        activeId={response}
      />
    </SurveyQuestionLayout>
  );
}
