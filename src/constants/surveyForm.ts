import {
  SurveyResponses,
  SurveyResponsesInputSchema,
} from "@/constants/surveySchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFormContext } from "react-hook-form";

export function useSurveyForm() {
  const form = useFormContext<SurveyResponsesInputSchema>();

  return form;
}

export function useSurveyFormSetup() {
  const surveyFormSetup = useForm<SurveyResponsesInputSchema>({
    mode: "onBlur",
    resolver: zodResolver(SurveyResponses),
  });

  return surveyFormSetup;
}
