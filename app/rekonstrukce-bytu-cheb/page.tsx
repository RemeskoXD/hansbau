import { Metadata } from "next";
import { LocationDetailTemplate } from "@/components/LocationDetailTemplate";
import { locations } from "@/lib/data";
import { notFound } from "next/navigation";

const loc = locations.find((l) => l.slug === "rekonstrukce-bytu-cheb")!;

export const metadata: Metadata = {
  title: loc?.metaTitle || "Rekonstrukce bytu Cheb",
  description: loc?.metaDesc || "Kompletní rekonstrukce bytů a koupelen v Chebu.",
  alternates: {
    canonical: "/rekonstrukce-bytu-cheb/",
  },
};

export default function ChebLocationPage() {
  if (!loc) return notFound();
  return <LocationDetailTemplate location={loc} />;
}
