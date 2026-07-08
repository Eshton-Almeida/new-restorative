import { SurveySingleSelectContentView } from "@/components/ui/SurveyQuestionInputs";
import { SurveyQuestionLayout } from "@/components/ui/SurveyQuestionLayout";
import { SurveySection } from "@/constants/surveyConstants";
import { useSurveyForm } from "@/constants/surveyForm";

export function BiologicalSexQuestion() {
  const { watch, setValue } = useSurveyForm();
  const biologicalSex = watch("BiologicalSex");

  const nextSection =
    biologicalSex === "Female"
      ? SurveySection.PregnancyStatusConditions
      : SurveySection.HeartConditions;

  return (
    <SurveyQuestionLayout
      header="What is your biological sex?"
      description="We need this information to..."
      transition={Boolean(biologicalSex)}
      currentSection={SurveySection.BiologicalSex}
      nextSection={nextSection}
      backSection={SurveySection.HairLossExperienced}
    >
      <SurveySingleSelectContentView
        value={biologicalSex}
        onValueChange={(value) => setValue("BiologicalSex", value)}
        options={options}
        activeId={biologicalSex}
      />
    </SurveyQuestionLayout>
  );
}

const options = [
  { id: "Male", label: "Male" },
  { id: "Female", label: "Female" },
];
