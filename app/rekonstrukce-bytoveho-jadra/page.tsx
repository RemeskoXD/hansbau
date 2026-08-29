import { Metadata } from "next";
import { ServiceDetailTemplate } from "@/components/ServiceDetailTemplate";
import { services } from "@/lib/data";
import { notFound } from "next/navigation";

const service = services.find((s) => s.slug === "rekonstrukce-bytoveho-jadra")!;

export const metadata: Metadata = {
  title: "Rekonstrukce bytového jádra Cheb & Karlovarský kraj | HANSBAU",
  description: "Vybourání umakartu a vyzdění nového pórobetonového jádra (Ytong) za 10-14 dní. Nová elektřina, odpady, voda, obklady a sanita. HANSBAU.",
  alternates: {
    canonical: "/rekonstrukce-bytoveho-jadra/",
  },
};

export default function RekonstrukceJadraPage() {
  if (!service) return notFound();
  return <ServiceDetailTemplate service={service} />;
}
