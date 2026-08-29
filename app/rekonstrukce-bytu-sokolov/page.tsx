import { Metadata } from "next";
import { LocationDetailTemplate } from "@/components/LocationDetailTemplate";
import { locations } from "@/lib/data";
import { notFound } from "next/navigation";

const loc = locations.find((l) => l.slug === "rekonstrukce-bytu-sokolov")!;

export const metadata: Metadata = {
  title: loc?.metaTitle || "Rekonstrukce bytu Sokolov",
  description: loc?.metaDesc || "Kompletní rekonstrukce bytů a koupelen v Sokolově.",
  alternates: {
    canonical: "/rekonstrukce-bytu-sokolov/",
  },
};

export default function SokolovLocationPage() {
  if (!loc) return notFound();
  return <LocationDetailTemplate location={loc} />;
}
