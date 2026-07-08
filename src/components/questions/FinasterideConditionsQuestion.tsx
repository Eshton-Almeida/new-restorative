import { SurveySingleSelectContentView } from "@/components/ui/SurveyQuestionInputs";
import { SurveyQuestionLayout } from "@/components/ui/SurveyQuestionLayout";
import { yesNoOptions } from "@/constants/commonOptions";
import { SurveySection } from "@/constants/surveyConstants";
import { useSurveyForm } from "@/constants/surveyForm";
import { useEffect } from "react";

export function FinasterideConditionsQuestion() {
  const { watch, setValue } = useSurveyForm();
  const response = watch("AdverseReactionFinasteride");

  // Reset any provided details if user changes from Yes -> No.
  useEffect(() => {
    if (response === "No") {
      setValue("AdverseReactionFinasterideDetails", "");
    }
  }, [response, setValue]);

  const nextSection =
    response === "Yes"
      ? SurveySection.AdverseReactionFinasterideDetails
      : SurveySection.ProductRecommendation_MCF_125;

  return (
    <SurveyQuestionLayout
      header="Have you ever had an adverse reaction to finasteride?"
      description="This information helps us determine if finasteride-based treatments are appropriate for you."
      transition={Boolean(response)}
      currentSection={SurveySection.AdverseReactionFinasteride}
      nextSection={nextSection}
      backSection={SurveySection.AllergicReactionMinoxidil}
    >
      <SurveySingleSelectContentView
        value={response}
        onValueChange={(value) => setValue("AdverseReactionFinasteride", value)}
        options={yesNoOptions}
        activeId={response}
      />
    </SurveyQuestionLayout>
  );
}
