import { SurveySingleSelectContentView } from "@/components/ui/SurveyQuestionInputs";
import { SurveyQuestionLayout } from "@/components/ui/SurveyQuestionLayout";
import { SurveySection } from "@/constants/surveyConstants";
import { useSurveyForm } from "@/constants/surveyForm";

export function HairLossExperiencedQuestion() {
  const { watch, setValue } = useSurveyForm();
  const hairLossExperienced = watch("HairLossExperienced");

  return (
    <SurveyQuestionLayout
      header="How much hair loss have you experienced?"
      description="We need this information to..."
      transition={Boolean(hairLossExperienced)}
      currentSection={SurveySection.HairLossExperienced}
      nextSection={SurveySection.BiologicalSex}
      backSection={SurveySection.DateOfBirth}
    >
      <SurveySingleSelectContentView
        value={hairLossExperienced}
        onValueChange={(value) => setValue("HairLossExperienced", value)}
        options={options}
        activeId={hairLossExperienced}
      />
    </SurveyQuestionLayout>
  );
}

const options = [
  { id: "Severe", label: "Severe" },
  { id: "Moderate", label: "Moderate" },
  { id: "Little", label: "A Little" },
  { id: "NonePreventative", label: "None, Preventative" },
];
