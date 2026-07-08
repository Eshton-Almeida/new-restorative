import { SurveyQuestionLayout } from "@/components/ui/SurveyQuestionLayout";
import { SurveySection } from "@/constants/surveyConstants";
import { useSurveyForm } from "@/constants/surveyForm";
import * as RadioGroup from "@radix-ui/react-radio-group";
import * as Select from "@radix-ui/react-select";

export function PlaceOfResidenceQuestion() {
  const { watch, setValue } = useSurveyForm();

  const country = watch("PlaceOfResidence.country");
  const province = watch("PlaceOfResidence.province");

  if (country !== "Canada") {
    return (
      <SurveyQuestionLayout
        header="Where do you live?"
        description="Restoration Haircare currently only services Canadian customers. But ...."
        backSection={SurveySection.Start}
        currentSection={SurveySection.PlaceOfResidence}
        nextSection={SurveySection.RestrictedLocation}
        disableNext={!country}
      >
        <RadioGroup.Root
          className="flex flex-col gap-3"
          value={watch("PlaceOfResidence.country")}
          onValueChange={(value) => setValue("PlaceOfResidence.country", value)}
          onClick={(e) => {
            const target = e.target as HTMLInputElement;
            if (country === target.value) {
              setValue("PlaceOfResidence.country", "");
            }
          }}
        >
          <RadioGroup.Item
            value="Canada"
            className="btn-accent data-[state='checked']:bg-accent"
          >
            Canada
          </RadioGroup.Item>
          <RadioGroup.Item
            value="USA"
            className="btn-accent data-[state='checked']:bg-accent"
          >
            USA
          </RadioGroup.Item>
          <RadioGroup.Item
            value="International"
            className="btn-accent data-[state='checked']:bg-accent"
          >
            International
          </RadioGroup.Item>
        </RadioGroup.Root>
      </SurveyQuestionLayout>
    );
  }

  return (
    <SurveyQuestionLayout
      header="Where do you live?"
      description="Restoration Haircare currently only services Canadian customers. But ..."
      backSection={SurveySection.Start}
      currentSection={SurveySection.PlaceOfResidence}
      nextSection={SurveySection.DateOfBirth}
      disableNext={!province}
    >
      <Select.Root
        value={province}
        onValueChange={(value) => setValue("PlaceOfResidence.province", value)}
      >
        <button
          className="bg-accent btn -mb-3"
          onClick={() => setValue("PlaceOfResidence.country", "")}
        >
          Canada
        </button>
        <Select.Trigger
          data-active={Boolean(province)}
          className="btn data-[active=true]:bg-accent btn-accent"
        >
          <Select.Value placeholder="Select province" />
        </Select.Trigger>
        <Select.Portal>
          <Select.Content className="bg-[#222] rounded-xl *:text-lg py-2 px-2 *:cursor-pointer fixed left-4 top-4 sm:static sm:left-0 sm:top-0">
            <Select.ScrollUpButton />
            <Select.Viewport>
              <p className="font-medium font-sans px-2 py-1">
                Select your province
              </p>
              {ProvinceOptions.map((option) => (
                <Select.Item
                  key={option.value}
                  value={option.value}
                  className="font-medium sm:hover:bg-accent px-2 py-2 sm:py-1 rounded-md data-[active=true]:bg-accent"
                  data-active={option.value === province}
                >
                  <Select.ItemText>{option.label}</Select.ItemText>
                </Select.Item>
              ))}
            </Select.Viewport>
            <Select.ScrollDownButton />
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </SurveyQuestionLayout>
  );
}

const ProvinceOptions = [
  { value: "ON", label: "Ontario" },
  { value: "QC", label: "Quebec" },
  { value: "NS", label: "Nova Scotia" },
  { value: "NB", label: "New Brunswick" },
  { value: "MB", label: "Manitoba" },
  { value: "BC", label: "British Columbia" },
  { value: "PE", label: "Prince Edward Island" },
  { value: "SK", label: "Saskatchewan" },
  { value: "AB", label: "Alberta" },
  { value: "NL", label: "Newfoundland and Labrador" },
  { value: "NT", label: "Northwest Territories" },
  { value: "YT", label: "Yukon" },
  { value: "NU", label: "Nunavut" },
] as const;
