import { RestrictedInfoLayout } from "@/components/ui/RestrictedInfoLayout";
import { SurveySection } from "@/constants/surveyConstants";

export function RestrictedPregnancyStatus() {
  return (
    <RestrictedInfoLayout backSection={SurveySection.PregnancyStatusConditions}>
      <p>
        For safety reasons, we cannot provide hair loss treatments to
        individuals who are pregnant or nursing.
      </p>
    </RestrictedInfoLayout>
  );
}
