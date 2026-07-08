import { ConsentCheckbox } from "@/components/questions/consents/ConsentCheckbox";
import { SurveyQuestionLayout } from "@/components/ui/SurveyQuestionLayout";
import { SurveySection } from "@/constants/surveyConstants";
import { useSurveyForm } from "@/constants/surveyForm";

export function ClinicalConsentQuestion() {
  const { watch, setValue } = useSurveyForm();

  const virtualCareConsent = watch("VirtualCareTreatmentConsent");
  const privacyConsent = watch("PrivacyInformationSharingConsent");
  const accuracyConfirmation = watch("AccuracyConfirmation");
  const ongoingHealthUpdatesConsent = watch("OngoingHealthUpdatesConsent");
  const bloodPressureConditions = watch("BloodPressureConditions");

  const allConfirmed =
    virtualCareConsent &&
    privacyConsent &&
    accuracyConfirmation &&
    ongoingHealthUpdatesConsent;

  const backSection =
    bloodPressureConditions === "Yes"
      ? SurveySection.BloodPressureConditionsDetails
      : SurveySection.BloodPressureConditions;

  return (
    <SurveyQuestionLayout
      header="Before we continue"
      description="Before we send your assessment to our clinical team for review, please confirm the following:"
      currentSection={SurveySection.ClinicalConsent}
      nextSection={SurveySection.AllergicReactionMinoxidil}
      backSection={backSection}
      disableNext={!allConfirmed}
    >
      <div className="flex flex-col gap-4">
        <ConsentCheckbox
          id="virtual-care-treatment-consent"
          checked={virtualCareConsent}
          onCheckedChange={(checked) =>
            setValue("VirtualCareTreatmentConsent", checked)
          }
          title="Virtual care & treatment consent"
        >
          I understand my care is provided virtually by a licensed practitioner
          on Restoration Haircare&apos;s clinical team, and I consent to receiving
          care this way. I understand virtual care carries some privacy and
          security risks, that I may be asked to complete an in-person
          assessment if needed, and that it&apos;s not a substitute for emergency
          care. I&apos;ve reviewed the risks and benefits of the recommended
          treatment and consent to it if prescribed.
        </ConsentCheckbox>

        <ConsentCheckbox
          id="privacy-information-sharing-consent"
          checked={privacyConsent}
          onCheckedChange={(checked) =>
            setValue("PrivacyInformationSharingConsent", checked)
          }
          title="Privacy & information sharing"
        >
          I consent to Restoration Haircare and its clinical team collecting and
          using my health information to provide my care, and to sharing my
          prescription with Restore Pharmaceuticals to dispense and ship my
          medication.
        </ConsentCheckbox>

        <ConsentCheckbox
          id="accuracy-confirmation"
          checked={accuracyConfirmation}
          onCheckedChange={(checked) => setValue("AccuracyConfirmation", checked)}
          title="Accuracy"
        >
          The information I&apos;ve provided is true and complete to the best of my
          knowledge.
        </ConsentCheckbox>

        <ConsentCheckbox
          id="ongoing-health-updates-consent"
          checked={ongoingHealthUpdatesConsent}
          onCheckedChange={(checked) =>
            setValue("OngoingHealthUpdatesConsent", checked)
          }
          title="Ongoing health updates"
        >
          I agree to let our clinical team know of any meaningful changes to my
          health while I&apos;m on treatment - including new medical conditions, new
          medications, side effects, or if I become pregnant or am planning to. I
          understand this helps keep my treatment safe and appropriate over time.
        </ConsentCheckbox>
      </div>
    </SurveyQuestionLayout>
  );
}
