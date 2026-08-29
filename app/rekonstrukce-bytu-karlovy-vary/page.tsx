import { Metadata } from "next";
import { LocationDetailTemplate } from "@/components/LocationDetailTemplate";
import { locations } from "@/lib/data";
import { notFound } from "next/navigation";

const loc = locations.find((l) => l.slug === "rekonstrukce-bytu-karlovy-vary")!;

export const metadata: Metadata = {
  title: loc?.metaTitle || "Rekonstrukce bytu Karlovy Vary",
  description: loc?.metaDesc || "Kompletní rekonstrukce bytů a koupelen v Karlových Varech.",
  alternates: {
    canonical: "/rekonstrukce-bytu-karlovy-vary/",
  },
};

export default function KarlovyVaryLocationPage() {
  if (!loc) return notFound();
  return <LocationDetailTemplate location={loc} />;
}
