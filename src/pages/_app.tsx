import "@/styles/globals.css";
import { CartProvider, ShopifyProvider } from "@shopify/hydrogen-react";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { AppProps } from "next/app";
import { FormProvider } from "react-hook-form";

import { RestrictedNoCustomerId } from "@/components/restrictions/RestrictedNoCustomerId";
import { useSurveyFormSetup } from "@/constants/surveyForm";
import { useCustomerId } from "@/hooks/useCustomerId";
import {
  StoreDomain,
  StorefrontApiVersion,
  StorefrontToken,
} from "@/utils/env";
import { Montserrat, Tenor_Sans } from "next/font/google";
import { useRouter } from "next/router";

const tenorSans = Tenor_Sans({
  subsets: ["latin"],
  variable: "--font-primary",
  weight: ["400"],
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-secondary",
  weight: ["400", "500", "600"],
});

export default function App({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter();
  const { customerId } = useCustomerId();

  const divLayout = pathname.includes("product")
    ? "w-full"
    : "w-full sm:max-w-[500px]";

  const surveyForm = useSurveyFormSetup();

  /*
  if (!customerId) {
    return <RestrictedNoCustomerId />;
  }
  */

  // console.log("survey tracking", surveyForm.watch());
  if (!StoreDomain || !StorefrontToken) {
    throw new Error("No store domain or storefront token");
  }

  return (
    <ShopifyProvider
      storeDomain={StoreDomain}
      storefrontToken={StorefrontToken}
      storefrontApiVersion={StorefrontApiVersion}
      countryIsoCode="CA"
      languageIsoCode="EN"
    >
      <CartProvider>
        <FormProvider {...surveyForm}>
          <main
            className={`${tenorSans.variable} ${montserrat.variable} flex w-full items-center justify-center p-4`}
          >
            <div className={divLayout}>
              <Component {...pageProps} />
              <Analytics debug={false} />
              <SpeedInsights debug={false} />
            </div>
          </main>
        </FormProvider>
      </CartProvider>
    </ShopifyProvider>
  );
}
