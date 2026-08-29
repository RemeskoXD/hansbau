import { Metadata } from "next";
import { ServiceDetailTemplate } from "@/components/ServiceDetailTemplate";
import { services } from "@/lib/data";
import { notFound } from "next/navigation";

const service = services.find((s) => s.slug === "rekonstrukce-bytu")!;

export const metadata: Metadata = {
  title: "Rekonstrukce bytu (kompletní i částečná) | HANSBAU Karlovarský kraj",
  description: "Kompletní rekonstrukce bytů na klíč v Chebu, Sokolově, Aši a Karlových Varech. Pevná cena, harmonogram a záruka od HANSBAU.",
  alternates: {
    canonical: "/rekonstrukce-bytu/",
  },
};

export default function RekonstrukceBytuMainPage() {
  if (!service) return notFound();
  return <ServiceDetailTemplate service={service} />;
}
