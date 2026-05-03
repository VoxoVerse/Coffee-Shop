import type { Locale } from "@/i18n/routing";

type Props = {
  locale: Locale;
};

export function JsonLd({ locale }: Props) {
  const description =
    locale === "ar"
      ? "قهوة مختصة في النخيل، الرياض."
      : "Specialty coffee shop in An Nakhil, Riyadh, Saudi Arabia.";

  const data = {
    "@context": "https://schema.org",
    "@type": ["CafeOrCoffeeShop", "LocalBusiness"],
    "@id": "https://mylifecoffee.sa/#coffee-shop",
    name: "My Life Coffee",
    alternateName: ["ماي لايف كوفي", "My Life Coffee"],
    description,
    url: "https://mylifecoffee.sa",
    telephone: "+966502222333",
    email: "info@mylifecoffee.sa",
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: "7726 Al Takhasosi, An Nakhil",
      addressLocality: "Riyadh",
      addressRegion: "Riyadh Province",
      postalCode: "12384",
      addressCountry: "SA",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 24.7136,
      longitude: 46.6753,
    },
    servesCuisine: "Coffee",
    openingHoursSpecification: [],
    sameAs: ["https://www.facebook.com/mylifecoffe.ksa/"],
    areaServed: "Riyadh",
    inLanguage: ["en", "ar"],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
