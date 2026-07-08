import { ProductRecommendationLayout } from "@/components/ui/ProductRecommendationLayout";
import { ProductRecommendation } from "@/constants/productRecommendations";
import { useProductDetails } from "@/hooks/storefront/productDetails";

export default function MinoxidilCaffeine125RecommendationPage() {
  const { data, isLoading, error } = useProductDetails(
    "gid://shopify/Product/8478495998186"
  );

  if (isLoading) return <div className="loading-indicator" />;
  if (error) return <div className="text-center">Issue loading data.</div>;
  if (!data) return <div className="text-center">Issue loading data.</div>;

  return (
    <ProductRecommendationLayout
      recommendedProduct={ProductRecommendation.MC_125}
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
