import { Metadata } from "next";
import { ServiceDetailTemplate } from "@/components/ServiceDetailTemplate";
import { services } from "@/lib/data";
import { notFound } from "next/navigation";

const service = services.find((s) => s.slug === "elektro-voda-revize")!;

export const metadata: Metadata = {
  title: "Elektroinstalace, voda a revize při rekonstrukci | HANSBAU",
  description: "Nové rozvody elektřiny v mědi, rozvody vody a odpadů, úpravy topení a výchozí revizní zprávy elektro při rekonstrukci. HANSBAU.",
  alternates: {
    canonical: "/elektro-voda-revize/",
  },
};

export default function ElektroVodaRevizePage() {
  if (!service) return notFound();
  return <ServiceDetailTemplate service={service} />;
}
