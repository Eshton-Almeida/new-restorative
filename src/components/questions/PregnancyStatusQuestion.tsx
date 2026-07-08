import { SurveySingleSelectContentView } from "@/components/ui/SurveyQuestionInputs";
import { SurveyQuestionLayout } from "@/components/ui/SurveyQuestionLayout";
import { yesNoOptions } from "@/constants/commonOptions";
import { SurveySection } from "@/constants/surveyConstants";
import { useSurveyForm } from "@/constants/surveyForm";

export function PregnancyStatusQuestion() {
  const { watch, setValue } = useSurveyForm();
  const response = watch("PregnancyStatusConditions");

  const nextSection =
    response === "Yes"
      ? SurveySection.RestrictedPregnancyStatus
      : SurveySection.HeartConditions;

  return (
    <SurveyQuestionLayout
      header="Are you currently pregnant or nursing?"
      description="We need this information to ensure the safety of our treatments."
      transition={Boolean(response)}
      currentSection={SurveySection.PregnancyStatusConditions}
      nextSection={nextSection}
      backSection={SurveySection.BiologicalSex}
    >
      <SurveySingleSelectContentView
        value={response}
        onValueChange={(value) => setValue("PregnancyStatusConditions", value)}
        options={yesNoOptions}
        activeId={response}
      />
    </SurveyQuestionLayout>
  );
}
