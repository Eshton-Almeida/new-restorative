import { SurveySingleSelectContentView } from "@/components/ui/SurveyQuestionInputs";
import { SurveyQuestionLayout } from "@/components/ui/SurveyQuestionLayout";
import { yesNoOptions } from "@/constants/commonOptions";
import { SurveySection } from "@/constants/surveyConstants";
import { useSurveyForm } from "@/constants/surveyForm";
import { useEffect } from "react";

export function MinoxidilConditionsQuestion() {
  const { watch, setValue } = useSurveyForm();
  const response = watch("AllergicReactionMinoxidil");
  const biologicalSex = watch("BiologicalSex");

  // Reset any provided details if user changes from Yes -> No.
  useEffect(() => {
    if (response === "No") {
      setValue("AllergicReactionMinoxidilDetails", "");
    }
  }, [response, setValue]);

  const nextSection =
    response === "Yes"
      ? SurveySection.AllergicReactionMinoxidilDetails
      : biologicalSex === "Male"
      ? SurveySection.AdverseReactionFinasteride
      : SurveySection.ProductRecommendation_MC_8;

  return (
    <SurveyQuestionLayout
      header="Have you ever had an allergic reaction to minoxidil?"
      description="This helps us determine if minoxidil-based treatments are suitable for you."
      transition={Boolean(response)}
      currentSection={SurveySection.AllergicReactionMinoxidil}
      nextSection={nextSection}
      backSection={SurveySection.ClinicalConsent}
    >
      <SurveySingleSelectContentView
        value={response}
        onValueChange={(value) => setValue("AllergicReactionMinoxidil", value)}
        options={yesNoOptions}
        activeId={response}
      />
    </SurveyQuestionLayout>
  );
}
