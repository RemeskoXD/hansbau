import { Metadata } from "next";
import { LocationDetailTemplate } from "@/components/LocationDetailTemplate";
import { locations } from "@/lib/data";
import { notFound } from "next/navigation";

const loc = locations.find((l) => l.slug === "rekonstrukce-bytu-ostrov")!;

export const metadata: Metadata = {
  title: loc?.metaTitle || "Rekonstrukce bytu Ostrov nad Ohří",
  description: loc?.metaDesc || "Kompletní rekonstrukce bytů a koupelen v Ostrově.",
  alternates: {
    canonical: "/rekonstrukce-bytu-ostrov/",
  },
};

export default function OstrovLocationPage() {
  if (!loc) return notFound();
  return <LocationDetailTemplate location={loc} />;
}
