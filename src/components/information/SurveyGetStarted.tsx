import { ArrowRight } from "@/components/icons/ArrowRight";
import { SurveySection } from "@/constants/surveyConstants";
import { useSurveyState } from "@/constants/surveyState";

export function SurveyGetStarted() {
  const { transitionSurvey } = useSurveyState();

  return (
    <div className="flex flex-col gap-8 motion-preset-focus-sm">
      <h2 className="text-7xl uppercase">Let's find the right treatment for you.</h2>
      <p className="text-xl font-medium">
        A few quick questions, reviewed by our clinical team, so we can recommend a personalized treatment that's right for you.
      </p>
      <button
        onClick={() => transitionSurvey(SurveySection.PlaceOfResidence)}
        className="relative sm:w-[292px] text-black bg-accent flex items-center justify-center"
      >
        Next
        <ArrowRight className="absolute right-8" />
      </button>
    </div>
  );
}
