import { SurveySingleSelectContentView } from "@/components/ui/SurveyQuestionInputs";
import { SurveyQuestionLayout } from "@/components/ui/SurveyQuestionLayout";
import { yesNoOptions } from "@/constants/commonOptions";
import { SurveySection } from "@/constants/surveyConstants";
import { useSurveyForm } from "@/constants/surveyForm";

export function BloodPressureConditionsQuestion() {
  const { watch, setValue } = useSurveyForm();
  const response = watch("BloodPressureConditions");

  const nextSection =
    response === "Yes"
      ? SurveySection.BloodPressureConditionsDetails
      : SurveySection.ClinicalConsent;

  return (
    <SurveyQuestionLayout
      header="Do you have any blood pressure conditions?"
      description="This information helps us ensure the safety of our treatment recommendations."
      transition={Boolean(response)}
      currentSection={SurveySection.BloodPressureConditions}
      nextSection={nextSection}
      backSection={SurveySection.ScalpConditions}
    >
      <SurveySingleSelectContentView
        value={response}
        onValueChange={(value) => setValue("BloodPressureConditions", value)}
        options={yesNoOptions}
        activeId={response}
      />
    </SurveyQuestionLayout>
  );
}
