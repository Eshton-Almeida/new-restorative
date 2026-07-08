import { SurveyQuestionLayout } from "@/components/ui/SurveyQuestionLayout";
import { SurveySection } from "@/constants/surveyConstants";
import { useSurveyForm } from "@/constants/surveyForm";

export function FinasterideConditionsDetailsQuestion() {
  const { watch, setValue } = useSurveyForm();
  const response = watch("AdverseReactionFinasterideDetails");

  return (
    <SurveyQuestionLayout
      header="Please describe your adverse reaction to finasteride"
      description="This helps us determine alternative treatment options for you."
      currentSection={SurveySection.AdverseReactionFinasterideDetails}
      nextSection={SurveySection.ProductRecommendation_MC_125}
      backSection={SurveySection.AdverseReactionFinasteride}
      disableNext={!response}
    >
      <textarea
        value={response}
        onChange={(e) =>
          setValue("AdverseReactionFinasterideDetails", e.target.value)
        }
        placeholder="Please provide details about your adverse reaction..."
      />
    </SurveyQuestionLayout>
  );
}
