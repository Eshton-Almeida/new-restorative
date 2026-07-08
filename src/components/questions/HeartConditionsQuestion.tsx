import { SurveySingleSelectContentView } from "@/components/ui/SurveyQuestionInputs";
import { SurveyQuestionLayout } from "@/components/ui/SurveyQuestionLayout";
import { yesNoOptions } from "@/constants/commonOptions";
import { SurveySection } from "@/constants/surveyConstants";
import { useSurveyForm } from "@/constants/surveyForm";

export function HeartConditionsQuestion() {
  const { watch, setValue } = useSurveyForm();
  const response = watch("HeartConditions");

  const previousSection =
    watch("BiologicalSex") === "Female"
      ? SurveySection.PregnancyStatusConditions
      : SurveySection.BiologicalSex;

  const nextSection =
    response === "Yes"
      ? SurveySection.HeartConditionsDetails
      : SurveySection.ScalpConditions;

  return (
    <SurveyQuestionLayout
      header="Do you have any heart conditions?"
      description="This information helps us determine suitable treatment options."
      transition={Boolean(response)}
      currentSection={SurveySection.HeartConditions}
      nextSection={nextSection}
      backSection={previousSection}
    >
      <SurveySingleSelectContentView
        value={response}
        onValueChange={(value) => setValue("HeartConditions", value)}
        options={yesNoOptions}
        activeId={response}
      />
    </SurveyQuestionLayout>
  );
}
