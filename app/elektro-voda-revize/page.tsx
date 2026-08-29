import { Metadata } from "next";
import { ServiceDetailTemplate } from "@/components/ServiceDetailTemplate";
import { services } from "@/lib/data";
import { notFound } from "next/navigation";

const service = services.find((s) => s.slug === "elektro-voda-revize")!;

export const metadata: Metadata = {
  title: "Elektroinstalace, instalatérské práce a revize | HANSBAU",
  description: "Kompletní rozvody elektřiny v mědi, rozvody vody a odpadů, topení a oficiální revizní zprávy pro SVJ a kolaudaci. HANSBAU.",
  alternates: {
    canonical: "/elektro-voda-revize/",
  },
};

export default function ElektroVodaRevizePage() {
  if (!service) return notFound();
  return <ServiceDetailTemplate service={service} />;
}
