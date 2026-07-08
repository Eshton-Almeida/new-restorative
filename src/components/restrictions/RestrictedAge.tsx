import { RestrictedInfoLayout } from "@/components/ui/RestrictedInfoLayout";
import { SurveySection } from "@/constants/surveyConstants";

export function RestrictedAge() {
  return (
    <RestrictedInfoLayout backSection={SurveySection.DateOfBirth}>
      <p>
        For safety reasons, we can only provide treatment to individuals who are
        18 years or older.
      </p>
    </RestrictedInfoLayout>
  );
}
