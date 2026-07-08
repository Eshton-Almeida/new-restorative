import { ProductRecommendationLayout } from "@/components/ui/ProductRecommendationLayout";
import { ProductRecommendation } from "@/constants/productRecommendations";
import { useProductDetails } from "@/hooks/storefront/productDetails";

export default function MinoxidilFinasterideCaffeine125Page() {
  const { data, isLoading, error } = useProductDetails(
    "gid://shopify/Product/8478490853610"
  );

  if (isLoading) return <div className="loading-indicator" />;
  if (error) return <div className="text-center">Issue loading data.</div>;
  if (!data) return <div className="text-center">Issue loading data.</div>;

  return (
    <ProductRecommendationLayout
      recommendedProduct={ProductRecommendation.MCF_125}
      name={data.title}
      descriptionHtml={data.descriptionHtml}
      price={data.priceRange.maxVariantPrice.amount}
      image={
        data.featuredImage
          ? {
              src: data.featuredImage.url,
              width: data.featuredImage.width ?? 0,
              height: data.featuredImage.height ?? 0,
            }
          : undefined
      }
    />
  );
}
