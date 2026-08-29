import { Metadata } from "next";
import { LocationDetailTemplate } from "@/components/LocationDetailTemplate";
import { locations } from "@/lib/data";
import { notFound } from "next/navigation";

const loc = locations.find((l) => l.slug === "rekonstrukce-bytu-frantiskovy-lazne")!;

export const metadata: Metadata = {
  title: loc?.metaTitle || "Rekonstrukce bytu Františkovy Lázně",
  description: loc?.metaDesc || "Kompletní rekonstrukce bytů ve Františkových Lázních.",
  alternates: {
    canonical: "/rekonstrukce-bytu-frantiskovy-lazne/",
  },
};

export default function FrantiskovyLazneLocationPage() {
  if (!loc) return notFound();
  return <LocationDetailTemplate location={loc} />;
}
