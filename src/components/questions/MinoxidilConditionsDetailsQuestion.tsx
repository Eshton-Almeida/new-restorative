import { SurveyQuestionLayout } from "@/components/ui/SurveyQuestionLayout";
import { SurveySection } from "@/constants/surveyConstants";
import { useSurveyForm } from "@/constants/surveyForm";

export function MinoxidilConditionsDetailsQuestion() {
  const { watch, setValue } = useSurveyForm();
  const response = watch("AllergicReactionMinoxidilDetails");
  const biologicalSex = watch("BiologicalSex");

  const nextSection =
    biologicalSex === "Male"
      ? SurveySection.AdverseReactionFinasteride
      : SurveySection.ProductRecommendation_MC_8;

  return (
    <SurveyQuestionLayout
      header="Please describe your allergic reaction to minoxidil"
      description="This helps us determine alternative treatment options for you."
      currentSection={SurveySection.AllergicReactionMinoxidilDetails}
      nextSection={nextSection}
      backSection={SurveySection.AllergicReactionMinoxidil}
      disableNext={!response}
    >
      <textarea
        value={response}
        onChange={(e) =>
          setValue("AllergicReactionMinoxidilDetails", e.target.value)
        }
        placeholder="Please provide details about your allergic reaction..."
      />
    </SurveyQuestionLayout>
  );
}
