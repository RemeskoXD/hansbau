import { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MobileFloatingBar } from "@/components/MobileFloatingBar";
import { Hero } from "@/components/Hero";
import { ServicesSection } from "@/components/ServicesSection";
import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";
import { PriceCalculator } from "@/components/PriceCalculator";
import { WhyUsSection } from "@/components/WhyUsSection";
import { RealizaceGallery } from "@/components/RealizaceGallery";
import { GoogleReviewsSection } from "@/components/GoogleReviewsSection";
import { ProcessStepsSection } from "@/components/ProcessStepsSection";
import { ContactForm } from "@/components/ContactForm";
import { ServiceAreaMap } from "@/components/ServiceAreaMap";
import { FAQSection } from "@/components/FAQSection";
import { JsonLd } from "@/components/JsonLd";
import { homeFaq, siteConfig } from "@/lib/data";
import { getContentStore } from "@/lib/content-store";

export function generateMetadata(): Metadata {
  const { seo } = getContentStore().content;
  return {
    title: seo?.homeTitle || "Rekonstrukce bytu Cheb & Karlovarský Kraj | HANSBAU",
    description: seo?.homeDesc || "Kompletní i částečné rekonstrukce bytů a koupelen v Karlovarském kraji na klíč. Pevná cena za sjednaný rozsah, osobní zaměření ZDARMA a záruka.",
    alternates: {
      canonical: "/",
    },
  };
}

export default function HomePage() {
  const { calculator, faq, portfolio, seo } = getContentStore().content;

  const faqItems = faq?.items || homeFaq;

  return (
    <>
      <JsonLd
        pageTitle={seo?.homeTitle || "Rekonstrukce bytu Cheb | HANSBAU - Karlovarský Kraj"}
        pageDesc={seo?.homeDesc || "Rekonstrukce bytů a koupelen v Karlovarském kraji — kompletní i částečné. Přesnou cenu znáte předem. Bezplatná prohlídka a kalkulace."}
        pageUrl={siteConfig.url}
        faqs={faqItems}
        breadcrumbs={[
          { name: "Domů", url: siteConfig.url }
        ]}
      />
      <Navbar />
      <main className="flex-1">
        <Hero />
        <ServicesSection />
        <BeforeAfterSlider />
        <PriceCalculator
          badge={calculator.badge}
          title={calculator.title}
          perex={calculator.perex}
          disclaimer={calculator.disclaimer}
        />
        <WhyUsSection />
        <RealizaceGallery items={portfolio?.items} limit={8} showViewAll={true} />
        <GoogleReviewsSection />
        <ProcessStepsSection />
        <ServiceAreaMap />
        <FAQSection customFaq={faqItems} title={faq?.title} subtitle={faq?.subtitle} />
        <ContactForm />
      </main>
      <Footer />
      <MobileFloatingBar />
    </>
  );
}
