import {
  ProductEligibility,
  ProductRecommendation,
  ProductShopifyStorePage,
} from "@/constants/productRecommendations";
import { SurveySection } from "@/constants/surveyConstants";
import { useSurveyForm } from "@/constants/surveyForm";
import { getProductEligibility } from "@/constants/surveyLogic";
import { SurveyResponsesOutputSchema } from "@/constants/surveySchema";
import { useSurveyState } from "@/constants/surveyState";
import { useCustomerId } from "@/hooks/useCustomerId";
import { useSaveSurveyResponses } from "@/hooks/useSaveSurveyResponses";
import Image from "next/image";
import { useEffect, useState } from "react";

interface ProductRecommendationLayoutProps {
  recommendedProduct: ProductRecommendation;

  name: string;
  descriptionHtml: string;
  price: string;

  image:
    | {
        src: string;
        width: number;
        height: number;
      }
    | undefined;
}

export function ProductRecommendationLayout({
  recommendedProduct,
  name,
  descriptionHtml,
  price,
  image,
}: ProductRecommendationLayoutProps) {
  const { customerId } = useCustomerId();

  const { transitionSurvey, resetSurvey } = useSurveyState();

  const { getValues } = useSurveyForm();
  const surveyResponses = getValues() as unknown as SurveyResponsesOutputSchema;

  const productEligibility = getProductEligibility(surveyResponses);

  const shopifyStoreProductPageUrl =
    ProductShopifyStorePage[recommendedProduct];

  const { data: savedSurveyResponses } = useSaveSurveyResponses({
    customerId,
    surveyResponses,
    productEligibility,
    recommendedProduct,
  });

  const delayedOnce = useSurveyProductRecommendationDelay();
  if (!delayedOnce) {
    return (
      <div
        key="thinking"
        className="flex flex-col gap-6 text-lg items-center justify-center motion-preset-focus-sm"
      >
        <p>Determining our recommendation...</p>
        <span className="loading-indicator" />
      </div>
    );
  }

  return (
    <div
      key="product"
      className="flex flex-wrap gap-6 text-lg md:justify-center motion-preset-focus-sm motion-duration-1000"
    >
      {image && (
        <Image
          src={image.src}
          alt={`Product image of ${name}`}
          className="rounded-xl object-cover sm:max-w-[400px] sm:h-[500px]"
          priority
          width={image.width}
          height={image.height}
        />
      )}
      <div className="flex flex-col gap-6 sm:max-w-[500px]">
        <p className="opacity-75 -mb-4">
          {productEligibility === ProductEligibility.Eligible
            ? "We recommend:"
            : "You may be eligible for:"}
        </p>

        <h2 className="font-primary text-4xl -mb-2">{name}</h2>
        <p className="font-medium text-accent">${price}</p>
        <p
          className="opacity-75"
          dangerouslySetInnerHTML={{ __html: descriptionHtml }}
        />
        <p>
          You may check out now, and a member of a team will confirm your
          medical history and reach out to you.
        </p>

        <button
          className="bg-accent mt-auto disabled:bg-transparent"
          onClick={() => {
            window.open(shopifyStoreProductPageUrl, "_blank");
          }}
        >
          Check out
        </button>
        <button
          className="flex justify-center items-center relative border-none h-fit hover:bg-transparent py-2 -my-2"
          onClick={async () => {
            await transitionSurvey(SurveySection.Start);
            resetSurvey();
          }}
          disabled={!savedSurveyResponses}
        >
          Return to start
        </button>
      </div>
    </div>
  );
}

function useSurveyProductRecommendationDelay() {
  const [delayedOnce, setDelayedOnce] = useState(false);

  useEffect(() => {
    if (delayedOnce) return;
    setTimeout(() => {
      setDelayedOnce(true);
    }, 5000);
  }, [delayedOnce]);

  return delayedOnce;
}
