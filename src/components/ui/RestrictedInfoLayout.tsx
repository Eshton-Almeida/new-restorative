import { ArrowRight } from "@/components/icons/ArrowRight";
import { SurveySection } from "@/constants/surveyConstants";
import { useSurveyState } from "@/constants/surveyState";
import { ReactNode } from "react";

interface RestrictedInfoLayoutProps {
  children: ReactNode;
  backSection: SurveySection;
}

export function RestrictedInfoLayout({
  children,
  backSection,
}: RestrictedInfoLayoutProps) {
  const { transitionSurvey, resetSurvey } = useSurveyState();

  return (
    <div className="flex flex-col gap-6">
      <button
        className="flex justify-end items-center relative border-none w-[100px] h-fit"
        onClick={() => transitionSurvey(backSection)}
      >
        <ArrowRight className="absolute left-0 rotate-180 stroke-white" />
        Back
      </button>
      <div className="flex flex-col gap-2">
        <h2 className="text-5xl">Not available</h2>
        <p className="font-medium">
          We apologize, but we cannot provide treatment at this time.
        </p>
      </div>
      {children}
      <button
        className="relative flex items-center justify-center"
        onClick={() => {
          transitionSurvey(SurveySection.Start);
          resetSurvey();
        }}
      >
        Return to start
      </button>
    </div>
  );
}
