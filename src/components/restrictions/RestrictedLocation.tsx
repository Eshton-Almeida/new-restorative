import { RestrictedInfoLayout } from "@/components/ui/RestrictedInfoLayout";
import { SurveySection } from "@/constants/surveyConstants";

export function RestrictedLocation() {
  return (
    <RestrictedInfoLayout backSection={SurveySection.PlaceOfResidence}>
      <p>
        Our services are not currently available in your location. We're working
        on expanding our coverage. Please check back later for updates on
        availability in your area.
      </p>
    </RestrictedInfoLayout>
  );
}
