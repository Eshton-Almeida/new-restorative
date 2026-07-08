export enum ProductRecommendation {
  MCF_125 = "MCF_125",
  MC_8 = "MC_8",
  MC_125 = "MC_125",
}

export enum ProductEligibility {
  Eligible = "Eligible",
  Review = "Review",
}

export const ProductShopifyStorePage: Record<ProductRecommendation, string> = {
  [ProductRecommendation.MCF_125]:
    "https://restorationhaircare.ca/products/mcf-formula-12-5",
  [ProductRecommendation.MC_8]:
    "https://restorationhaircare.ca/products/topical-minoxidil-caffeine-8",
  [ProductRecommendation.MC_125]:
    "https://restorationhaircare.ca/products/mc-formula-12-5",
};
