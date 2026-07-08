import { ArrowRight } from "@/components/icons/ArrowRight";
import { SurveySection } from "@/constants/surveyConstants";
import {
  useAutoTransitionSurveyOnce,
  UseAutoTransitionSurveyParams,
} from "@/constants/surveyLogic";
import { useSurveyState } from "@/constants/surveyState";
import { ReactNode } from "react";

interface SurveyQuestionLayout extends UseAutoTransitionSurveyParams {
  header: string;
  description: string;

  children: ReactNode;
  responseInvalid?: ReactNode;

  backSection?: SurveySection;

  disableNext?: boolean;
}

export function SurveyQuestionLayout({
  header,
  description,
  children,
  backSection,
  disableNext = false,
  responseInvalid,
  transition,
  currentSection,
  nextSection,
}: SurveyQuestionLayout) {
  const { transitionedSections, transitionSurvey } = useSurveyState();

  useAutoTransitionSurveyOnce({ transition, currentSection, nextSection });

  const transitionedThisSection = transitionedSections.includes(currentSection);

  return (
    <div className="flex flex-col gap-6 motion-preset-focus-sm">
      {backSection && (
        <button
          className="flex justify-end items-center relative border-none w-[100px] h-fit hover:bg-transparent"
          onClick={() => transitionSurvey(backSection)}
        >
          <ArrowRight className="absolute left-0 rotate-180 stroke-white" />
          Back
        </button>
      )}
      <h2 className="text-5xl">{header}</h2>
      <p className="font-medium text-xl mb-6 opacity-75">{description}</p>
      {children}
      {(transition === undefined || transitionedThisSection) && (
        <button
          className="relative flex items-center justify-center"
          onClick={() => {
            transitionSurvey(nextSection);
          }}
          disabled={(transition !== undefined && !transition) || disableNext}
        >
          Next
          <ArrowRight className="absolute right-8" />
        </button>
      )}
      {responseInvalid}
    </div>
  );
}
