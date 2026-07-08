import { SurveyQuestionLayout } from "@/components/ui/SurveyQuestionLayout";
import { SurveySection } from "@/constants/surveyConstants";
import { useSurveyForm } from "@/constants/surveyForm";

export function DateOfBirthQuestion() {
  const {
    register,
    formState: { errors },
  } = useSurveyForm();
  const isValid = Object.keys(errors).length === 0;

  const above18 = useSurveyAgeCheck();
  const hasResponse = above18 !== null;

  const nextSection = above18
    ? SurveySection.HairLossExperienced
    : SurveySection.RestrictedAge;

  return (
    <SurveyQuestionLayout
      header="What is your date of birth?"
      description="We need this information to determine..."
      currentSection={SurveySection.DateOfBirth}
      nextSection={nextSection}
      backSection={SurveySection.PlaceOfResidence}
      disableNext={!hasResponse || !isValid}
      responseInvalid={
        !isValid && (
          <div className="flex flex-col gap-2 text-lg">
            <p className="font-medium text-xl">
              Correct the following issues to continue:
            </p>
            <ul className="flex flex-col list-disc list-inside font-medium">
              {errors.DateOfBirth?.month && (
                <li>{errors.DateOfBirth.month.message}</li>
              )}
              {errors.DateOfBirth?.day && (
                <li>{errors.DateOfBirth.day.message}</li>
              )}
              {errors.DateOfBirth?.year && (
                <li>{errors.DateOfBirth.year.message}</li>
              )}
            </ul>
          </div>
        )
      }
    >
      <div className="flex flex-col gap-8">
        <div className="flex gap-2">
          <input
            {...register("DateOfBirth.month")}
            inputMode="numeric"
            className="btn text-center bg-inherit min-w-24 sm:min-w-36"
            placeholder="Month"
          />
          <input
            {...register("DateOfBirth.day")}
            inputMode="numeric"
            className="btn text-center bg-inherit min-w-24 sm:min-w-36"
            placeholder="Day"
          />
          <input
            {...register("DateOfBirth.year")}
            inputMode="numeric"
            className="btn text-center bg-inherit min-w-24 sm:min-w-36"
            placeholder="Year"
          />
        </div>
      </div>
    </SurveyQuestionLayout>
  );
}

function useSurveyAgeCheck() {
  const { watch } = useSurveyForm();

  const birthMonth = watch("DateOfBirth.month");
  const birthDay = watch("DateOfBirth.day");
  const birthYear = watch("DateOfBirth.year");
  const birthdayProvided = birthMonth && birthDay && birthYear.length >= 4;
  if (!birthdayProvided) return null;

  const currentDate = new Date();
  const birthDate = new Date(
    Number(birthYear),
    Number(birthMonth) - 1,
    Number(birthDay)
  );
  const ageDiffMs = currentDate.getTime() - birthDate.getTime();
  const ageDate = new Date(ageDiffMs);
  const above18 = Math.abs(ageDate.getUTCFullYear() - 1970) >= 18;

  return above18;
}
