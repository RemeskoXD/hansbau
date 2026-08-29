import { Metadata } from "next";
import { LocationDetailTemplate } from "@/components/LocationDetailTemplate";
import { locations } from "@/lib/data";
import { notFound } from "next/navigation";

const loc = locations.find((l) => l.slug === "rekonstrukce-bytu-chodov")!;

export const metadata: Metadata = {
  title: loc?.metaTitle || "Rekonstrukce bytu Chodov",
  description: loc?.metaDesc || "Kompletní rekonstrukce bytů a koupelen v Chodově.",
  alternates: {
    canonical: "/rekonstrukce-bytu-chodov/",
  },
};

export default function ChodovLocationPage() {
  if (!loc) return notFound();
  return <LocationDetailTemplate location={loc} />;
}
