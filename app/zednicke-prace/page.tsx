import { Metadata } from "next";
import { ServiceDetailTemplate } from "@/components/ServiceDetailTemplate";
import { services } from "@/lib/data";
import { notFound } from "next/navigation";

const service = services.find((s) => s.slug === "zednicke-prace")!;

export const metadata: Metadata = {
  title: "Zednické práce a povrchové úpravy Cheb & Karlovarský kraj | HANSBAU",
  description: "Zdění příček z Ytongu, omítky, sádrové stěrky, nivelace podlah a sádrokartony v Karlovarském kraji. HANSBAU.",
  alternates: {
    canonical: "/zednicke-prace/",
  },
};

export default function ZednickePracePage() {
  if (!service) return notFound();
  return <ServiceDetailTemplate service={service} />;
}
