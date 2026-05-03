import { Footer } from "@/components/Footer";
import { FindUs } from "@/components/FindUs";
import { Gallery } from "@/components/Gallery";
import { JsonLd } from "@/components/JsonLd";
import { Menu } from "@/components/Menu";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Story } from "@/components/Story";
import type { Locale } from "@/i18n/routing";

export default function HomePage({ params }: { params: { locale: Locale } }) {
  return (
    <>
      <JsonLd locale={params.locale} />
      <Navbar />
      <main>
        <Hero />
        <Menu />
        <Story />
        <Gallery />
        <FindUs />
      </main>
      <Footer />
    </>
  );
}
