import { Metadata } from "next";
import { LocationDetailTemplate } from "@/components/LocationDetailTemplate";
import { locations } from "@/lib/data";
import { notFound } from "next/navigation";

const loc = locations.find((l) => l.slug === "rekonstrukce-bytu-kraslice")!;

export const metadata: Metadata = {
  title: loc?.metaTitle || "Rekonstrukce bytu Kraslice",
  description: loc?.metaDesc || "Kompletní rekonstrukce bytů a koupelen v Kraslicích.",
  alternates: {
    canonical: "/rekonstrukce-bytu-kraslice/",
  },
};

export default function KrasliceLocationPage() {
  if (!loc) return notFound();
  return <LocationDetailTemplate location={loc} />;
}
