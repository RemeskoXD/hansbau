import { Metadata } from "next";
import { LocationDetailTemplate } from "@/components/LocationDetailTemplate";
import { locations } from "@/lib/data";
import { notFound } from "next/navigation";

const loc = locations.find((l) => l.slug === "rekonstrukce-bytu-as")!;

export const metadata: Metadata = {
  title: loc?.metaTitle || "Rekonstrukce bytu Aš",
  description: loc?.metaDesc || "Kompletní rekonstrukce bytů a koupelen v Aši.",
  alternates: {
    canonical: "/rekonstrukce-bytu-as/",
  },
};

export default function AsLocationPage() {
  if (!loc) return notFound();
  return <LocationDetailTemplate location={loc} />;
}
