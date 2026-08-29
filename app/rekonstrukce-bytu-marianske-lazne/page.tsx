import { Metadata } from "next";
import { LocationDetailTemplate } from "@/components/LocationDetailTemplate";
import { locations } from "@/lib/data";
import { notFound } from "next/navigation";

const loc = locations.find((l) => l.slug === "rekonstrukce-bytu-marianske-lazne")!;

export const metadata: Metadata = {
  title: loc?.metaTitle || "Rekonstrukce bytu Mariánské Lázně",
  description: loc?.metaDesc || "Kompletní rekonstrukce bytů a koupelen v Mariánských Lázních.",
  alternates: {
    canonical: "/rekonstrukce-bytu-marianske-lazne/",
  },
};

export default function MarianskeLazneLocationPage() {
  if (!loc) return notFound();
  return <LocationDetailTemplate location={loc} />;
}
